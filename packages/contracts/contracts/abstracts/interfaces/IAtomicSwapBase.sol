// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title IAtomicSwapBase
/// @notice Interface for atomic swap operations and data structures.
/// @dev Defines enums, structs, events, and custom errors for atomic swaps.
interface IAtomicSwapBase {
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

    /// @notice Release parameters for vesting schedules.
    struct Release {
        uint256 durationInHours; // Duration until release.
        uint256 percentage; // Percentage of total to release.
    }


    // Signature 
    struct PermitSignature {
        uint8 v;
        bytes32 r; 
        bytes32 s; 
        address owner;
        uint256 deadline;
    }

    struct FeeParams {
        uint    sellerFeeRate;
        uint    buyerFeeRate;
        uint    maxFeeRateScale;
        address treasury;
    }

    // Swap with permit
    struct SwapWithPermitMsg {
        bytes32 uuid; // UUID from frontend.
        Coin sellToken; // Token/coin to sell.
        Coin buyToken; // Token/coin to buy.
        address desiredTaker; // Desired taker address.
        uint256 minBidAmount; // Minimum bid.
        bool   acceptBid;
        bool withdrawToSellerAccount;
        bool withdrawToBuyerAccount;
        PermitSignature sellerSignature;
        PermitSignature buyerSignature;
    }

    // Custom errors
    error OrderAlreadyExists();
    error OrderAlreadyExpired(uint256 current, uint256 expiredTime);
    error UnsupportedTokenPair();
    error InvalidSigners();
    error UnauthorizedSender();
    error InvalidMinBidAmount(uint256 amount);
    error InvalidExpirationTime(uint256 provided, uint256 maximum);
    
    error NotEnoughFund(uint256 real, uint256 expected);
    error DuplicateReleaseSchedule();
    error ZeroReleaseSchedule();
    error InvalidReleasePercentage();
    error InvalidTotalPercentage();
    error OverMaximumReleaseStep();
    error InvalidAddress();
    error InvalidSellerFee();
    error InvalidBuyerFee();
    error InvalidTreasuryAddress();

    // Events
    event AtomicSwapOrderCreated(bytes32 indexed id);
    event AtomicSwapOrderTook(address indexed maker, address indexed taker, bytes32 indexed id);
    event AcceptedBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
    
}
