// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface ICliffVesting {
    struct VestingSchedule {
        address from;
        uint256 start;
        uint256 cliff;
        uint256 duration;
        address token;
        uint256 totalAmount;
        uint256 amountReleased;
        uint256 releaseInterval;
    }

    function startVesting(
        address beneficiary,
        uint256 start,
        uint256 cliffDurationInHours,
        uint256 durationInHours,
        address token,
        uint256 totalAmount,
        uint256 releaseIntervalInHours
    ) external;

    // Define custom errors
    error VestingAlreadyStarted(address beneficiary);
    error CliffNotEnded();
    error NoVestedTokensAvailable();
}
