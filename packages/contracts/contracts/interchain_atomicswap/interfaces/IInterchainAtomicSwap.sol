// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface IInterchainAtomicSwap is IAtomicSwapBase {
    // enum PacketType {
    //     ATOMICSWAP_RECEIVED,
    //     ATOMICSWAP_ACKNOWLEDGE,
    //     AMMSWAP_RECEIVED,
    //     AMMSWAP_ACKNOWLEDGE
    // }
    struct InitialParams {
        address admin;
        uint16 chainID;
        address bridge;
        address treasury;
        uint sellerFee;
        uint buyerFee;
    }

    enum Side {
        REMOTE,
        NATIVE
    }
    struct ASITCParams {
        Side side;
        address makerReceiver;
        address takerReceiver;
        uint16 srcChainID;
        uint16 dstChainID;
    }

    struct ICMakeSwapMsg {
        MakeSwapMsg base;
        address makerReceiver;
        address desiredTaker;
        uint16 dstChainID;
    }

    // LayerZero message struct
    struct ICMakeSwapLzMsg {
        Coin buyToken;
        address makerReceiver;
        address desiredTaker;
        bool acceptBid;
        uint expireAt;
    }

    function onReceivePacket(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes calldata _payload
    ) external payable;

    // function onAcknowledgePacket(
    //     uint16 _srcChainId,
    //     bytes memory _srcAddress,
    //     uint64 _nonce,
    //     bytes calldata _payload
    // ) external;
}
