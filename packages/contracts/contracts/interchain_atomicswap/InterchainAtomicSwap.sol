// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../abstracts/AtomicSwapBase.sol";
import "./interfaces/IInterchainAtomicSwap.sol";
import "./interfaces/ISideLzAppUpgradable.sol";
import "hardhat/console.sol";

contract InterchainAtomicSwap is AtomicSwapBase, IInterchainAtomicSwap {
    ISideLzAppUpgradable public bridge;
    mapping(bytes32 => ASITCParams) public swapOrderITCParams;
    uint16 chainID;

    function initialize(InitialParams calldata _params) external initializer {
        __Ownable_init_unchained(_params.admin);
        require(
            _params.sellerFee < maxFee,
            "sellerFee has to be smaller than maxFee"
        );
        require(
            _params.buyerFee < maxFee,
            "sellerFee has to be smaller than maxFee"
        );
        require(_params.treasury != address(0), "invalid treasury address");
        sellerFeeRate = _params.sellerFee;
        buyerFeeRate = _params.buyerFee;
        treasury = _params.treasury;
        chainID = _params.chainID;
        bridge = ISideLzAppUpgradable(_params.bridge);
    }

    function makeSwap(
        ICMakeSwapMsg calldata icMakeSwap
    ) external payable nonReentrant {
        // Ensure the sell token and buy token are not the same non-zero address.
        MakeSwapMsg memory makeswap = icMakeSwap.base;

        // makeswap token is validate. that's just contract address or not.
        if (
            makeswap.sellToken.token != address(0) &&
            !isContract(makeswap.sellToken.token)
        ) {
            revert InvalidContractAddress(makeswap.sellToken.token);
        }

        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.minBidAmount <= 0) {
            revert InvalidMinimumBidLimit();
        }

        // Ensure the caller is the maker of the swap order.
        if (msg.sender == address(0) || msg.sender != makeswap.maker) {
            revert UnauthorizedSender();
        }

        // Ensure the expireAt is the future time.
        if (makeswap.expireAt < block.timestamp) {
            revert InvalidExpirationTime(makeswap.expireAt, block.timestamp);
        }

        // Generate a unique ID and add the new swap order to the contract's state.
        bytes32 id = _generateNewAtomicSwapID(msg.sender);
        _addNewSwapOrder(id, msg.sender, makeswap);
        ASITCParams memory _params = ASITCParams(
            Side.NATIVE,
            icMakeSwap.makerReceiver,
            address(0),
            chainID,
            icMakeSwap.dstChainID
        );

        swapOrderITCParams[id] = _params;

        uint nativeFee = msg.value;
        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            require(msg.value >= makeswap.sellToken.amount, "Not enough ether");
            nativeFee = nativeFee - makeswap.sellToken.amount;
        } else {
            // If selling an ERC20 token, ensure approved and transfer tokens to the contract.
            IERC20 sellToken = IERC20(makeswap.sellToken.token);
            uint256 allowance = sellToken.allowance(msg.sender, address(this));
            if (allowance < makeswap.sellToken.amount) {
                revert NotAllowedTransferAmount(
                    makeswap.sellToken.amount,
                    allowance
                );
            }

            require(
                sellToken.transferFrom(
                    msg.sender,
                    address(this),
                    makeswap.sellToken.amount
                ),
                "Failed in Lock token"
            );
        }

        // Prepare the payload for the interchain message.
        ICMakeSwapLzMsg memory lzmakeswap = ICMakeSwapLzMsg(
            makeswap.buyToken,
            icMakeSwap.makerReceiver,
            icMakeSwap.desiredTaker,
            makeswap.acceptBid,
            makeswap.expireAt
        );
        bytes memory payload = abi.encode(0, MsgType.MAKESWAP, id, lzmakeswap);
        // Send the interchain creation message.
        bridge.sendLzMsg{value: nativeFee}(
            chainID,
            payable(msg.sender),
            payload
        );

        // Emit an event signaling the creation of a new swap order.
        emit AtomicSwapOrderCreated(id);
    }

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
        address makerReceiver = swapOrderITCParams[takeswap.orderID]
            .makerReceiver;
        // Ensure the caller is the designated taker of the swap order
        //console.log("acceptBID:", order)
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

        uint nativeFee = msg.value;
        if (order.buyToken.token == address(0)) {
            if (msg.value <= order.buyToken.amount) {
                revert NotEnoughFund(msg.value, order.buyToken.amount);
            }
            nativeFee = msg.value - order.buyToken.amount;
        }

        // Exchange the tokens
        // If buying with ERC20 tokens
        _processTransferFrom(
            order.buyToken.token,
            msg.sender,
            makerReceiver,
            order.buyToken.amount,
            sellerFeeRate
        );

        // Prepare the payload for the interchain message
        bytes memory payload = abi.encode(0, MsgType.TAKESWAP, takeswap);

        // Send the interchain completion message
        bridge.sendLzMsg{value: nativeFee}(
            chainID,
            payable(msg.sender),
            payload
        );
        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(order.maker, order.taker, takeswap.orderID);
    }

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

        // Prepare the payload for the interchain message
        bytes memory payload = abi.encode(
            0,
            MsgType.CANCELSWAP,
            cancelswap.orderID
        );

        // Send the interchain cancellation message
        bridge.sendLzMsg{value: msg.value}(
            chainID,
            payable(msg.sender),
            payload
        );

        // Emit an event to notify that the swap order has been canceled
        emit AtomicSwapOrderCanceled(cancelswap.orderID);
    }

    // Generate AtomicOrder ID

    // Refactored functions
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
            _bidAmount < _order.minBidAmount
            //|| _bidAmount > _order.buyToken.amount
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
            _safeTransferFrom(
                _buyToken.token,
                msg.sender,
                address(this),
                tokenAmount
            );
        } else {
            // Ensure the bidder has sent sufficient Ether for the bid
            if (msg.value < tokenAmount) {
                revert MismatchedBidAmount(msg.value);
            }
        }

        // Record the new bid
        _addNewBid(placeBidMsg);

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.PLACEBID, placeBidMsg);

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: msg.value - tokenAmount}(
            chainID,
            payable(msg.sender),
            payload
        );
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
            _safeTransferFrom(
                _buyToken.token,
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

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.UPDATEBID, updateBidMsg);

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: msg.value}(
            chainID,
            payable(msg.sender),
            payload
        );

        emit UpdatedBid(
            updateBidMsg.orderID,
            _currentBid.bidder,
            _currentBid.amount
        );
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
        _processTransfer(
            _sellToken.token,
            selectedBid.bidder,
            _sellToken.amount,
            buyerFeeRate
        );

        // Process buy token transfers
        Coin storage _buyToken = _order.buyToken;
        _processTransfer(
            _buyToken.token,
            _order.maker,
            selectedBid.amount,
            sellerFeeRate
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
            _safeTransfer(
                _buyToken.token,
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

    function onReceivePacket(
        uint16 _srcChainID,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes calldata _payload
    ) public payable virtual override {
        MsgType msgType = abi.decode(_payload[:32], (MsgType));
        if (msgType == MsgType.MAKESWAP) {
            bytes32 id = bytes32(_payload[32:64]);
            ICMakeSwapLzMsg memory makeswap = abi.decode(
                _payload[64:],
                (ICMakeSwapLzMsg)
            );

            swapOrder[id].id = id;
            swapOrder[id].acceptBid = makeswap.acceptBid;
            swapOrder[id].buyToken = makeswap.buyToken;
            //swapOrder[id].expiredAt = makeswap.expireAt;
            swapOrder[id].taker = makeswap.desiredTaker;
            swapOrderITCParams[id].makerReceiver = makeswap.makerReceiver;
        } else if (msgType == MsgType.TAKESWAP) {
            TakeSwapMsg memory takeswap = abi.decode(
                _payload[32:],
                (TakeSwapMsg)
            );
            swapOrder[takeswap.orderID].status = OrderStatus.COMPLETE;
            // send token
        } else if (msgType == MsgType.CANCELSWAP) {
            bytes32 id = bytes32(_payload[32:]);
            _removeAtomicSwapOrder(id);
        } else if (msgType == MsgType.PLACEBID) {
            PlaceBidMsg memory _bidMsg = abi.decode(
                _payload[32:],
                (PlaceBidMsg)
            );
            _addNewBid(_bidMsg);
        }
        // } else if (msgType == MsgType.ACCEPTBID) {
        //     AcceptBidMsg memory _acceptBidMsg = abi.decode(
        //         _payload[32:],
        //         (AcceptBidMsg)
        //     );
        //     bytes32 _orderID = _acceptBidMsg.orderID;
        //     address _bidder = _acceptBidMsg.bidder;

        //     Bid storage _bid = bids[_orderID][_bidder];
        //     Coin storage _buyToken = swapOrder[_orderID].buyToken;
        //     address _makerReceiver = swapOrder[_orderID].maker;
        //     if (_buyToken.token != address(0)) {
        //         _safeTransfer(_buyToken.token, _makerReceiver, _bid.amount);
        //     } else {
        //         payable(_makerReceiver).transfer(_bid.amount);
        //     }
        //     bids[_orderID][_bidder].status = BidStatus.Executed;
        // } else if (msgType == MsgType.CANCELBID) {
        //     AcceptBidMsg memory _acceptBidMsg = abi.decode(
        //         _payload[32:],
        //         (AcceptBidMsg)
        //     );
        //     bytes32 _orderID = _acceptBidMsg.orderID;
        //     address _bidder = _acceptBidMsg.bidder;

        //     Bid storage _bid = bids[_orderID][_bidder];
        //     Coin storage _buyToken = swapOrder[_orderID].buyToken;
        //     address _makerReceiver = swapOrder[_orderID].maker;
        //     if (_buyToken.token != address(0)) {
        //         _safeTransfer(_buyToken.token, _makerReceiver, _bid.amount);
        //     } else {
        //         payable(_makerReceiver).transfer(_bid.amount);
        //     }
        //     bids[_orderID][_bidder].status = BidStatus.Executed;
        // } else if (msgType == MsgType.UPDATEBID) {
        //     AcceptBidMsg memory _acceptBidMsg = abi.decode(
        //         _payload[32:],
        //         (AcceptBidMsg)
        //     );
        //     bytes32 _orderID = _acceptBidMsg.orderID;
        //     address _bidder = _acceptBidMsg.bidder;

        //     Bid storage _bid = bids[_orderID][_bidder];
        //     Coin storage _buyToken = swapOrder[_orderID].buyToken;
        //     address _makerReceiver = swapOrder[_orderID].maker;
        //     if (_buyToken.token != address(0)) {
        //         _safeTransfer(_buyToken.token, _makerReceiver, _bid.amount);
        //     } else {
        //         payable(_makerReceiver).transfer(_bid.amount);
        //     }
        //     bids[_orderID][_bidder].status = BidStatus.Executed;
        // }
    }

    function onAcknowledgePacket(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes calldata _payload
    ) external override {}

    function bytesToAddress(bytes memory data) public pure returns (address) {
        return address(uint160(bytes20(data)));
    }
}
