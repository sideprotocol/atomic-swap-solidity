// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IAtomicSwap {
    enum OrderStatus {
        INITIAL,
        CANCEL,
        COMPLETE
    }

    struct Coin {
        address token;
        uint256 amount;
    }

    struct AtomicSwapOrder {
        bytes32 id;
        OrderStatus status;
        address maker;
        Coin sellToken;
        address taker;
        Coin buyToken;
        uint minBidCap;
        uint createdAt;
        uint canceledAt;
        uint completedAt;
        uint expiredAt;
    }

    enum BidStatus {
        Cancelled,
        Executed,
        Placed
    }

    struct Bid {
        uint256 amount;
        bytes32 order;
        BidStatus status;
        address bidder;
        uint256 receiveTimestamp;
        uint256 expireTimestamp;
    }

    struct MakeSwapMsg {
        Coin sellToken;
        Coin buyToken;
        address desiredTaker;
        uint minBidCap;
        uint expireAt;
    }

    struct TakeSwapMsg {
        bytes32 orderID;
        address takerReceiver;
    }

    struct PlaceBidMsg {
        address bidder;
        uint256 bidAmount;
        bytes32 orderID;
        uint256 expireTimestamp;
    }

    struct AcceptBidMsg {
        bytes32 orderID;
        address bidder;
    }

    struct CancelSwapMsg {
        bytes32 orderID;
    }

    // Events
    event PaymentReceived(
        address indexed payer,
        uint256 amount,
        uint256 daoShare,
        uint256 burned
    );
    event AtomicSwapOrderCreated(bytes32 indexed id);
    event AtomicSwapOrderTook(
        address indexed maker,
        address indexed taker,
        bytes32 indexed id
    );

    event AtomicSwapOrderCanceled(bytes32 indexed id);

    // Define errors
    error AlreadyExistPool();

    error NonExistPool();

    error NoPermissionToTake();

    error AlreadyCompleted();

    error NoPermissionToCancel();

    error NotAllowedAmount(uint256 real, uint256 expected);

    error WrongExpireTime(uint256 real, uint256 current);

    error InvalidTokenPair();

    error ZeroTokenAddress();

    error InvalidSender();

    error InvalidBidAmount(uint256 amount);

    error TokenTransferFailed();

    error NoPermissionToAccept(address real, address expected);

    error InvalidBidder(address real, address expected);

    error NoPlaceStatusOfBid(BidStatus status);

    error AlreadyExpired(uint real, uint expected);

    error NotExpired(uint real, uint expected);

    error InvalidExpireTime(uint256 max, uint value);

    error InvalidMinBidCap();
}
