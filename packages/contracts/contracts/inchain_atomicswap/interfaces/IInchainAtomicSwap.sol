// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface IInchainAtomicSwap is IAtomicSwapBase {
    // // Struct for making an atomic swap order.
    // struct MakeSwapMsg {
    //     Coin sellToken; // Details of the token/coin to be sold.
    //     Coin buyToken; // Details of the token/coin to be bought.
    //     address desiredTaker; // Desired address to take the order.
    //     uint minBidAmount; // Minimum acceptable bid amount.
    //     uint expireAt; // Timestamp of when the order will expire.
    //     bool acceptBid; // If set to true, the order can accept bids.
    // }
    // // Struct for taking an existing atomic swap order.
    // struct TakeSwapMsg {
    //     bytes32 orderID; // ID of the order to be taken.
    //     address takerReceiver; // Address to receive the swapped token/coin.
    // }
    // // Struct for placing a bid on an atomic swap order.
    // struct PlaceBidMsg {
    //     uint256 bidAmount; // Amount to bid.
    //     bytes32 orderID; // ID of the order to place the bid on.
    //     uint256 expireTimestamp; // Timestamp of when the bid will expire.
    // }
    // // Struct for updating an existing bid.
    // struct UpdateBidMsg {
    //     bytes32 orderID; // ID of the associated order.
    //     uint addition; // Amount to add to the existing bid.
    // }
    // // Struct for accepting a placed bid on an order.
    // struct AcceptBidMsg {
    //     bytes32 orderID; // ID of the associated order.
    //     address bidder; // Address of the bidder whose bid is accepted.
    // }
    // // Struct for canceling an atomic swap order.
    // struct CancelSwapMsg {
    //     bytes32 orderID; // ID of the order to be canceled.
    // }
    // struct CounterOfferMsg {
    //     bytes32 orderID;
    //     address bidder;
    //     uint amount;
    // }
    // Error indicating the bid is not in a 'Placed' status.
    //error BidNotInPlacedStatus(BidStatus status);
}
