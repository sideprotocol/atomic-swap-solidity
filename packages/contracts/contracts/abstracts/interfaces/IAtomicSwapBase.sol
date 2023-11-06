// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IAtomicSwapBase {
    enum MsgType {
        MAKESWAP,
        TAKESWAP,
        CANCELSWAP,
        PLACEBID,
        UPDATEBID,
        ACCEPTBID,
        CANCELBID
    }
    // Struct representing a coin with its address (could be Ether) and amount.
    struct Coin {
        address token; // Token address, use address(0) for Ether.
        uint256 amount; // Amount of the token.
    }

    // Enum representing the possible statuses of an order.
    enum OrderStatus {
        INITIAL, // The default status when an order is created.
        CANCEL, // When the order has been canceled.
        COMPLETE, // When the order has been successfully executed/completed.
        SYNC
    }

    // Struct representing the details of an atomic swap order.
    struct AtomicSwapOrder {
        bytes32 id; // Unique identifier for the order.
        OrderStatus status; // Current status of the order.
        address maker; // Address of the user who created the order.
        Coin sellToken; // Details of the token/coin to be sold.
        address taker; // Address of the user who accepts the order.
        Coin buyToken; // Details of the token/coin to be bought.
        uint minBidAmount; // Minimum acceptable bid amount.
        uint createdAt; // Timestamp of when the order was created.
        uint canceledAt; // Timestamp of when the order was canceled.
        uint completedAt; // Timestamp of when the order was completed.
        uint expiredAt; // Timestamp of when the order will expire.
        bool acceptBid; // If set to true, the order can accept bids.
    }

    // Enum representing the possible statuses of a bid.
    enum BidStatus {
        Cancelled, // When the bid has been canceled.
        Executed, // When the bid has been successfully executed.
        Placed // The default status when a bid is placed.
    }

    // Struct representing a bid on an atomic swap order.
    struct Bid {
        uint256 amount; // Bid amount.
        bytes32 order; // Associated order ID.
        BidStatus status; // Current status of the bid.
        address bidder; // Address of the user placing the bid.
        address bidderReceiver;
        uint256 receiveTimestamp; // Timestamp of when the bid was received.
        uint256 expireTimestamp; // Timestamp of when the bid will expire.
    }

    // Struct for making an atomic swap order.
    struct MakeSwapMsg {
        bytes32 uuid; // UUID from frontend.
        Coin sellToken; // Details of the token/coin to be sold.
        Coin buyToken; // Details of the token/coin to be bought.
        address maker;
        address desiredTaker; // Desired address to take the order.
        uint minBidAmount; // Minimum acceptable bid amount.
        uint expireAt; // Timestamp of when the order will expire.
        bool acceptBid; // If set to true, the order can accept bids.
    }

    // Struct for taking an existing atomic swap order.
    struct TakeSwapMsg {
        bytes32 orderID; // ID of the order to be taken.
        address takerReceiver; // Address to receive the swapped token/coin.
    }

    // Struct for placing a bid on an atomic swap order.
    struct PlaceBidMsg {
        uint256 bidAmount; // Amount to bid.
        address bidder;
        address bidderReceiver; // Address to
        bytes32 orderID; // ID of the order to place the bid on.
        uint256 expireTimestamp; // Timestamp of when the bid will expire.
    }

    // Struct for updating an existing bid.
    struct UpdateBidMsg {
        bytes32 orderID; // ID of the associated order.
        address bidder;
        uint addition; // Amount to add to the existing bid.
    }

    // Struct for accepting a placed bid on an order.
    struct AcceptBidMsg {
        bytes32 orderID; // ID of the associated order.
        address bidder; // Address of the bidder whose bid is accepted.
        //address receiveAddress; // Address of the maker's token receive address on counter party chain
    }

    // Struct for canceling an atomic swap order.
    struct CancelSwapMsg {
        bytes32 orderID; // ID of the order to be canceled.
    }

    struct CounterOfferMsg {
        bytes32 orderID;
        address bidder;
        uint amount;
    }

    // Error indicating the bid is not in a 'Placed' status.
    error BidNotInPlacedStatus(BidStatus status);

    // Events to log significant actions for atomic swaps.
    event AtomicSwapOrderCreated(bytes32 indexed id);
    event AtomicSwapOrderTook(
        address indexed maker,
        address indexed taker,
        bytes32 indexed id
    );
    event AtomicSwapOrderCanceled(bytes32 indexed id);
    event ReceivedNewBid(
        bytes32 indexed orderID,
        address indexed bidder,
        uint indexed amount
    );
    event UpdatedBid(
        bytes32 indexed orderID,
        address indexed bidder,
        uint indexed amount
    );
    event AcceptedBid(
        bytes32 indexed orderID,
        address indexed bidder,
        uint indexed amount
    );
    event CanceledBid(bytes32 indexed orderID, address indexed bidder);

    event PlacedBid(
        bytes32 indexed orderID,
        address indexed bidder,
        uint indexed amount
    );

    // Custom error definitions for better clarity in revert messages.
    // Error indicating that the swap already exists.
    error OrderAlreadyExists();

    // Error indicating that the pool does not exist.
    error OrderDoesNotExist();

    // Error indicating that the pool does not exist.
    error BidDoesNotExist();

    // Error indicating the caller does not have permission to take the order.
    error UnauthorizedTakeAction();

    // Error indicating the action has already been completed.
    error OrderAlreadyCompleted();

    error OrderNotAllowTake();

    // Error indicating the caller does not have permission to cancel.
    error UnauthorizedCancelAction();

    // Error indicating that the token pair is invalid or not supported.
    error UnsupportedTokenPair();

    error InvalidContractAddress(address contractAddress);

    // Error indicating the sender or caller is invalid or unauthorized.
    error UnauthorizedSender();

    // Error indicating the bid amount is invalid.
    error MismatchedBidAmount(uint256 amount);

    // Error indicating the caller does not have permission to accept the bid.
    error UnauthorizedAcceptAction(address caller, address expected);

    // Error indicating the bid is not allowed or valid.
    error BidNotAllowed();

    // Error indicating the action or order has already expired.
    error BidAlreadyExpired(uint provided, uint expectedExpiry);

    // Error indicating the provided expiration time is invalid.
    error InvalidExpirationTime(uint256 provided, uint256 maximum);

    // Error indicating the minimum bid cap is invalid.
    error InvalidMinimumBidLimit();

    // Error indicating the bid has already been placed.
    error BidAlreadyPlaced();

    // Error indicating there's no bid placed.
    error NoBidPlaced();

    error NotAllowedTransferAmount(uint amount, uint allowance);

    error NotEnoughFund(uint real, uint expected);
}
