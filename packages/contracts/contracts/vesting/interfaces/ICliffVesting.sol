// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface ICliffVesting {
    struct VestingSchedule {
        address from;
        uint256 start;
        address token;
        uint256 totalAmount;
        uint256 amountReleased;
        uint256 lastReleasedStep; // New field to track the last processed release
    }

    function startVesting(
        address beneficiary,
        address token,
        uint totalAmount,
        IAtomicSwapBase.Release[] memory releases
    ) external;

    // Define errors
    event Released(address indexed beneficiary, uint256 indexed amount);
    event Received(address indexed sender, uint256 indexed amount);
    // Define custom errors
    error VestingAlreadyStarted(address beneficiary);
    error VestingNotStarted();
    error InvalidVesting();
    error NoVestedTokensAvailable();
    error OverMaximumReleaseStep();
    error InvalidTotalPercentage();
    error NoVestedTokensForRelease();
}
