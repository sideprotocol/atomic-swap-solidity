// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {OwnablePausableUpgradeable} from "../abstracts/OwnablePausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IVesting, IAtomicSwapBase} from "./interfaces/IVesting.sol";
import {AtomicSwapMsgValidator} from "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
/// @title Vesting Contract
/// @notice Implements vesting schedules for token distribution with a cliff period.
/// @dev Utilizes OpenZeppelin's Ownable and ReentrancyGuard contracts for security.
contract Vesting is OwnablePausableUpgradeable, ReentrancyGuardUpgradeable, IVesting,ERC721Upgradeable {
    using AtomicSwapMsgValidator for *;
    using Strings for *;
    string private _baseURL;
    /// @dev Maximum scale for release percent calculations.
    uint256 constant internal RELEASE_PERCENT_SCALE_FACTOR = 1e4;

    /// @notice Stores vesting schedules for each vestingId.
    mapping(uint => VestingSchedule)
        public vesting;
    
    /// @dev Counter for generating unique token IDs for new vestings.
    /// The counter starts from 1 and is incremented each time a new token is minted.
    uint256 private _lastTokenId;

    /// @dev Mapping to associate each orderId (bytes32) with a unique vestingId (uint).
    /// This mapping helps in tracking the relationship between orderIds and their respective vestingIds.
    mapping (bytes32 => uint) public vestingIds;

    /// @notice Stores release information for each vestingId.
    // slither-disable-next-line uninitialized-state
    mapping(uint => IAtomicSwapBase.Release[])
        public releaseInfo;

    /// @notice Initializes the vesting contract with necessary parameters.
    /// @param admin The address of the admin.
    /// @param name The address of the vesting NFT.
    /// @param symbol The address of the vesting NFT.
    /// @param baseURL The address of the vesting NFT.
    function initialize(address admin, string memory name, string memory symbol, string memory baseURL) external initializer {
        __OwnablePausableUpgradeable_init(admin);
        __ERC721_init(name, symbol);
        _baseURL = baseURL;
        _lastTokenId = 0;
    }

    /// @notice Starts the vesting schedule for a beneficiary.
    /// @param buyer The address of the beneficiary.
    /// @param token The token address for vesting.
    /// @param totalAmount The total amount of tokens to be vested.
    /// @param releases Array of release schedules.
    /// @dev Sets up the vesting schedule and release information for the beneficiary.
    function startVesting(
        bytes32 orderId,
        address buyer,
        address token,
        uint256 totalAmount,
        IAtomicSwapBase.Release[] memory releases
    ) external payable nonReentrant onlyAdmin {
   
        if (vestingIds[orderId] != 0) { 
            revert IAtomicSwapBase.DuplicateReleaseSchedule();
        }
        releases.validateVestingParams();

        if (token == address(0)) {
            if (msg.value != totalAmount) {
                revert IAtomicSwapBase.NotEnoughFund(totalAmount, msg.value);
            }
        } else {
            TransferHelper.safeTransferFrom(
                token,
                msg.sender, address(this), totalAmount
            );
        }
        uint256 vestingStartTime = block.timestamp;
        uint vestingId = _issueVestingId(buyer, orderId);
            
        VestingSchedule memory newVesting = VestingSchedule({
            from: msg.sender,
            start: vestingStartTime,
            token: token,
            totalAmount: totalAmount,
            amountReleased: 0,
            nextReleaseStep: 0
        });

        vesting[vestingId] = newVesting;
        //slither-disable-next-line uninitialized-state-variables
        IAtomicSwapBase.Release[] storage _releases = releaseInfo[vestingId];
        for (uint256 i = 0; i < releases.length; i++) {
            _releases.push(releases[i]);
        }

        emit NewVesting(orderId, vestingId);
    }

    /// @notice Releases vested tokens to the beneficiary.
    /// @param vestingId The uint of the identity to release tokens to.
    /// @dev Calculates the amount of tokens to be released and transfers them to the beneficiary.
    function release(
        uint vestingId
    ) external nonReentrant whenNotPaused {
        // Try to remove identifiers 
        if (ownerOf(vestingId) != msg.sender) {
            revert NoPermissionToRelease();
        }
    
        VestingSchedule storage schedule = vesting[vestingId];
        IAtomicSwapBase.Release[] storage releases = releaseInfo[vestingId];
        if (
            releases.length == 0 || schedule.nextReleaseStep >= releases.length
        ) {
            revert InvalidVesting();
        }
        uint256 amountForRelease = 0;
        uint256 releaseTime = schedule.start;
        for (uint256 i = 0; i < releases.length; i++) {
            releaseTime += releases[i].durationInHours * 1 hours;
            if (i < schedule.nextReleaseStep) continue; // continue to next
            if (block.timestamp < releaseTime) {
                break;
            }
            uint256 releaseAmount = (schedule.totalAmount *
            releases[i].percentage) / RELEASE_PERCENT_SCALE_FACTOR;
            amountForRelease += releaseAmount;
            schedule.nextReleaseStep = i + 1;
        }

        if (amountForRelease <= 0) {
            revert NoVestedTokensForRelease();
        }
        
        schedule.amountReleased += amountForRelease;
        if (schedule.token != address(0)) {
            TransferHelper.safeTransfer(
                schedule.token,
                msg.sender, amountForRelease
            );
        } else {
            TransferHelper.safeTransferETH(msg.sender, amountForRelease);
        }

        // burn NFT at last release time. frontend need to approve this. 
        if(schedule.amountReleased == schedule.totalAmount) {
            transferFrom(msg.sender,address(this), vestingId);
            _burn(vestingId);
        }
        emit Released(msg.sender, amountForRelease);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /// @notice Issues a new vesting ID based on the provided order ID and mints tokens to the specified address.
    /// @dev The function takes an order ID, converts it to a vesting ID, and then mints tokens corresponding to this ID.
    /// This function can only be called by an administrator of the contract.
    /// @param to The address to which the vesting ID and corresponding tokens will be issued.
    /// @param orderId The order ID based on which the vesting ID is generated.
    /// @return vestingId The generated vesting ID as a uint.

    function _issueVestingId(address to, bytes32 orderId) internal onlyAdmin returns(uint) {
        _lastTokenId++;
        vestingIds[orderId] = _lastTokenId;
        _mint(to, _lastTokenId);    
        return _lastTokenId;                                                                                                                                                                                                                                                              
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
    override(AccessControlUpgradeable, ERC721Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURL;
    }

      /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(
                baseURI,
                block.chainid.toString(),
                "/",
                address(this).toHexString(), // convert address to string with 20 bytes
                "/",
                tokenId.toString()
            ))
            : "";
    }
}
