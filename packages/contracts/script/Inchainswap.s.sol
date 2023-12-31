// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {InchainAtomicSwap} from  "../contracts/inchain_atomicswap/InchainAtomicSwap.sol";
import {VaultPermit} from  "../contracts/vault/VaultPermit.sol";
import {Vesting} from  "../contracts/vesting/Vesting.sol";

import {DeployScript} from "./Proxy.sol";

contract DeployXoV1 is DeployScript {
    address private immutable _deployer;

    constructor() DeployScript(vm.envUint("PRIVATE_KEY")) {
        _deployer = vm.envAddress("ADMIN");
    }

    //slither-disable-next-line reentrancy-no-eth
    function _run() internal override create(_deployer) {
        address adminAddress = vm.envAddress("ADMIN");
        address treasury = vm.envAddress("TREASURY");
        address vault = vm.envAddress("VAULT");
        address vesting = vm.envAddress("VESTING");
        uint sellTokenFeeRate = vm.envUint("SELL_TOKEN_FEE_RATE");
        uint buyTokenFeeRate = vm.envUint("BUY_TOKEN_FEE_RATE");

        InchainAtomicSwap inchainswap = new InchainAtomicSwap();
        implementation = address(inchainswap);
        data = abi.encodeCall(inchainswap.initialize,(
            adminAddress,
            vault,
            vesting,
            treasury,
            sellTokenFeeRate, 
            buyTokenFeeRate
        ));
    }
}

// contract DeployCounterV2 is DeployScript {
//     constructor() DeployScript(vm.envUint("PRIVATE_KEY")) {
//         proxyAddress = vm.envAddress("PROXY");
//     }

//     //slither-disable-next-line reentrancy-no-eth
//     function _run() internal override upgrade {
//         CounterV2 c = new CounterV2();
//         implementation = address(c);
//         data = bytes.concat(c.upgradeVersion.selector);
//     }
// }