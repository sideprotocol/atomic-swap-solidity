// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IAtomicSwapBase} from "../../abstracts/interfaces/IAtomicSwapBase.sol";

/// @title IVesting
/// @notice Interface for the Vesting contract.
/// @dev Provides function signatures and structures for vesting operations.
interface IVesting {
    /// @notice Represents a vesting schedule for a beneficiary.
    /// @param from The address that created the vesting schedule.
    /// @param start The start time of the vesting schedule.
    /// @param token The token address being vested.
    /// @param totalAmount The total amount of tokens to be vested.
    /// @param amountReleased The amount of tokens already released.
    /// @param nextReleaseStep The last step index that was processed for release.
    struct VestingSchedule {
        address from;
        uint256 start;
        address token;
        uint256 totalAmount;
        uint256 amountReleased;
        uint256 nextReleaseStep;
    }

    struct VestingInfo {
        VestingSchedule schedule;
        IAtomicSwapBase.Release[] release;
        bytes32 orderId;
    }

    /// @notice Starts the vesting schedule for a beneficiary.
    /// @param buyer The receiver of this vesting.
    /// @param token The token to be vested.
    /// @param totalAmount The total amount of tokens to be vested.
    /// @param releases The release schedule parameters.
    function startVesting(
        bytes32 orderId, 
        address buyer,
        address token,
        uint256 totalAmount,
        IAtomicSwapBase.Release[] memory releases
    ) external payable;

    

    event NewVesting(bytes32 indexed orderId, uint256 tokenId);
    /// @notice Event emitted when tokens are released to a beneficiary.
    /// @param beneficiary The address of the beneficiary.
    /// @param amount The amount of tokens released.
    event Released(address indexed beneficiary, uint256 indexed amount);

    /// @notice Event emitted when Ether is received.
    /// @param sender The address of the sender.
    /// @param amount The amount of Ether received.
    event Received(address indexed sender, uint256 indexed amount);

    // Custom errors for vesting operation failures.
    error VestingAlreadyStarted(address beneficiary);
    error VestingNotStarted();
    error InvalidVesting();
    error NoVestedTokensAvailable();
    error OverMaximumReleaseStep();
    error InvalidTotalPercentage();
    error NoVestedTokensForRelease();
    error NoPermissionToRelease();
}
