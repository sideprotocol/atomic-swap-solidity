// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {AtomicSwapBase} from "../abstracts/AtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";
import {AtomicSwapStateLogic} from "../abstracts/libs/logic/AtomicSwapStateLogic.sol";
import {TokenTransferHelper} from "../abstracts/libs/utils/TokenTransferHelper.sol";
import {IInchainAtomicSwap} from "./interfaces/IInchainAtomicSwap.sol";
import {IVesting} from "../vesting/interfaces/IVesting.sol";

/// @title Inchain Atomic Swap
/// @notice Contract for handling in-chain atomic swaps with vesting capabilities.
/// @dev Extends the AtomicSwapBase and implements the IInchainAtomicSwap interface.
contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapMsgValidator for *;
    using AtomicSwapStateLogic for *;
    using TokenTransferHelper for *;

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
        __Ownable_init_unchained(_admin);
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
    ) public payable nonReentrant returns (bytes32) {
        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.sellToken.token == makeswap.buyToken.token) {
            revert UnsupportedTokenPair();
        }
        // Validate makeswap message
        makeswap.validateMakeSwapParams();
        // Generate a unique ID and add the new swap order to the contract's state.
        bytes32 id = makeswap.uuid.generateNewAtomicSwapID(address(this));
        swapOrder.addNewSwapOrder(makeswap, id, msg.sender);
        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            if (msg.value < makeswap.sellToken.amount) {
                revert NotEnoughFund(msg.value, makeswap.sellToken.amount);
            }
        } else {
            // If selling an ERC20 token, ensure approved and transfer tokens to the contract.
            makeswap.sellToken.token.safeTransferFrom(
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
    /// @param takeswapMsg Struct containing the ID of the swap order to be taken.
    function takeSwap(
        TakeSwapMsg calldata takeswapMsg
    )
        external
        payable
        virtual
        nonReentrant // Prevents reentrancy attacks
        onlyExist(takeswapMsg.orderID) // Ensures the swap order exists
        onlyActive(takeswapMsg.orderID) // Ensures the swap order active
    {
        takeswapMsg.validateTakeSwapParams();
        AtomicSwapOrder storage _order = swapOrder[takeswapMsg.orderID];
        _order.validateTakeSwap();

        // Update order details
        _order.status = OrderStatus.COMPLETE;
        _order.completedAt = block.timestamp;
        _order.taker = msg.sender;

        _transferSellTokenToBuyer(_order, takeswapMsg.takerReceiver);
        _order.buyToken.token.transferFromWithFee(
            msg.sender,
            _order.maker,
            _order.buyToken.amount,
            sellerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(
            _order.maker,
            _order.taker,
            takeswapMsg.orderID
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
        nonReentrant // Prevents reentrancy attacks
        onlyExist(cancelswap.orderID)
        onlyActive(cancelswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage _order = swapOrder[cancelswap.orderID];
        _order.validateCancelSwap();
        // Update the status of the swap order to 'CANCEL'
        _order.status = OrderStatus.CANCEL;
        // Return the funds/tokens to the maker
        if (_order.sellToken.token == address(0)) {
            // Refund Ether if the sell token was Ether
            (bool success, ) = payable(msg.sender).call{
                value: _order.sellToken.amount
            }("");
            if (!success) {
                revert TransferFailed(msg.sender, _order.sellToken.amount);
            }
        } else {
            // Refund ERC20 tokens if the sell token was an ERC20 token
            if (
                !IERC20(_order.sellToken.token).transfer(
                    msg.sender,
                    _order.sellToken.amount
                )
            ) {
                revert TransferFailed(msg.sender, _order.sellToken.amount);
            }
        }
        // Clean up storage (optimize gas by nullifying order details)
        delete swapOrder[cancelswap.orderID];
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
        onlyExist(placeBidMsg.orderID)
        onlyActive(placeBidMsg.orderID)
    {
        bytes32 _orderID = placeBidMsg.orderID;
        uint256 _bidAmount = placeBidMsg.bidAmount;

        // Ensure the caller is the bidder
        if (placeBidMsg.bidder != msg.sender) {
            revert InvalidBidderAddress();
        }

        Bid storage _currentBid = bids[_orderID][msg.sender];
        if (_currentBid.bidder != address(0)) {
            revert BidAlreadyPlaced();
        }
        // Update last bidder expire time in order
        AtomicSwapOrder storage _order = swapOrder[placeBidMsg.orderID];
        if (_order.expiredAt < block.timestamp) {
            revert InvalidExpirationTime(_order.expiredAt, block.timestamp);
        }

        // Ensure bid amount meet bid requirements.
        if (
            _bidAmount < _order.minBidAmount ||
            _bidAmount > _order.buyToken.amount
        ) {
            revert MismatchedBidAmount(_bidAmount);
        }

        // Calculate the additional token amount being bid
        Coin storage _buyToken = swapOrder[_orderID].buyToken;
        // Handle ERC20 token or Ether bids
        if (_buyToken.token != address(0)) {
            // Ensure the bidder has sufficient funds for the bid
            // Transfer the additional bid amount from the bidder to this contract
            _buyToken.token.safeTransferFrom(
                msg.sender,
                address(this),
                _bidAmount
            );
        } else {
            // Ensure the bidder has sent sufficient Ether for the bid
            if (msg.value != _bidAmount) {
                revert MismatchedBidAmount(msg.value);
            }
        }

        // Record the new bid
        bids.addNewBid(placeBidMsg);
        emit PlacedBid(_orderID, msg.sender, _bidAmount);
    }

    /// @notice Updates an existing bid on a swap order.
    /// @param updateBidMsg Struct containing the update details.
    function updateBid(
        UpdateBidMsg calldata updateBidMsg
    )
        external
        payable
        nonReentrant // Ensures the function cannot be re-entered during execution
        onlyExist(updateBidMsg.orderID)
        onlyActive(updateBidMsg.orderID) // Ensures the order exists
    {
        // Extracting details from the updateBidMsg for easy reference
        bytes32 _orderID = updateBidMsg.orderID;
        uint256 _addition = updateBidMsg.addition;
        // Retrieving the current bid for this order and sender
        Bid storage _currentBid = bids[_orderID][msg.sender];
        if(_currentBid.expireTimestamp < block.timestamp) {
            revert BidAlreadyExpired(_currentBid.expireTimestamp,block.timestamp);
        }
        // Ensure the function caller has previously placed a bid
        if (_currentBid.bidder == address(0)) {
            revert NoBidPlaced();
        }

        // Retrieve the associated AtomicSwapOrder
        AtomicSwapOrder storage _order = swapOrder[_orderID];

        if (_currentBid.status != BidStatus.Placed) {
            revert NoBidPlaced();
        }

        // Ensure the additional bid amount is non-zero
        if (_addition == 0) {
            revert MismatchedBidAmount(_addition);
        }

        // Update the bid amount
        _currentBid.amount += _addition;
        if (_currentBid.amount > _order.buyToken.amount) {
            revert MismatchedBidAmount(_currentBid.amount);
        }

        // Retrieving details of the buy token for this order
        Coin storage _buyToken = _order.buyToken;

        // Check if the bid is in ERC20 tokens or in Ether
        if (_buyToken.token != address(0)) {
            // Bidding with ERC20 token
            // Safely transfer the additional bid amount from the bidder to this contract
            _buyToken.token.safeTransferFrom(
                msg.sender,
                address(this),
                _addition
            );
        } else {
            // Ensure the sent Ether matches the additional bid amount
            if (msg.value != _addition) {
                revert MismatchedBidAmount(msg.value);
            }
        }
        emit UpdatedBid(_orderID, _currentBid.bidder, _currentBid.amount);
    }

    /// @notice Allows the maker to accept a bid on their swap order.
    /// @param acceptBidMsg Struct containing details of the bid to accept.
    function acceptBid(
        AcceptBidMsg calldata acceptBidMsg
    )
        external
        payable
        nonReentrant
        onlyExist(acceptBidMsg.orderID)
        onlyActive(acceptBidMsg.orderID)
    {
        // Ensure no unnecessary Ether is sent with the transaction
        bytes32 _orderID = acceptBidMsg.orderID;
        address _bidder = acceptBidMsg.bidder;
        if (msg.sender == address(0)) {
            revert UnauthorizedSender();
        }
        AtomicSwapOrder storage _order = swapOrder[_orderID];
        if (!_order.acceptBid) {
            revert BidNotAllowed();
        }
        // Ensure the caller is the maker of the order
        if (_order.maker != msg.sender) {
            revert UnauthorizedAcceptAction(_order.maker, msg.sender);
        }

        // Retrieve the bid from storage
        Bid storage _selectedBid = bids[_orderID][_bidder];
        // Ensure the bid is in 'Placed' status
        if (_selectedBid.status != BidStatus.Placed) {
            revert BidNotInPlacedStatus(_selectedBid.status);
        }

        // Ensure the bid is expired or not
        if (_selectedBid.expireTimestamp < block.timestamp) {
            revert BidAlreadyExpired(
                _selectedBid.expireTimestamp,
                block.timestamp
            );
        }

        // update the order status to 'COMPLETE'
        _order.status = OrderStatus.COMPLETE;
        _order.completedAt = block.timestamp;
        _order.taker = _bidder;

        // Update the bid status to 'Executed'
        _selectedBid.status = BidStatus.Executed;

        // TODO: Check and process vesting releases
        // Process sell token transfers
        _transferSellTokenToBuyer(_order, _selectedBid.bidder);
        // Process buy token transfers
        Coin storage _buyToken = _order.buyToken;
        _buyToken.token.transferWithFee(
            _order.maker,
            _selectedBid.amount,
            sellerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );

        emit AcceptedBid(_orderID, _bidder, _selectedBid.amount);
    }

    /// @notice Allows a bidder to cancel their bid on a swap order.
    /// @param _orderID The unique identifier of the swap order.
    function cancelBid(
        bytes32 _orderID
    ) external payable nonReentrant onlyExist(_orderID) {
        // Retrieve the selected bid from storage
        Bid storage _selectedBid = bids[_orderID][msg.sender];

        // Ensure that msg.sender is same with bidder.
        if (_selectedBid.bidder != msg.sender) {
            revert UnauthorizedCancelAction();
        }

        // Ensure that the bid is in the 'Placed' status
        if (_selectedBid.status != BidStatus.Placed) {
            revert BidNotInPlacedStatus(_selectedBid.status);
        }
        // Update the bid status to 'Cancelled'
        _selectedBid.status = BidStatus.Cancelled;

        // Retrieve the buy tokens details from storage
        Coin storage _buyToken = swapOrder[_orderID].buyToken;

        // If buy token is an ERC20 token, transfer it back to the bidder
        if (_buyToken.token != address(0)) {
            _buyToken.token.safeTransfer(
                _selectedBid.bidder,
                _selectedBid.amount
            );
        } else {
            // If buy token is Ether, transfer it back to the bidder
            (bool success, ) = payable(msg.sender).call{
                value: _selectedBid.amount
            }("");
            if (!success) {
                revert TransferFailed(msg.sender, _selectedBid.amount);
            }
        }

        emit CanceledBid(_orderID, _selectedBid.bidder);
    }

    /// @notice Transfers the sell token to the buyer with optional vesting
    /// @dev This function handles both immediate transfers and vesting-based transfers of the sell token.
    /// @param _order The atomic swap order containing details of the transaction
    /// @param buyer The address of the buyer receiving the sell token
    function _transferSellTokenToBuyer(
        AtomicSwapOrder storage _order,
        address buyer
    ) internal {
        Release[] memory _releases = swapOrderVestingParams[_order.id];
        if (_releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            _order.sellToken.token.transferWithFee(
                buyer,
                _order.sellToken.amount,
                buyerFeeRate,
                MAX_FEE_RATE_SCALE,
                treasury
            );
        } else {
            // Transfer sell token to vesting contract
            uint256 _sellTokenFee = (_order.sellToken.amount * buyerFeeRate) /
                MAX_FEE_RATE_SCALE;
            uint256 _sellTokenAmountAfterFee = _order.sellToken.amount -
                _sellTokenFee;
            if (_order.sellToken.token == address(0)) {
                // Take Fee.
                (bool successToTreasury, ) = payable(address(treasury)).call{
                    value: _sellTokenFee
                }("");
                if (!successToTreasury) {
                    revert TransferFailed(address(treasury), _sellTokenFee);
                }
                vestingManager.startVesting{value: _sellTokenAmountAfterFee}(
                    _order.id,
                    buyer,
                    _order.sellToken.token,
                    _sellTokenAmountAfterFee,
                    _releases
                );
            } else {
                // Take Fee.
                _order.sellToken.token.safeTransfer(
                    address(treasury),
                    _sellTokenFee
                );
                IERC20(_order.sellToken.token).approve(
                    address(vestingManager),
                    _sellTokenAmountAfterFee
                );
                vestingManager.startVesting(
                    _order.id,
                    buyer,
                    _order.sellToken.token,
                    _sellTokenAmountAfterFee,
                    _releases
                );
            }
        }
    }
}
