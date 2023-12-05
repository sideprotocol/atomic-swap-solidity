// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "forge-std/Test.sol";
import {Vesting} from "../../contracts/vesting/Vesting.sol";
import {InchainAtomicSwap} from "../../contracts/inchain_atomicswap/InchainAtomicSwap.sol";
import {IAtomicSwapBase} from "../../contracts/abstracts/interfaces/IAtomicSwapBase.sol";
import {IVesting} from "../../contracts/vesting/interfaces/IVesting.sol";
import {TestHelper} from  "./utils/TestHelper.sol";

contract VestingTest is Test {
    InchainAtomicSwap atomicswap;
    Vesting vesting;
    address admin = address(0x90);
    // Setup function runs before each test
    function setUp() public {
        // Deploy vesting contract
        vesting = new Vesting();
        bytes memory initData = abi.encodeWithSelector(
            vesting.initialize.selector,
            admin
        );

        address proxy = TestHelper.deployWithTP(
            address(vesting),
            admin,
            initData
        );
        vesting = Vesting(payable(address(proxy)));
    }

    // Fuzz test for startVesting
    function testFuzz_startVesting(bytes32 orderId, address buyer, address token, uint256 totalAmount) public {
        IAtomicSwapBase.Release[] memory releases = new IAtomicSwapBase.Release[](1);
        releases[0] = IAtomicSwapBase.Release(1, 1000); // Example release
        vm.expectRevert("OwnablePausable: access denied");
        vesting.startVesting(orderId, buyer, token, totalAmount, releases);
    }

    // // Fuzz test for release
    function testFuzz_release(uint vestingId) public {
        // This will need additional setup to ensure there are vesting schedules to release
        // vesting.release(vestingId);
        // Add assertions or conditions here
    }
}
