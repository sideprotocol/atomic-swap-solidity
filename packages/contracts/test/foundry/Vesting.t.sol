// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "forge-std/Test.sol";
import {InchainAtomicSwap} from "../../contracts/inchain_atomicswap/InchainAtomicSwap.sol";
import {MockToken} from "../../contracts/mocks/MockToken.sol";
import {Vesting} from "../../contracts/vesting/Vesting.sol";
import {InchainAtomicSwap} from "../../contracts/inchain_atomicswap/InchainAtomicSwap.sol";
import {IAtomicSwapBase} from "../../contracts/abstracts/interfaces/IAtomicSwapBase.sol";
import {IVesting} from "../../contracts/vesting/interfaces/IVesting.sol";
import {TestHelper} from  "./utils/TestHelper.sol";

contract VestingTest is Test {
    InchainAtomicSwap atomicswap;
    Vesting vesting;
    MockToken usdc;
    MockToken usdt;
    address admin = address(0x90);
    address treasury = address(0x10);
    uint256 sellerFee = 100;
    uint256 buyerFee = 120;

    address user1 = address(0x11);
    address user2 = address(0x12);
    address user3 = address(0x13);
    // Setup function runs before each test
    function setUp() public {
        // Deploy vesting contract
        vesting = new Vesting();
        bytes memory initData = abi.encodeWithSelector(
            vesting.initialize.selector,
            admin,
            "vSide",
            "vSide",
            ""
        );

        address proxy = TestHelper.deployWithTP(
            address(vesting),
            admin,
            initData
        );
        vesting = Vesting(payable(address(proxy)));


         // Deploy atomicswap contract 
        atomicswap = new InchainAtomicSwap();
        bytes memory initAtomicSwapData = abi.encodeWithSelector(
            atomicswap.initialize.selector,
            admin,
            address(vesting),
            treasury,
            sellerFee, 
            buyerFee
        );

        address atomicSwapProxy = TestHelper.deployWithTP(
            address(atomicswap),
            admin,
            initAtomicSwapData
        );

        atomicswap = InchainAtomicSwap(atomicSwapProxy);

        usdc = new MockToken("USDC","USDC");
        usdt = new MockToken("USDT","USDT");

        vm.deal(user1, 100 ether); // Provide user1 with some ETH
        vm.deal(user2, 100 ether); // Provide user2 with some ETH
        vm.deal(user3, 100 ether); // Provide user2 with some ETH

        usdc.mint(user2, 1000 ether); // Provide user1 with some
        usdt.mint(user3, 1000 ether); // Provide user1 with some
    }

    // Fuzz test for startVesting
    function testFuzz_startVesting(bytes32 orderId, address buyer, address token, uint256 totalAmount) public {
        IAtomicSwapBase.Release[] memory releases = new IAtomicSwapBase.Release[](1);
        releases[0] = IAtomicSwapBase.Release(1, 1000); // Example release
        vm.expectRevert("OwnablePausable: access denied");
        vesting.startVesting(orderId, buyer, token, totalAmount, releases);
       
    }

    // // // Fuzz test for release
    function testFuzz_release(
        bytes32 uuid
    ) public {
        IAtomicSwapBase.MakeSwapMsg memory makeswap = IAtomicSwapBase.MakeSwapMsg(
            uuid,
            IAtomicSwapBase.Coin(address(0), 10 ether), 
            IAtomicSwapBase.Coin(address(usdt), 10 ether),
            address(user1),
            address (user2),
            8 ether,
            block.timestamp + 1000,
            true
        );

        IAtomicSwapBase.Release[] memory releases = new IAtomicSwapBase.Release[](2);
        releases[0] = IAtomicSwapBase.Release(
            1 hours,
            5000
        );
        releases[1] = IAtomicSwapBase.Release(
            1 hours,
            5000
        );

        // Create Order
        vm.startPrank(user1);
        bytes32 orderId = atomicswap.makeSwapWithVesting{value: makeswap.sellToken.amount }(
           makeswap,
           releases
        );

        uint tokenId = vesting.vestingIds(orderId);
        //string memory tokenUrl = vesting.tokenURI(tokenId);
        console2.log("value: %s", tokenId);
        console.log("tokenId=======>:", tokenId);
        //console.log("tokenUrl:", tokenUrl);
        
    }
}
