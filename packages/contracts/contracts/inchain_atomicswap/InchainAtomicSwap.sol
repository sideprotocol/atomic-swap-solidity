// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {AtomicSwapBase} from "../abstracts/AtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";
import {AtomicSwapStateLogic} from "../abstracts/libs/logic/AtomicSwapStateLogic.sol";
import {AnteHandler} from "../abstracts/libs/utils/AnteHandler.sol";
import {IInchainAtomicSwap} from "./interfaces/IInchainAtomicSwap.sol";
import {IVesting} from "../vesting/interfaces/IVesting.sol";
/// @title Inchain Atomic Swap
/// @notice Contract for handling in-chain atomic swaps with vesting capabilities.
/// @dev Extends the AtomicSwapBase and implements the IInchainAtomicSwap interface.
contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapMsgValidator for *;
    using AtomicSwapStateLogic for *;
    using AnteHandler for *;
    /// @notice Initializes the contract with necessary parameters.
    /// @param _admin The admin address for the contract.
    /// @param _vestingManager The address of the vesting manager contract.
    /// @param _treasury The address where fees are collected.
    /// @param _sellerFee The fee rate for the seller in the swap.
    /// @param _buyerFee The fee rate for the buyer in the swap.
    function initialize(
        address _admin,
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
        vestingManager = IVesting(_vestingManager);
    }

    /// @notice Creates a new swap order.
    /// @param makeswap Struct containing details of the swap order.
    /// @return Returns the unique identifier of the created swap order.
    function makeSwap(
        MakeSwapMsg calldata makeswap
    ) public payable nonReentrant whenNotPaused returns (bytes32) {
        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.sellToken.token == makeswap.buyToken.token) {
            revert UnsupportedTokenPair();
        }
        // Validate makeswap message
        makeswap.validateMakeSwapParams();
        // Generate a unique ID and add the new swap order to the contract's state.
    
        // UUID should be unique, In current logic anyone can spam orders with uuid and code
        // will fail when we send some uuid from frontend
        bytes32 id = makeswap.uuid.generateNewAtomicSwapID(address(this));
        swapOrder.addNewSwapOrder(makeswap, id, msg.sender);
        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            if (msg.value < makeswap.sellToken.amount) {
                revert NotEnoughFund(msg.value, makeswap.sellToken.amount);
            }
        } else {
            // If selling an ERC20 token, ensure approved and transfer tokens to the contract.
            TransferHelper.safeTransferFrom(
                makeswap.sellToken.token,
                msg.sender,
                address(this),
                makeswap.sellToken.amount
            );
        }
        // Emit an event signaling the creation of a new swap order.
        emit AtomicSwapOrderCreated(id);
        return id;
    }

    /// @notice Creates a new swap order with vesting parameters.
    /// @param makeswap Struct containing details of the swap order.
    /// @param releases Array of vesting release parameters.
    function makeSwapWithVesting(
        MakeSwapMsg calldata makeswap,
        Release[] calldata releases
    ) external payable {
        releases.validateVestingParams();
        bytes32 orderId = makeSwap(makeswap);
        for (uint256 i = 0; i < releases.length; i++) {
            swapOrderVestingParams[orderId].push(releases[i]);
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
        order.validateTakeSwap(takeswap);

        // Update order details
        order.status = OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;
        order.taker = msg.sender;
        
        _transferSellTokenToBuyer(order, takeswap.takerReceiver);
        order.buyToken.token.transferFromWithFee(
            order.maker,
            order.buyToken.amount,
            sellerFeeRate,
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
        order.validateCancelSwap();
        // Update the status of the swap order to 'CANCEL'
        order.status = OrderStatus.CANCEL;
        // Return the funds/tokens to the maker
        if (order.sellToken.token == address(0)) {
            // Refund Ether if the sell token was Ether
            TransferHelper.safeTransferETH(msg.sender,order.sellToken.amount);
        } else {
            // Refund ERC20 tokens if the sell token was an ERC20 token
            TransferHelper.safeTransfer(
                order.sellToken.token,
                msg.sender,
                order.sellToken.amount
            );
        }
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
        bytes32 orderID = placeBidMsg.orderID;
        uint256 bidAmount = placeBidMsg.bidAmount;
        // Ensure the caller is the bidder
        if (placeBidMsg.bidder != msg.sender) {
            revert InvalidBidderAddress();
        }

        Bid storage currentBid = bids[orderID][msg.sender];
        if (currentBid.bidder != address(0)) {
            revert BidAlreadyPlaced();
        }
        // Update last bidder expire time in order
        AtomicSwapOrder storage order = swapOrder[placeBidMsg.orderID];
        if(!order.acceptBid) {
            revert BidNotAllowed();
        }
        if (order.expiredAt < block.timestamp) {
            revert InvalidExpirationTime(order.expiredAt, block.timestamp);
        }
        // Ensure bid amount meet bid requirements.
        if (
            bidAmount < order.minBidAmount ||
            bidAmount > order.buyToken.amount
        ) {
            revert MismatchedBidAmount(bidAmount);
        }

        // Calculate the additional token amount being bid
        Coin storage buyToken = swapOrder[orderID].buyToken;
        // Handle ERC20 token or Ether bids
        if (buyToken.token != address(0)) {
            // Ensure the bidder has sufficient funds for the bid
            // Transfer the additional bid amount from the bidder to this contract
            TransferHelper.safeTransferFrom(
                buyToken.token,
                msg.sender,
                address(this),
                bidAmount
            );
        } else {
            // Ensure the bidder has sent sufficient Ether for the bid
            if (msg.value != bidAmount) {
                revert MismatchedBidAmount(msg.value);
            }
        }

        // Record the new bid
        bids.addNewBid(placeBidMsg);
        emit PlacedBid(orderID, msg.sender, bidAmount);
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
        // Extracting details from the updateBidMsg for easy reference
        bytes32 orderID = updateBidMsg.orderID;
        uint256 addition = updateBidMsg.addition;
        // Retrieving the current bid for this order and sender
        Bid storage currentBid = bids[orderID][msg.sender];
        if(currentBid.expireTimestamp < block.timestamp) {
            revert BidAlreadyExpired(currentBid.expireTimestamp,block.timestamp);
        }
        // Ensure the function caller has previously placed a bid
         // It doesn't happen in normal senarios
        if (currentBid.bidder == address(0)) {
            revert NoBidPlaced();
        }

        // Retrieve the associated AtomicSwapOrder
        AtomicSwapOrder storage order = swapOrder[orderID];

        // It doesn't happen in normal senarios 
        if (currentBid.status != BidStatus.Placed) {
            revert NoBidPlaced();
        }

        // Ensure the additional bid amount is non-zero
        if (addition == 0) {
            revert MismatchedBidAmount(addition);
        }

        // Update the bid amount
        currentBid.amount += addition;
        if (currentBid.amount > order.buyToken.amount) {
            revert MismatchedBidAmount(currentBid.amount);
        }

        // Retrieving details of the buy token for this order
        Coin storage buyToken = order.buyToken;

        // Check if the bid is in ERC20 tokens or in Ether
        if (buyToken.token != address(0)) {
            // Bidding with ERC20 token
            // Safely transfer the additional bid amount from the bidder to this contract
            TransferHelper.safeTransferFrom(
                buyToken.token,
                msg.sender,
                address(this),
                addition
            );
        } else {
            // Ensure the sent Ether matches the additional bid amount
            if (msg.value != addition) {
                revert MismatchedBidAmount(msg.value);
            }
        }
        emit UpdatedBid(orderID, currentBid.bidder, currentBid.amount);
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
        // Ensure no unnecessary Ether is sent with the transaction
        bytes32 orderID = acceptBidMsg.orderID;
        address bidder = acceptBidMsg.bidder;
        if (msg.sender == address(0)) {
            revert UnauthorizedSender();
        }
        AtomicSwapOrder storage order = swapOrder[orderID];
        if (!order.acceptBid) {
            revert BidNotAllowed();
        }
        // Ensure the caller is the maker of the order
        if (order.maker != msg.sender) {
            revert UnauthorizedAcceptAction(order.maker, msg.sender);
        }

        // Retrieve the bid from storage
        Bid storage selectedBid = bids[orderID][bidder];
        // Ensure the bid is in 'Placed' status
        if (selectedBid.status != BidStatus.Placed) {
            revert BidNotInPlacedStatus(selectedBid.status);
        }

        // Ensure the bid is expired or not
        if (selectedBid.expireTimestamp < block.timestamp) {
            revert BidAlreadyExpired(
                selectedBid.expireTimestamp,
                block.timestamp
            );
        }

        // update the order status to 'COMPLETE'
        order.status = OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;
        order.taker = bidder;

        // Update the bid status to 'Executed'
        selectedBid.status = BidStatus.Executed;

        // Process sell token transfers
        _transferSellTokenToBuyer(order, selectedBid.bidder);
        // Process buy token transfers
        Coin storage buyToken = order.buyToken;
        buyToken.token.transferWithFee(
            order.maker,
            selectedBid.amount,
            sellerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );

        emit AcceptedBid(orderID, bidder, selectedBid.amount);
    }

    /// @notice Allows a bidder to cancel their bid on a swap order.
    /// @param orderID The unique identifier of the swap order.
    function cancelBid(
        bytes32 orderID
    ) external payable whenNotPaused nonReentrant onlyExist(orderID) {
        // Retrieve the selected bid from storage
        Bid storage selectedBid = bids[orderID][msg.sender];

        // Ensure that msg.sender is same with bidder.
        if (selectedBid.bidder != msg.sender) {
            revert UnauthorizedCancelAction();
        }

        // Ensure that the bid is in the 'Placed' status
        if (selectedBid.status != BidStatus.Placed) {
            revert BidNotInPlacedStatus(selectedBid.status);
        }
        // Update the bid status to 'Cancelled'
        selectedBid.status = BidStatus.Cancelled;

        // Retrieve the buy tokens details from storage
        Coin storage buyToken = swapOrder[orderID].buyToken;

        // If buy token is an ERC20 token, transfer it back to the bidder
        if (buyToken.token != address(0)) {
            TransferHelper.safeTransfer(
                buyToken.token,
                selectedBid.bidder,
                selectedBid.amount
            );
        } else {
            // If buy token is Ether, transfer it back to the bidder
            TransferHelper.safeTransferETH(
                msg.sender,
                selectedBid.amount
            );
        }

        emit CanceledBid(orderID, selectedBid.bidder);
    }

    /// @notice Transfers the sell token to the buyer with optional vesting
    /// @dev This function handles both immediate transfers and vesting-based transfers of the sell token.
    /// @param order The atomic swap order containing details of the transaction
    /// @param buyer The address of the buyer receiving the sell token
    function _transferSellTokenToBuyer(
        AtomicSwapOrder storage order,
        address buyer
    ) internal {
        Release[] memory releases = swapOrderVestingParams[order.id];
        if (releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            order.sellToken.token.transferWithFee(
                buyer,
                order.sellToken.amount,
                buyerFeeRate,
                MAX_FEE_RATE_SCALE,
                treasury
            );
        } else {
            // Transfer sell token to vesting contract
            uint256 sellTokenFee = (order.sellToken.amount * buyerFeeRate) /
                MAX_FEE_RATE_SCALE;
            uint256 sellTokenAmountAfterFee = order.sellToken.amount -
                sellTokenFee;
            if (order.sellToken.token == address(0)) {
                TransferHelper.safeTransferETH(
                    treasury,
                    sellTokenFee
                );
                // Take Fee.
                // slither-disable-next-line arbitrary-send-eth
                vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases
                );
            } else {
                // Take Fee.
                TransferHelper.safeTransfer(
                    order.sellToken.token,
                    address(treasury),
                    sellTokenFee
                );
                IERC20(order.sellToken.token).approve(
                    address(vestingManager),
                    sellTokenAmountAfterFee
                );
                vestingManager.startVesting(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases
                );
            }
        }
    }
}
