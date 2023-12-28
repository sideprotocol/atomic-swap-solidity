// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {DeployScript} from "./Proxy.sol";
import {VaultPermit} from  "../contracts/vault/VaultPermit.sol";
contract DeployVaultV1 is DeployScript {
    address private immutable _deployer;

    constructor() DeployScript(vm.envUint("PRIVATE_KEY")) {
        _deployer = vm.envAddress("ADMIN");
    }
    //slither-disable-next-line reentrancy-no-eth
    function _run() internal override create(_deployer) {
        address adminAddress = vm.envAddress("ADMIN");
        string memory vaultName = "SideVault";
        // Deploy vault contract 
        VaultPermit vault = new VaultPermit();
        implementation = address(vault);
        data = abi.encodeCall(vault.initialize, (adminAddress,vaultName));
    }
}