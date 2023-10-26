// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ISideLzAppUpgradable {
    function sendLzMsg(
        uint16 _srcChainId,
        address payable sender,
        bytes calldata _payload
    ) external payable;
}
