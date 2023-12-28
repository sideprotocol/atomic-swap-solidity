// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {DeployScript} from "./Proxy.sol";
import {Vesting} from  "../contracts/vesting/Vesting.sol";
contract DeployVaultV1 is DeployScript {
    address private immutable _deployer;

    constructor() DeployScript(vm.envUint("PRIVATE_KEY")) {
        _deployer = vm.envAddress("ADMIN");
    }
    //slither-disable-next-line reentrancy-no-eth
    function _run() internal override create(_deployer) {
        address adminAddress = vm.envAddress("ADMIN");
        address vaultAddress = vm.envAddress("VAULT");

        // Deploy vault contract 
        Vesting vesting = new Vesting();
        implementation = address(vesting);
        data = abi.encodeCall(vesting.initialize, (
            adminAddress,
            vaultAddress,
            "vSide",
            "vSide",
            "https://nft.side.market/metadata/"
        ));
    }
}