// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/ICliffVesting.sol";
import "../abstracts/libs/TokenTransferHelper.sol";

contract Vesting is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    ICliffVesting
{
    using TokenTransferHelper for *;

    mapping(address => VestingSchedule) public vestingSchedules;
    address private inChainAtomicswap;
    address private interChainAtomicswap;
    address private treasury;
    uint sellerFee;
    modifier OnlySideContracts() {
        require(
            msg.sender == address(inChainAtomicswap) ||
                msg.sender == address(interChainAtomicswap),
            "No permission to use"
        );
        _;
    }

    function initialize(
        address _admin,
        address _inChainAtomicswap,
        address _interChainAtomicswap,
        address _treasury,
        uint _sellerFee
    ) external initializer {
        __Ownable_init_unchained(_admin);
        inChainAtomicswap = _inChainAtomicswap;
        interChainAtomicswap = _interChainAtomicswap;
        sellerFee = _sellerFee;
        treasury = _treasury;
    }

    function startVesting(
        address beneficiary,
        uint start,
        uint cliffDurationInHours,
        uint durationInHours,
        address token,
        uint totalAmount,
        uint releaseIntervalInHours
    ) external OnlySideContracts {
        // Check if vesting has already started for the beneficiary
        if (vestingSchedules[beneficiary].start != 0) {
            revert VestingAlreadyStarted(beneficiary);
        }
        // Initialize vesting schedule for the beneficiary
        vestingSchedules[beneficiary] = VestingSchedule({
            from: msg.sender,
            start: start,
            cliff: start + cliffDurationInHours * 1 hours,
            duration: durationInHours * 1 hours,
            token: token,
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
        address token = schedule.token;
        token.processTransferFrom(
            schedule.from,
            beneficiary,
            unreleased,
            sellerFee,
            1000,
            treasury
        );

        emit Released(beneficiary, unreleased);
    }

    event Released(address beneficiary, uint256 amount);
}
