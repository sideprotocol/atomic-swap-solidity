// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/ICliffVesting.sol";
import "../abstracts/libs/utils/TokenTransferHelper.sol";
import "hardhat/console.sol";

contract CliffVesting is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    ICliffVesting
{
    using TokenTransferHelper for *;

    mapping(address => VestingSchedule) public vestingSchedules;
    mapping(address => IAtomicSwapBase.Release[]) public releaseInfos;
    address private treasury;
    uint sellerFee;

    function initialize(
        address _admin,
        address _treasury,
        uint _sellerFee
    ) external initializer {
        __Ownable_init_unchained(_admin);
        sellerFee = _sellerFee;
        treasury = _treasury;
    }

    function startVesting(
        address beneficiary,
        address token,
        uint totalAmount,
        IAtomicSwapBase.Release[] memory releases
    ) external {
        // Check if vesting has already started for the beneficiary
        uint vestinStartTime = block.timestamp;
        vestingSchedules[beneficiary] = VestingSchedule({
            from: msg.sender,
            start: vestinStartTime,
            token: token,
            totalAmount: totalAmount,
            amountReleased: 0,
            lastReleasedStep: 0
        });
        // Initialize vesting schedule for the beneficiary
        IAtomicSwapBase.Release[] storage _releases = releaseInfos[beneficiary];
        // Copy the releases from memory to storage
        for (uint i = 0; i < releases.length; i++) {
            _releases.push(releases[i]);
        }
    }

    function release(address beneficiary) external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        IAtomicSwapBase.Release[] storage releases = releaseInfos[beneficiary];

        // Ensure the cliff period has ended and releases are available
        if (block.timestamp < schedule.start) {
            revert VestingNotStarted();
        }
        if (
            releases.length == 0 || schedule.lastReleasedStep >= releases.length
        ) {
            revert InvalidVesting();
        }
        uint amountForRelease = 0;
        uint releaseTime = schedule.start;
        for (uint i = schedule.lastReleasedStep; i < releases.length; i++) {
            releaseTime += releases[i].durationInHours * 1 hours;
            if (block.timestamp < releaseTime) {
                break;
            }

            uint256 releaseAmount = (schedule.totalAmount *
                releases[i].percentage) / 10000;
            amountForRelease += releaseAmount;
            schedule.lastReleasedStep = i + 1;
        }

        if (amountForRelease <= 0) {
            revert NoVestedTokensForRelease();
        }
        schedule.amountReleased += amountForRelease;
        // Transfer the tokens to beneficiary
        address token = schedule.token;
        token.transferWithFee(
            beneficiary,
            amountForRelease,
            sellerFee,
            1000,
            treasury
        );
        emit Released(beneficiary, amountForRelease);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
