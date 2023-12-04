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
import {console} from "hardhat/console.sol";
/// @title Vesting Contract
/// @notice Implements vesting schedules for token distribution with a cliff period.
/// @dev Utilizes OpenZeppelin's Ownable and ReentrancyGuard contracts for security.
contract Vesting is OwnablePausableUpgradeable, ReentrancyGuardUpgradeable, IVesting,ERC721Upgradeable {
    using AtomicSwapMsgValidator for *;
    /// @notice Stores vesting schedules for each beneficiary.
    mapping(uint => VestingSchedule)
        public vestingSchedules;

    /// @notice Stores release information for each beneficiary.
    // slither-disable-next-line uninitialized-state
    mapping(uint => IAtomicSwapBase.Release[])
        public releaseInfos;

    /// @notice Initializes the vesting contract with necessary parameters.
    /// @param _admin The address of the admin.
    function initialize(address _admin) external initializer {
        __OwnablePausableUpgradeable_init(_admin);
        __ERC721_init("SideVestingID", "SideVestingID");
    }
    // TODO: Check this function, anyone can call startVesting directly without takeSwap operation
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
        // Ensure the uniqueness of 'beneficiary-orderId', to avoid an override call attack.
        uint _vestingId = _issueVestingID(buyer, orderId);
        if (vestingSchedules[_vestingId].from != address(0)) { 
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
        VestingSchedule memory newVesting = VestingSchedule({
            from: msg.sender,
            start: vestingStartTime,
            token: token,
            totalAmount: totalAmount,
            amountReleased: 0,
            nextReleaseStep: 0
        });
        vestingSchedules[_vestingId] = newVesting;
        //slither-disable-next-line uninitialized-state-variables
        IAtomicSwapBase.Release[] storage _releases = releaseInfos[_vestingId];
        for (uint256 i = 0; i < releases.length; i++) {
            _releases.push(releases[i]);
        }

        
        emit NewVesting(
            VestingInfo(newVesting, releases, orderId)
        );
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
    
        VestingSchedule storage schedule = vestingSchedules[vestingId];
        IAtomicSwapBase.Release[] storage releases = releaseInfos[vestingId];
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
            releases[i].percentage) / 10000;
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
    
    receive() external payable onlyAdmin {
        emit Received(msg.sender, msg.value);
    }

    function _issueVestingID(address to, bytes32 orderId) internal onlyAdmin returns(uint) {
        _mint(to, uint(orderId));
        return uint(orderId);                                                                                                                                                                                                                                                                        
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
    override(AccessControlUpgradeable, ERC721Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
