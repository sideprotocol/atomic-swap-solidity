// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "forge-std/Test.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "../../contracts/vesting/Vesting.sol";
import {IAtomicSwapBase} from "../../contracts/abstracts/interfaces/IAtomicSwapBase.sol";
import {IVesting} from "../../contracts/vesting/interfaces/IVesting.sol";


contract VestingTest is Test {
    Vesting vesting;
    TransparentUpgradeableProxy proxy;
    address admin = address(0x90);
    // Setup function runs before each test
    function setUp() public {
        vesting = new Vesting();
        bytes memory initData = abi.encodeWithSelector(
            vesting.initialize.selector,
            admin
        );

        proxy = new TransparentUpgradeableProxy(
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
