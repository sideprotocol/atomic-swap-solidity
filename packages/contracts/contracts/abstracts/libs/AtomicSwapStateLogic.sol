// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../interfaces/IAtomicSwapBase.sol";

library AtomicSwapStateLogic {
    function addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.MakeSwapMsg memory makeswap,
        bytes32 id,
        address sender
    ) external {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }
        IAtomicSwapBase.AtomicSwapOrder memory _order = IAtomicSwapBase
            .AtomicSwapOrder(
                id,
                IAtomicSwapBase.OrderStatus.INITIAL,
                sender,
                makeswap.sellToken,
                makeswap.desiredTaker,
                makeswap.buyToken,
                makeswap.minBidAmount,
                block.timestamp,
                0,
                0,
                makeswap.expireAt,
                makeswap.acceptBid
            );

        swapOrder[id] = _order;
    }

    function removeAtomicSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        bytes32 id
    ) external {
        delete swapOrder[id];
    }

    function addNewBid(
        mapping(bytes32 => mapping(address => IAtomicSwapBase.Bid))
            storage bids,
        IAtomicSwapBase.PlaceBidMsg memory bidMsg
    ) external {
        IAtomicSwapBase.Bid memory newBid = IAtomicSwapBase.Bid({
            amount: bidMsg.bidAmount,
            order: bidMsg.orderID,
            status: IAtomicSwapBase.BidStatus.Placed,
            bidder: bidMsg.bidder,
            bidderReceiver: bidMsg.bidderReceiver,
            receiveTimestamp: block.timestamp,
            expireTimestamp: bidMsg.expireTimestamp
        });
        bids[bidMsg.orderID][bidMsg.bidder] = newBid;
    }

    function generateNewAtomicSwapID(
        bytes32 uuid,
        address contractAddress
    ) external pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }
}
