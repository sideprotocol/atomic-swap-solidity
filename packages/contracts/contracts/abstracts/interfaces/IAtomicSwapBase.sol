// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title IAtomicSwapBase
/// @notice Interface for defining the basic structures and functionalities required for atomic swap operations.
/// @dev This interface includes enums, structs, events, and custom errors essential for implementing atomic swaps.
interface IAtomicSwapBase {
    
    /// @notice Struct representing a cryptocurrency or token with its address and amount.
    /// @dev Address should be set to the zero address for Ether transactions.
    struct Coin {
        address token; // The address of the token, or the zero address for Ether.
        uint256 amount; // The amount of the token or Ether.
    }

    /// @notice Enum defining the possible states of an atomic swap order.
    /// @dev These states help track the lifecycle of a swap order.
    enum OrderStatus {
        INITIAL, // The initial state of the order upon creation.
        CANCEL, // The state after the order has been canceled.
        COMPLETE, // The state when the order has been successfully executed.
        SYNC // An additional state used for synchronization purposes.
    }

    /// @notice Struct detailing the attributes of an atomic swap order.
    /// @dev Captures all necessary information about a swap order.
    struct AtomicSwapOrder {
        bytes32 id; // Unique identifier for the order.
        OrderStatus status; // Current status of the order.
        address maker; // Address of the order creator.
        Coin sellToken; // Token being sold.
        address taker; // Address of the user accepting the order, if specified.
        Coin buyToken; // Token being bought.
        uint256 minBidAmount; // Minimum bid amount acceptable for the order.
        uint256 createdAt; // Timestamp of order creation.
        uint256 canceledAt; // Timestamp of order cancellation.
        uint256 completedAt; // Timestamp of order completion.
        uint256 expiredAt; // Timestamp of order expiration.
        bool acceptBid; // Indicates if the order is open to bids.
    }

    /// @notice Struct defining the release parameters for token vesting.
    /// @dev Used to set vesting schedules for token releases.
    struct Release {
        uint256 durationInHours; // Duration in hours until the release of a portion of the tokens.
        uint256 percentage; // Percentage of total tokens to be released.
    }

    /// @notice Struct representing a signature for permits in the context of atomic swaps.
    /// @dev Used for securely authorizing operations in atomic swaps.
    struct PermitSignature {
        uint8 v; // Recovery byte of the signature.
        bytes32 r; // First 32 bytes of the signature.
        bytes32 s; // Second 32 bytes of the signature.
        address owner; // The owner of the signature.
        uint256 deadline; // Deadline until which the signature is valid.
    }

    /// @notice Struct for defining fee parameters in a swap.
    /// @dev Includes fees for both seller and buyer, and the maximum scale for fee rates.
    struct FeeParams {
        uint256 sellerFeeRate; // Fee rate for the seller.
        uint256 buyerFeeRate; // Fee rate for the buyer.
        uint256 maxFeeRateScale; // Maximum scale factor for calculating fees.
        address treasury; // Address of the treasury where fees are deposited.
    }

    /// @notice Struct for a message used in swap operations that require permits.
    /// @dev Includes all necessary details for executing a swap with permit authorization.
    struct SwapWithPermitMsg {
        bytes32 uuid; // Unique identifier, usually provided by the frontend.
        Coin sellToken; // Details of the token to sell.
        Coin buyToken; // Details of the token to buy.
        address desiredTaker; // Specific address of the desired taker, if applicable.
        uint256 minBidAmount; // Minimum amount for bids on this swap.
        bool acceptBid; // Flag indicating if bids are accepted.
        bool completeByBid; // Flag indicating if order is completed by bid mode.
        bool withdrawToSellerAccount; // Flag for direct withdrawal to seller's account.
        bool withdrawToBuyerAccount; // Flag for direct withdrawal to buyer's account.
        Release[] releases; // Releases data for vesting mode.
        PermitSignature sellerSignature; // Seller's signature for permit authorization.
        PermitSignature buyerSignature; // Buyer's signature for permit authorization.
    }

    // Custom errors for specific revert conditions in atomic swap operations.
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

    // Events to be emitted for different stages and activities in atomic swaps.
    event AtomicSwapOrderCreated(bytes32 indexed id);
    event AtomicSwapOrderTook(bytes32 indexed id,address indexed maker, address indexed taker);
    event AcceptedBid(bytes32 indexed orderID, address indexed bidder, uint256 indexed amount);
}
