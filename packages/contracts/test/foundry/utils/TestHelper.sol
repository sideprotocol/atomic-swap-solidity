// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
library TestHelper {
    function deployWithTP(
        address instance, 
        address admin, 
        bytes memory initData
    ) public returns(address) {
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            instance,
            admin,
            initData
        );
        return payable(address(proxy));
    }

    function deployVesting(
        address instance, 
        address admin, 
        bytes memory initData
    ) public returns(address) {
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            instance,
            admin,
            initData
        );
        return payable(address(proxy));
    }
}