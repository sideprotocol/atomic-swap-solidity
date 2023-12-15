// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AtomicSwapBase} from "../abstracts/AtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";
import {AtomicSwapStateLogic} from "../abstracts/libs/logic/AtomicSwapStateLogic.sol";
import {IInchainAtomicSwap} from "./interfaces/IInchainAtomicSwap.sol";
import {IVesting} from "../vesting/interfaces/IVesting.sol";
/// @title Inchain Atomic Swap
/// @notice Contract for handling in-chain atomic swaps with vesting capabilities.
/// @dev Extends the AtomicSwapBase and implements the IInchainAtomicSwap interface.
contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapMsgValidator for *;
    using AtomicSwapStateLogic for *;

    /// @notice Initializes the contract with necessary parameters.
    /// @param _admin The admin address for the contract.
    /// @param _vestingManager The address of the vesting manager contract.
    /// @param _treasury The address where fees are collected.
    /// @param _sellerFee The fee rate for the seller in the swap.
    /// @param _buyerFee The fee rate for the buyer in the swap.
    function initialize(
        address _admin,
        address _vault,
        address _vestingManager,
        address _treasury,
        uint256 _sellerFee,
        uint256 _buyerFee
    ) external initializer {
        __OwnablePausableUpgradeable_init(_admin);
        if (_sellerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidSellerFee();
        }
        if (_buyerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidBuyerFee();
        }
        if (_treasury == address(0)) {
            revert InvalidTreasuryAddress();
        }
        sellerFeeRate = _sellerFee;
        buyerFeeRate = _buyerFee;
        treasury = _treasury;
        vault = _vault;
        vestingManager = IVesting(_vestingManager);
    }

    /// @notice Creates a new swap order.
    /// @param makeswap Struct containing details of the swap order.
    /// @return id Returns the unique identifier of the created swap order.
    function makeSwap(
        MakeSwapMsg calldata makeswap
    ) public payable nonReentrant whenNotPaused returns (bytes32 id) {
        AtomicSwapMsgValidator.validateMakeSwapParams(makeswap);
        id = swapOrder.makeSwap(makeswap);
        emit AtomicSwapOrderCreated(id);
    }

    /// @notice Creates a new swap order with vesting parameters.
    /// @param makeswap Struct containing details of the swap order.
    /// @param releases Array of vesting release parameters.
    function makeSwapWithVesting(
        MakeSwapMsg calldata makeswap,
        Release[] calldata releases
    ) external payable returns(bytes32 orderId) {
        releases.validateVestingParams();
        orderId = makeSwap(makeswap);
        for (uint256 i = 0; i < releases.length; i++) {
            swapOrderVestingParams[orderId].push(releases[i]);
        }
    }

    function executeSwapWithPermit(
        SwapWithPermitMsg calldata swap,
        Release[] calldata releases 
    ) external  nonReentrant whenNotPaused {
        if(swap.sellToken.token == swap.buyToken.token) {
            revert UnsupportedTokenPair();
        }
        FeeParams memory params = FeeParams(
            sellerFeeRate,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        (bytes32 orderId, address maker, address taker) = swapOrder.executeSwapWithPermit(
            swap,
            releases,
            vault,
            vestingManager,
            params
        );
        emit AtomicSwapOrderCreated(orderId);
        if(swap.acceptBid) {
            emit AcceptedBid(orderId,maker,swap.buyToken.amount);
        }else{
            emit AtomicSwapOrderTook(
                maker,
                taker,
                orderId
            );
        }
    }

    /// @notice Allows a user to complete a swap order.
    /// @param takeswap Struct containing the ID of the swap order to be taken.
    function takeSwap(
        TakeSwapMsg calldata takeswap
    )
        external
        payable
        virtual
        whenNotPaused
        nonReentrant // Prevents reentrancy attacks
        onlyExist(takeswap.orderID) // Ensures the swap order exists
        onlyActiveOrder(takeswap.orderID) // Ensures the swap order active
    {
        AtomicSwapOrder storage order = swapOrder[takeswap.orderID];
        order.takeSwap(
            takeswap,
            swapOrderVestingParams[order.id], 
            vestingManager,
            sellerFeeRate,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(
            order.maker,
            order.taker,
            takeswap.orderID
        );
    }

    /// @notice Allows the maker of a swap order to cancel it.
    /// @param cancelswap Struct containing the ID of the swap order to be canceled.

    function cancelSwap(
        CancelSwapMsg calldata cancelswap
    )
        external
        payable
        virtual
        whenNotPaused
        nonReentrant // Prevents reentrancy attacks
        onlyExist(cancelswap.orderID)
        onlyActiveOrder(cancelswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage order = swapOrder[cancelswap.orderID];
        order.cancelSwap();
        // Emit an event to notify that the swap order has been canceled
        emit AtomicSwapOrderCanceled(cancelswap.orderID);
    }

    /// @notice Allows a user to place a bid on a swap order.
    /// @param placeBidMsg Struct containing details of the bid.
    function placeBid(
        PlaceBidMsg calldata placeBidMsg
    )
        external
        payable
        nonReentrant
        whenNotPaused
        onlyExist(placeBidMsg.orderID)
        onlyActiveOrder(placeBidMsg.orderID)
    {
        swapOrder.placeBid(
            bids,
            placeBidMsg
        );
        emit PlacedBid(placeBidMsg.orderID, msg.sender, placeBidMsg.bidAmount);
    }

    /// @notice Updates an existing bid on a swap order.
    /// @param updateBidMsg Struct containing the update details.
    function updateBid(
        UpdateBidMsg calldata updateBidMsg
    )
        external
        payable
        whenNotPaused
        nonReentrant // Ensures the function cannot be re-entered during execution
        onlyExist(updateBidMsg.orderID)
        onlyActiveOrder(updateBidMsg.orderID) // Ensures the order exists
    {
        (address bidder, uint amount) = swapOrder.updateBid(
            bids,
            updateBidMsg
        );
        emit UpdatedBid(updateBidMsg.orderID, bidder, amount);
    }

    /// @notice Allows the maker to accept a bid on their swap order.
    /// @param acceptBidMsg Struct containing details of the bid to accept.
    function acceptBid(
        AcceptBidMsg calldata acceptBidMsg
    )
        external
        payable
        whenNotPaused
        nonReentrant
        onlyExist(acceptBidMsg.orderID)
        onlyActiveOrder(acceptBidMsg.orderID)
    {
        (address bidder, uint amount) = swapOrder.acceptBid(
            bids, 
            swapOrderVestingParams,
            acceptBidMsg,
            vestingManager, 
            sellerFeeRate, 
            buyerFeeRate, 
            MAX_FEE_RATE_SCALE,
            treasury
        );
        emit AcceptedBid(acceptBidMsg.orderID, bidder,amount);
    }

    /// @notice Allows a bidder to cancel their bid on a swap order.
    /// @param orderID The unique identifier of the swap order.
    function cancelBid(
        bytes32 orderID
    ) external payable whenNotPaused nonReentrant onlyExist(orderID) {
        address bidder =  swapOrder.cancelBid(
            bids, 
            orderID
        );
        emit CanceledBid(orderID, bidder);
    }
}
