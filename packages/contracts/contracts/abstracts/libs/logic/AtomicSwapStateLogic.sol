// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../../interfaces/IAtomicSwapBase.sol";

/// @title Atomic Swap State Logic
/// @notice Library providing state management functions for atomic swap orders and bids.
/// @dev Used by atomic swap contracts to manipulate order and bid states.
library AtomicSwapStateLogic {
    /// @notice Adds a new swap order to the mapping.
    /// @param swapOrder The mapping of swap orders.
    /// @param makeswap The details of the swap to be added.
    /// @param id The unique identifier for the new swap order.
    /// @param sender The address of the user who is creating the swap order.
    /// @dev Reverts if an order with the same ID already exists.
    function addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.MakeSwapMsg memory makeswap,
        bytes32 id,
        address sender
    ) external {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }

        IAtomicSwapBase.AtomicSwapOrder memory _order = IAtomicSwapBase.AtomicSwapOrder(
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

    /// @notice Removes an atomic swap order from the mapping.
    /// @param swapOrder The mapping of swap orders.
    /// @param id The unique identifier of the swap order to remove.
    /// @dev This function deletes the order from the mapping.
    function removeAtomicSwapOrder(mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder, bytes32 id)
        external
    {
        delete swapOrder[id];
    }

    /// @notice Adds a new bid to a swap order.
    /// @param bids The mapping of bids for swap orders.
    /// @param bidMsg The details of the bid to be added.
    /// @dev Adds a bid with the status set to 'Placed'.
    function addNewBid(
        mapping(bytes32 => mapping(address => IAtomicSwapBase.Bid)) storage bids,
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

    /// @notice Generates a new unique identifier for an atomic swap.
    /// @param uuid A unique value used to generate the ID.
    /// @param contractAddress The address of the contract using the ID.
    /// @return id The generated unique identifier.
    /// @dev Uses keccak256 hashing to generate a unique ID.
    function generateNewAtomicSwapID(bytes32 uuid, address contractAddress) external pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }
}
