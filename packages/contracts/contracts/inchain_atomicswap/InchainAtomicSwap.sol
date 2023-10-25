// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../abstracts/AtomicSwapBase.sol";
import "../abstracts/libs/AtomicSwapHelper.sol";
import "./interfaces/IInchainAtomicSwap.sol";
import "hardhat/console.sol";

contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapHelper for *;

    function initialize(
        address _admin,
        address _treasury,
        uint _sellerFee,
        uint _buyerFee
    ) external initializer {
        __Ownable_init_unchained(_admin);
        __Nonces_init_unchained();
        require(_sellerFee < maxFee, "sellerFee has to be smaller than maxFee");
        require(_buyerFee < maxFee, "sellerFee has to be smaller than maxFee");
        require(_treasury != address(0), "invalid treasury address");
        sellerFeeRate = _sellerFee;
        buyerFeeRate = _buyerFee;
        treasury = _treasury;
    }

    // /**
    //  * @notice Creates a new swap order in the contract.
    //  * @param makeswap Struct containing the details of the swap order to be created.
    //  */

    function makeSwap(
        MakeSwapMsg calldata makeswap
    ) external payable nonReentrant {
        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.sellToken.token == makeswap.buyToken.token) {
            revert UnsupportedTokenPair();
        }

        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.minBidAmount <= 0) {
            revert InvalidMinimumBidLimit();
        }

        // Ensure the caller is the maker of the swap order.
        if (msg.sender == address(0)) {
            revert UnauthorizedSender();
        }

        // Ensure the expireAt is the future time.
        if (makeswap.expireAt < block.timestamp) {
            revert InvalidExpirationTime(makeswap.expireAt, block.timestamp);
        }

        // Generate a unique ID and add the new swap order to the contract's state.
        bytes32 id = _useNonce(msg.sender).generateNewAtomicSwapID(msg.sender);
        swapOrder.addNewSwapOrder(makeswap, id, msg.sender);

        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            require(msg.value >= makeswap.sellToken.amount, "Not enough ether");
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
    }

    // /**
    //  * @notice Allows a taker to complete a swap order by exchanging tokens.
    //  * @param takeswap A struct containing the ID of the swap order to be taken.
    //  */
    function takeSwap(
        TakeSwapMsg calldata takeswap
    )
        external
        payable
        virtual
        nonReentrant // Prevents reentrancy attacks
        onlyExist(takeswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage order = swapOrder[takeswap.orderID];
        // Ensure the caller is the designated taker of the swap order
        if (order.acceptBid) {
            revert OrderNotAllowTake();
        }

        if (order.taker != address(0) && order.taker != msg.sender) {
            revert UnauthorizedTakeAction();
        }

        // Ensure the swap order has not already been completed
        if (order.status == OrderStatus.COMPLETE) {
            revert OrderAlreadyCompleted();
        }

        // Update order details
        order.status = OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;

        // Exchange the tokens
        // If buying with ERC20 tokens
        order.sellToken.token.processTransfer(
            takeswap.takerReceiver,
            order.sellToken.amount,
            buyerFeeRate,
            maxFee,
            treasury
        );

        order.buyToken.token.processTransferFrom(
            msg.sender,
            order.maker,
            order.buyToken.amount,
            sellerFeeRate,
            maxFee,
            treasury
        );
        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(order.maker, order.taker, takeswap.orderID);
    }

    // /**
    //  * @notice Allows the maker of a swap order to cancel it.
    //  * @dev The function documentation mentions an upcoming update with EIP 1193 to improve user readability regarding transaction messages.
    //  * @param cancelswap A struct containing the ID of the swap order to be canceled.
    //  */
    function cancelSwap(
        CancelSwapMsg calldata cancelswap
    )
        external
        payable
        virtual
        nonReentrant // Prevents reentrancy attacks
        onlyExist(cancelswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage order = swapOrder[cancelswap.orderID];

        // Ensure the caller is the maker of the swap order
        if (order.maker != msg.sender) {
            revert UnauthorizedCancelAction();
        }

        // Ensure the caller is the maker of the swap order
        if (order.status != OrderStatus.INITIAL) {
            revert OrderAlreadyCompleted();
        }

        // Update the status of the swap order to 'CANCEL'
        order.status = OrderStatus.CANCEL;
        // Return the funds/tokens to the maker
        if (order.sellToken.token == address(0)) {
            // Refund Ether if the sell token was Ether
            payable(msg.sender).transfer(order.buyToken.amount);
        } else {
            // Refund ERC20 tokens if the sell token was an ERC20 token
            IERC20(order.sellToken.token).transfer(
                msg.sender,
                order.buyToken.amount
            );
        }

        // Emit an event to notify that the swap order has been canceled
        emit AtomicSwapOrderCanceled(cancelswap.orderID);

        // Clean up storage (optimize gas by nullifying order details)
        delete swapOrder[cancelswap.orderID];
    }

    // /**
    //  * @notice Allows a user to place a bid on a specific order.
    //  * @dev This function is designed to be called only on the taker chain.
    //  * @param placeBidMsg A struct containing details of the bid being placed.
    //  */
    function placeBid(
        PlaceBidMsg calldata placeBidMsg
    ) external payable nonReentrant onlyExist(placeBidMsg.orderID) {
        bytes32 _orderID = placeBidMsg.orderID;
        uint256 _bidAmount = placeBidMsg.bidAmount;

        // Ensure the caller is the bidder
        Bid storage _currentBid = bids[_orderID][msg.sender];
        if (_currentBid.bidder != address(0)) {
            revert BidAlreadyPlaced();
        }
        // Update last bidder expire time in order
        AtomicSwapOrder storage _order = swapOrder[placeBidMsg.orderID];

        // Ensure bide amount meet bid requirements.
        if (
            _bidAmount < _order.minBidAmount ||
            _bidAmount > _order.buyToken.amount
        ) {
            revert MismatchedBidAmount(_bidAmount);
        }

        // Calculate the additional token amount being bid
        uint256 tokenAmount = _bidAmount - _currentBid.amount;
        Coin storage _buyToken = swapOrder[_orderID].buyToken;
        // Handle ERC20 token or Ether bids
        if (_buyToken.token != address(0)) {
            // Ensure the bidder has sufficient funds for the bid
            // Transfer the additional bid amount from the bidder to this contract
            _buyToken.token.safeTransferFrom(
                msg.sender,
                address(this),
                tokenAmount
            );
        } else {
            // Ensure the bidder has sent sufficient Ether for the bid
            if (msg.value != tokenAmount) {
                revert MismatchedBidAmount(msg.value);
            }
        }

        // Record the new bid
        bids.addNewBid(placeBidMsg);
    }

    function updateBid(
        UpdateBidMsg calldata updateBidMsg
    )
        external
        payable
        nonReentrant // Ensures the function cannot be re-entered during execution
        onlyExist(updateBidMsg.orderID) // Ensures the order exists
    {
        // Extracting details from the updateBidMsg for easy reference
        bytes32 _orderID = updateBidMsg.orderID;
        uint256 _addition = updateBidMsg.addition;

        // Retrieving the current bid for this order and sender
        Bid storage _currentBid = bids[_orderID][msg.sender];

        // Ensure the function caller has previously placed a bid
        if (_currentBid.bidder == address(0)) {
            revert NoBidPlaced();
        }

        // Retrieve the associated AtomicSwapOrder
        AtomicSwapOrder storage _order = swapOrder[_orderID];

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
    }

    function acceptBid(
        AcceptBidMsg calldata acceptBidMsg
    ) external payable nonReentrant onlyExist(acceptBidMsg.orderID) {
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
        Bid storage selectedBid = bids[_orderID][_bidder];
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

        // Update the bid status to 'Executed'
        selectedBid.status = BidStatus.Executed;

        // Process sell token transfers
        Coin storage _sellToken = _order.sellToken;
        _sellToken.token.processTransfer(
            selectedBid.bidder,
            _sellToken.amount,
            buyerFeeRate,
            maxFee,
            treasury
        );

        // Process buy token transfers
        Coin storage _buyToken = _order.buyToken;
        _buyToken.token.processTransfer(
            _order.maker,
            selectedBid.amount,
            sellerFeeRate,
            maxFee,
            treasury
        );
    }

    function cancelBid(
        bytes32 _orderID
    ) external payable nonReentrant onlyExist(_orderID) {
        // Ensure no unnecessary Ether is sent with the transaction
        require(msg.value == 0, "Unexpected Ether sent");

        // Retrieve the selected bid from storage
        Bid storage selectedBid = bids[_orderID][msg.sender];

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
        Coin storage _buyToken = swapOrder[_orderID].buyToken;

        // If buy token is an ERC20 token, transfer it back to the bidder
        if (_buyToken.token != address(0)) {
            _buyToken.token.safeTransfer(
                selectedBid.bidder,
                selectedBid.amount
            );
        } else {
            // If buy token is Ether, transfer it back to the bidder
            payable(selectedBid.bidder).transfer(selectedBid.amount);
        }
    }

    function counteroffer(CounterOfferMsg calldata counterOfferMsg) external {
        bytes32 _orderID = counterOfferMsg.orderID;
        address _bidder = counterOfferMsg.bidder;

        AtomicSwapOrder storage _order = swapOrder[_orderID];
        if (!_order.acceptBid) {
            revert BidNotAllowed();
        }
        Bid storage _bid = bids[_orderID][_bidder];
        if (_bid.amount == 0) {
            revert NoBidPlaced();
        }

        if (
            counterOfferMsg.amount == 0 ||
            counterOfferMsg.amount > _order.buyToken.amount
        ) {
            revert MismatchedBidAmount(counterOfferMsg.amount);
        }

        counteroffers[_orderID][_bidder] = counterOfferMsg.amount;
    }

    function acceptCountOfffer(
        CounterOfferMsg calldata counterOfferMsg
    ) external {
        bytes32 _orderID = counterOfferMsg.orderID;
        address _bidder = counterOfferMsg.bidder;

        AtomicSwapOrder storage _order = swapOrder[_orderID];
        if (!_order.acceptBid) {
            revert BidNotAllowed();
        }
        Bid storage _bid = bids[_orderID][_bidder];
        if (_bid.amount == 0) {
            revert NoBidPlaced();
        }

        if (
            counterOfferMsg.amount == 0 ||
            counterOfferMsg.amount > _order.buyToken.amount
        ) {
            revert MismatchedBidAmount(counterOfferMsg.amount);
        }

        counteroffers[_orderID][_bidder] = counterOfferMsg.amount;
    }
}
