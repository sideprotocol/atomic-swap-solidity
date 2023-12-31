// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/ICliffVesting.sol";
import "../abstracts/libs/utils/TokenTransferHelper.sol";
import "hardhat/console.sol";

/// @title Cliff Vesting Contract
/// @notice Implements vesting schedules for token distribution with a cliff period.
/// @dev Utilizes OpenZeppelin's Ownable and ReentrancyGuard contracts for security.
contract CliffVesting is OwnableUpgradeable, ReentrancyGuardUpgradeable, ICliffVesting {
    using TokenTransferHelper for *;

    /// @notice Stores vesting schedules for each beneficiary.
    mapping(address =>  mapping(uint256 => VestingSchedule)) public vestingSchedules;

    /// @notice Stores release information for each beneficiary.
    mapping(address => mapping(uint256 => IAtomicSwapBase.Release[])) public releaseInfos;
    
    // Counter for each beneficiary's vesting schedules
    mapping(address => uint256) private vestingScheduleCount;


    /// @notice Address of the treasury where fees are sent.
    address private treasury;

    /// @notice Fee charged for the seller.
    uint256 sellerFee;

    /// @notice Initializes the vesting contract with necessary parameters.
    /// @param _admin The address of the admin.
    /// @param _treasury The address of the treasury for collecting fees.
    /// @param _sellerFee The fee percentage for the seller.
    function initialize(address _admin, address _treasury, uint256 _sellerFee) external initializer {
        __Ownable_init_unchained(_admin);
        treasury = _treasury;
        sellerFee = _sellerFee;
    }

    /// @notice Starts the vesting schedule for a beneficiary.
    /// @param beneficiary The address of the beneficiary.
    /// @param token The token address for vesting.
    /// @param totalAmount The total amount of tokens to be vested.
    /// @param releases Array of release schedules.
    /// @dev Sets up the vesting schedule and release information for the beneficiary.
    function startVesting(
        address beneficiary,
        address token,
        uint256 totalAmount,
        IAtomicSwapBase.Release[] memory releases
    ) external {
        uint256 vestinStartTime = block.timestamp;
        uint256 scheduleId = vestingScheduleCount[beneficiary]++;
        VestingSchedule memory newVesting = VestingSchedule({
            from: msg.sender,
            start: vestinStartTime,
            token: token,
            totalAmount: totalAmount,
            amountReleased: 0,
            lastReleasedStep: 0
        });
        vestingSchedules[beneficiary][scheduleId] = newVesting;

        IAtomicSwapBase.Release[] storage _releases = releaseInfos[beneficiary][scheduleId];
        for (uint256 i = 0; i < releases.length; i++) {
            _releases.push(releases[i]);
        }
        emit NewVesting(
            VestingInfo(
            newVesting, 
            releases, 
            beneficiary,
            scheduleId
        ));
    }

    /// @notice Releases vested tokens to the beneficiary.
    /// @param beneficiary The address of the beneficiary to release tokens to.
    /// @dev Calculates the amount of tokens to be released and transfers them to the beneficiary.
    function release(address beneficiary,uint256 scheduleId) external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[beneficiary][scheduleId];
        IAtomicSwapBase.Release[] storage releases = releaseInfos[beneficiary][scheduleId];

        if (block.timestamp < schedule.start) {
            revert VestingNotStarted();
        }
        if (releases.length == 0 || schedule.lastReleasedStep >= releases.length) {
            revert InvalidVesting();
        }

        uint256 amountForRelease = 0;
        uint256 releaseTime = schedule.start;
        for (uint256 i = schedule.lastReleasedStep; i < releases.length; i++) {
            releaseTime += releases[i].durationInHours * 1 hours;
            if (block.timestamp < releaseTime) {
                break;
            }
            uint256 releaseAmount = (schedule.totalAmount * releases[i].percentage) / 10000;
            amountForRelease += releaseAmount;
            schedule.lastReleasedStep = i + 1;
        }

        if (amountForRelease <= 0) {
            revert NoVestedTokensForRelease();
        }
        schedule.amountReleased += amountForRelease;
        schedule.token.transferWithFee(beneficiary, amountForRelease, sellerFee, 1000, treasury);
        emit Released(beneficiary, amountForRelease);
    }

    function getVestingScheduleCount(address beneficiary) external view returns(uint256) {
        return vestingScheduleCount[beneficiary];
    }

    /// @notice Fallback function to receive Ether.
    /// @dev Emits a Received event when Ether is received.
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
