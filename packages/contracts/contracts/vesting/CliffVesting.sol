// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./interfaces/ICliffVesting.sol";

contract Vesting is ICliffVesting {
    mapping(address => VestingSchedule) public vestingSchedules;

    function startVesting(
        address beneficiary,
        uint256 start,
        uint256 cliffDurationInHours,
        uint256 durationInHours,
        uint256 totalAmount,
        uint256 releaseIntervalInHours
    ) external {
        // Check if vesting has already started for the beneficiary
        if (vestingSchedules[beneficiary].start != 0) {
            revert VestingAlreadyStarted(beneficiary);
        }
        // Initialize vesting schedule for the beneficiary
        vestingSchedules[beneficiary] = VestingSchedule({
            start: start,
            cliff: start + cliffDurationInHours * 1 hours,
            duration: durationInHours * 1 hours,
            totalAmount: totalAmount,
            amountReleased: 0,
            releaseInterval: releaseIntervalInHours * 1 hours
        });
    }

    function release(address beneficiary) public {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];

        // Check if cliff period has ended
        if (block.timestamp < schedule.cliff) {
            revert CliffNotEnded();
        }

        // Calculate the number of intervals that have passed
        uint256 intervalsPassed = (block.timestamp - schedule.cliff) /
            schedule.releaseInterval;

        // Calculate the total vested amount till now
        uint256 totalVestedAmount = (schedule.totalAmount *
            intervalsPassed *
            schedule.releaseInterval) / schedule.duration;

        // Ensure we don't release more than the total vested amount
        uint256 unreleased = totalVestedAmount - schedule.amountReleased;
        require(unreleased > 0, "No vested tokens available for release");

        // Update released amount
        schedule.amountReleased += unreleased;

        // Transfer the tokens to beneficiary
        // You need to call the ERC20 transfer function here
        // token.transfer(beneficiary, unreleased);

        emit Released(beneficiary, unreleased);
    }

    event Released(address beneficiary, uint256 amount);
}
