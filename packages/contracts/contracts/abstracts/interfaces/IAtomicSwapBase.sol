// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title IAtomicSwapBase
/// @notice Interface for atomic swap operations and data structures.
/// @dev Defines enums, structs, events, and custom errors for atomic swaps.
interface IAtomicSwapBase {
    /// @notice Enumeration of different message types in an atomic swap.
    enum MsgType {
        MAKESWAP,
        TAKESWAP,
        CANCELSWAP,
        PLACEBID,
        UPDATEBID,
        ACCEPTBID,
        CANCELBID
    }

    /// @notice Represents a coin with its address (use address(0) for Ether) and amount.
    struct Coin {
        address token; // Token address or zero address for Ether.
        uint256 amount; // Amount of the token.
    }

    /// @notice Enumeration of possible statuses of an atomic swap order.
    enum OrderStatus {
        INITIAL, // Default status upon creation.
        CANCEL, // Status when canceled.
        COMPLETE, // Status when successfully executed.
        SYNC // Additional status for synchronization.
    }

    /// @notice Details of an atomic swap order.
    struct AtomicSwapOrder {
        bytes32 id; // Unique identifier.
        OrderStatus status; // Current status.
        address maker; // Creator of the order.
        Coin sellToken; // Token/coin to sell.
        address taker; // User accepting the order.
        Coin buyToken; // Token/coin to buy.
        uint256 minBidAmount; // Minimum acceptable bid.
        uint256 createdAt; // Creation timestamp.
        uint256 canceledAt; // Cancellation timestamp.
        uint256 completedAt; // Completion timestamp.
        uint256 expiredAt; // Expiration timestamp.
        bool acceptBid; // True if the order accepts bids.
    }

    /// @notice Enumeration of bid statuses in an atomic swap.
    enum BidStatus {
        Cancelled,
        Executed,
        Placed // Default status upon placement.
    }

    /// @notice Represents a bid on an atomic swap order.
    struct Bid {
        uint256 amount; // Bid amount.
        bytes32 order; // Associated order ID.
        BidStatus status; // Current status.
        address bidder; // Bidder's address.
        address bidderReceiver; // Address to receive the swapped asset.
        uint256 receiveTimestamp; // Receipt timestamp.
        uint256 expireTimestamp; // Expiration timestamp.
    }

    /// @notice Details for creating an atomic swap order.
    struct MakeSwapMsg {
        bytes32 uuid; // UUID from frontend.
        Coin sellToken; // Token/coin to sell.
        Coin buyToken; // Token/coin to buy.
        address maker; // Order creator.
        address desiredTaker; // Desired taker address.
        uint256 minBidAmount; // Minimum bid.
        uint256 expireAt; // Expiration timestamp.
        bool acceptBid; // True if accepting bids.
    }

    /// @notice Release parameters for vesting schedules.
    struct Release {
        uint256 durationInHours; // Duration until release.
        uint256 percentage; // Percentage of total to release.
    }

    /// @notice Details for taking an existing atomic swap order.
    struct TakeSwapMsg {
        bytes32 orderID; // Order ID.
        address takerReceiver; // Receiver of the swapped asset.
    }

    /// @notice Details for placing a bid on an atomic swap order.
    struct PlaceBidMsg {
        uint256 bidAmount; // Bid amount.
        address bidder; // Bidder's address.
        address bidderReceiver; // Receiver of the swapped asset.
        bytes32 orderID; // Order ID.
        uint256 expireTimestamp; // Expiration timestamp.
    }

    /// @notice Details for updating an existing bid.
    struct UpdateBidMsg {
        bytes32 orderID; // Order ID.
        address bidder; // Bidder's address.
        uint256 addition; // Additional amount.
    }

    /// @notice Details for accepting a bid on an atomic swap order.
    struct AcceptBidMsg {
        bytes32 orderID; // Order ID.
        address bidder; // Bidder's address.
    }

    /// @notice Details for canceling an atomic swap order.
    struct CancelSwapMsg {
        bytes32 orderID; // Order ID.
    }

    struct CounterOfferMsg {
        bytes32 orderID; // Order ID.
        address bidder; // Bidder's address.
        uint256 amount; // Counteroffer amount.
    }

    // Custom errors
    error BidNotInPlacedStatus(BidStatus status);
    error OrderAlreadyExists();
    error OrderDoesNotExist();
    error BidDoesNotExist();
    error UnauthorizedTakeAction();
    error OrderAlreadyCompleted();
    error OrderNotAllowTake();
    error UnauthorizedCancelAction();
    error UnsupportedTokenPair();
    error InvalidContractAddress(address contractAddress);
    error UnauthorizedSender();
    error MismatchedBidAmount(uint256 amount);
    error UnauthorizedAcceptAction(address caller, address expected);
    error BidNotAllowed();
    error BidAlreadyExpired(uint256 provided, uint256 expectedExpiry);
    error InvalidExpirationTime(uint256 provided, uint256 maximum);
    error InvalidMinimumBidLimit();
    error BidAlreadyPlaced();
    error NoBidPlaced();
    error NotAllowedTransferAmount(uint256 amount, uint256 allowance);
    error NotEnoughFund(uint256 real, uint256 expected);
    error ZeroReleaseSchedule();
    error InvalidTotalPercentage();
    error OverMaximumReleaseStep();

    // Events
    event AtomicSwapOrderCreated(bytes32 indexed id);
    event AtomicSwapOrderTook(address indexed maker, address indexed taker, bytes32 indexed id);
    event AtomicSwapOrderCanceled(bytes32 indexed id);
    event ReceivedNewBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
    event UpdatedBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
    event AcceptedBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
    event CanceledBid(bytes32 indexed orderID, address indexed bidder);
    event PlacedBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
}
