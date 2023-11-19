// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NonblockingLzAppUpgradeable.sol";
import "../interfaces/IInterchainAtomicSwap.sol";

contract SideLzAppUpgradable is NonblockingLzAppUpgradeable {
    IInterchainAtomicSwap private atomicswap;

    modifier OnlySideContracts() {
        require(
            msg.sender == address(atomicswap), //||
            //   msg.sender == address(interchainswap)
            "No permission to use"
        );
        _;
    }

    function initialize(address admin, address _endpoint) external initializer {
        __Ownable_init_unchained(admin);
        __NonblockingLzAppUpgradeable_init(_endpoint);
    }

    function setPacketReceivers(address _atomicswap) external onlyOwner {
        atomicswap = IInterchainAtomicSwap(_atomicswap);
        //interchainswap = IInterchainSwap(_interchainswap);
    }

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes calldata _payload)
        internal
        virtual
        override
    {
        bytes32 packetType = bytes32(_payload[:32]);
        if (packetType == bytes32(0x0)) {
            atomicswap.onReceivePacket(_srcChainId, _srcAddress, _nonce, _payload[32:]);
        } else if (packetType == bytes32(uint256(1))) {
            //console.log("Received Packet");
            // atomicswap.onAcknowledgePacket(
            //     _srcChainId,
            //     _srcAddress,
            //     _nonce,
            //     _payload[32:]
            // );
            // interchainswap.onReceivePacket(
            //     _srcChainId,
            //     _srcAddress,
            //     _nonce,
            //     _payload[32:]
            // );
        }
    }

    function sendLzMsg(uint16 _srcChainId, address payable sender, bytes calldata _payload)
        external
        payable
        OnlySideContracts
    {
        _lzSend(_srcChainId, _payload, sender, address(0x0), bytes(""), msg.value);
    }

    function estimateFee(uint16 _dstChainId, bool _useZro, bytes calldata _adapterParams, bytes calldata _payload)
        public
        view
        returns (uint256 nativeFee, uint256 zroFee)
    {
        return lzEndpoint.estimateFees(_dstChainId, address(this), _payload, _useZro, _adapterParams);
    }

    function setOracle(uint16 dstChainId, address oracle) external onlyOwner {
        uint256 TYPE_ORACLE = 6;
        // set the Oracle
        lzEndpoint.setConfig(lzEndpoint.getSendVersion(address(this)), dstChainId, TYPE_ORACLE, abi.encode(oracle));
    }

    function _lzSendMsg(uint16 chainID, bytes memory payload) private {
        _lzSend(chainID, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }
}
