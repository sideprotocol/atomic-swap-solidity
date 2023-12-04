// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../../contracts/vesting/Vesting.sol";
import {IAtomicSwapBase} from "../../contracts/abstracts/interfaces/IAtomicSwapBase.sol";
import {IVesting} from "../../contracts/vesting/interfaces/IVesting.sol";


contract VestingTest is Vesting {
    Vesting vesting;

    // Setup function runs before each test
    function setUp() public {
        vesting = new Vesting();
        //vesting.initialize(address(this)); // Assuming `initialize` sets the caller as admin
    }

    // Fuzz test for _issueVestingID
    function testFuzz_issueVestingID(address to, bytes32 orderId) public {
        //uint vestingID = vesting._issueVestingID(to, orderId);
    }

    // Fuzz test for startVesting
    function testFuzz_startVesting(bytes32 orderId, address buyer, address token, uint256 totalAmount) public {
        IAtomicSwapBase.Release[] memory releases = new IAtomicSwapBase.Release[](1);
        releases[0] = IAtomicSwapBase.Release(1, 1000); // Example release
        vesting.startVesting(orderId, buyer, token, totalAmount, releases);
        // Add assertions or conditions here
    }

    // Fuzz test for release
    function testFuzz_release(uint vestingId) public {
        // This will need additional setup to ensure there are vesting schedules to release
        vesting.release(vestingId);
        // Add assertions or conditions here
    }
}
