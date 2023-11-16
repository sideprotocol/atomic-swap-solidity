// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../abstracts/AtomicSwapBase.sol";
import "./interfaces/IInterchainAtomicSwap.sol";
import "./interfaces/ISideLzAppUpgradable.sol";
import "hardhat/console.sol";
import "./libs/InterchainAtomicSwapLogic.sol";
import "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";

import "../abstracts/libs/logic/AtomicSwapStateLogic.sol";
import "../abstracts/libs/utils/TokenTransferHelper.sol";

contract InterchainAtomicSwap is AtomicSwapBase, IInterchainAtomicSwap {
    using AtomicSwapStateLogic for *;
    using TokenTransferHelper for *;

    using InterchainAtomicSwapLogic for *;
    using AtomicSwapMsgValidator for *;

    ISideLzAppUpgradable public bridge;
    mapping(bytes32 => ASITCParams) public swapOrderITCParams;
    uint16 chainID;

    function initialize(InitialParams calldata _params) external initializer {
        __Ownable_init_unchained(_params.admin);
        _params._validateInitializeParams(maxFeeRateScale);
        sellerFeeRate = _params.sellerFee;
        buyerFeeRate = _params.buyerFee;
        treasury = _params.treasury;
        chainID = _params.chainID;
        bridge = ISideLzAppUpgradable(_params.bridge);
    }

    // /**
    //  * @notice Creates a new swap order in the contract.
    //  * @param makeswap Struct containing the details of the swap order to be created.
    //  */
    function makeSwap(ICMakeSwapMsg calldata icMakeSwap) public payable nonReentrant returns (bytes32) {
        // Ensure the sell token and buy token are not the same non-zero address.
        MakeSwapMsg memory makeswap = icMakeSwap.base;
        // validate
        makeswap.validateMakeSwapParams();
        // Generate a unique ID and add the new swap order to the contract's state.
        bytes32 id = makeswap.uuid.generateNewAtomicSwapID(address(this));
        //_addNewSwapOrder(id, msg.sender, makeswap);
        swapOrder.addNewSwapOrder(makeswap, id, msg.sender);
        ASITCParams memory _params =
            ASITCParams(Side.NATIVE, icMakeSwap.makerReceiver, address(0), chainID, icMakeSwap.dstChainID);
        swapOrderITCParams[id] = _params;

        uint256 nativeFee = msg.value;
        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            require(msg.value >= makeswap.sellToken.amount, "Not enough ether");
            nativeFee = nativeFee - makeswap.sellToken.amount;
        } else {
            // If selling an ERC20 token, ensure approved and transfer tokens to the contract.
            makeswap.sellToken.token.safeTransferFrom(msg.sender, address(this), makeswap.sellToken.amount);
        }

        // Prepare the payload for the interchain message.
        ICMakeSwapLzMsg memory lzmakeswap = ICMakeSwapLzMsg(
            makeswap.buyToken, icMakeSwap.makerReceiver, icMakeSwap.desiredTaker, makeswap.acceptBid, makeswap.expireAt
        );
        bytes memory payload = abi.encode(0, MsgType.MAKESWAP, id, lzmakeswap);
        // Send the interchain creation message.
        bridge.sendLzMsg{value: nativeFee}(icMakeSwap.dstChainID, payable(msg.sender), payload);

        // Emit an event signaling the creation of a new swap order.
        emit AtomicSwapOrderCreated(id);
        return id;
    }

    /// @notice Creates a new swap order with vesting parameters.
    /// @param makeswap Struct containing details of the swap order.
    /// @param releases Array of vesting release parameters.
    function makeSwapWithVesting(ICMakeSwapMsg calldata makeswap, Release[] calldata releases) external payable {
        releases.validateVestingParams();
        bytes32 orderId = makeSwap(makeswap);
        for (uint256 i = 0; i < releases.length; i++) {
            swapOrderVestingParams[orderId].push(releases[i]);
        }
    }

    // /**
    //  * @notice Allows a taker to complete a swap order by exchanging tokens.
    //  * @param takeswap A struct containing the ID of the swap order to be taken.
    //  */
    function takeSwap(TakeSwapMsg calldata takeswap)
        external
        payable
        virtual
        nonReentrant // Prevents reentrancy attacks
        onlyExist(takeswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage order = swapOrder[takeswap.orderID];
        address makerReceiver = swapOrderITCParams[takeswap.orderID].makerReceiver;

        takeswap.validateTakeSwapParams(swapOrder);
        // Update order details
        order.status = OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;

        uint256 nativeFee = msg.value;
        if (order.buyToken.token == address(0)) {
            if (msg.value <= order.buyToken.amount) {
                revert NotEnoughFund(msg.value, order.buyToken.amount);
            }
            nativeFee = msg.value - order.buyToken.amount;
        }

        // Exchange the tokens
        // If buying with ERC20 tokens
        // Check vesting parameter is exist or not.
        Release[] memory releases = swapOrderVestingParams[order.id];
        if (releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            order.sellToken.token.transferWithFee(
                takeswap.takerReceiver, order.sellToken.amount, buyerFeeRate, maxFeeRateScale, treasury
            );
        } else {
            // Transfer sell token to vesting contract
            if (order.sellToken.token == address(0)) {
                (bool successToRecipient,) = payable(address(vestingManager)).call{value: order.sellToken.amount}("");
                require(successToRecipient, "Transfer failed.");
            } else {
                order.sellToken.token.safeTransfer(address(vestingManager), order.sellToken.amount);
            }
            vestingManager.startVesting(takeswap.takerReceiver, order.sellToken.token, order.sellToken.amount, releases);
        }

        // Prepare the payload for the interchain message
        bytes memory payload = abi.encode(0, MsgType.TAKESWAP, takeswap);
        uint16 dstChainID = swapOrderITCParams[takeswap.orderID].dstChainID;

        // Send the interchain completion message
        bridge.sendLzMsg{value: nativeFee}(dstChainID, payable(msg.sender), payload);
        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(order.maker, order.taker, takeswap.orderID);
    }

    // /**
    //  * @notice Allows the maker of a swap order to cancel it.
    //  * @dev The function documentation mentions an upcoming update with EIP 1193 to improve user readability regarding transaction messages.
    //  * @param cancelswap A struct containing the ID of the swap order to be canceled.
    //  */
    function cancelSwap(CancelSwapMsg calldata cancelswap)
        external
        payable
        virtual
        nonReentrant // Prevents reentrancy attacks
        onlyExist(cancelswap.orderID) // Ensures the swap order exists
    {
        AtomicSwapOrder storage order = swapOrder[cancelswap.orderID];
        order.validateCancelSwap();

        // Update the status of the swap order to 'CANCEL'
        order.status = OrderStatus.CANCEL;
        // Return the funds/tokens to the maker
        if (order.sellToken.token == address(0)) {
            // Refund Ether if the sell token was Ether
            payable(msg.sender).transfer(order.buyToken.amount);
        } else {
            // Refund ERC20 tokens if the sell token was an ERC20 token
            IERC20(order.sellToken.token).transfer(msg.sender, order.buyToken.amount);
        }

        // Prepare the payload for the interchain message
        bytes memory payload = abi.encode(0, MsgType.CANCELSWAP, cancelswap.orderID);

        swapOrder.removeAtomicSwapOrder(cancelswap.orderID);
        // Send the interchain cancellation message
        uint16 dstChainID = swapOrderITCParams[cancelswap.orderID].dstChainID;
        bridge.sendLzMsg{value: msg.value}(dstChainID, payable(msg.sender), payload);

        // Emit an event to notify that the swap order has been canceled
        emit AtomicSwapOrderCanceled(cancelswap.orderID);
    }

    // /**
    //  * @notice Allows a user to place a bid on a specific order.
    //  * @dev This function is designed to be called only on the taker chain.
    //  * @param placeBidMsg A struct containing details of the bid being placed.
    //  */
    function placeBid(PlaceBidMsg calldata placeBidMsg) external payable nonReentrant onlyExist(placeBidMsg.orderID) {
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
        if (_bidAmount < _order.minBidAmount) {
            //|| _bidAmount > _order.buyToken.amount

            revert MismatchedBidAmount(_bidAmount);
        }

        // Calculate the additional token amount being bid
        uint256 tokenAmount = _bidAmount - _currentBid.amount;
        Coin storage _buyToken = swapOrder[_orderID].buyToken;
        uint256 nativeFee = msg.value;
        // Handle ERC20 token or Ether bids
        if (_buyToken.token != address(0)) {
            // Ensure the bidder has sufficient funds for the bid
            // Transfer the additional bid amount from the bidder to this contract
            _buyToken.token.safeTransferFrom(msg.sender, address(this), tokenAmount);
        } else {
            // Ensure the bidder has sent sufficient Ether for the bid
            if (msg.value < tokenAmount) {
                revert MismatchedBidAmount(msg.value);
            }
            nativeFee -= tokenAmount;
        }

        // Record the new bid
        bids.addNewBid(placeBidMsg);

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.PLACEBID, placeBidMsg);
        uint16 dstChainID = swapOrderITCParams[placeBidMsg.orderID].dstChainID;

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: nativeFee}(dstChainID, payable(msg.sender), payload);
    }

    function updateBid(UpdateBidMsg calldata updateBidMsg)
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
        uint256 nativeFee = msg.value;
        // Check if the bid is in ERC20 tokens or in Ether
        if (_buyToken.token != address(0)) {
            // Bidding with ERC20 token
            // Safely transfer the additional bid amount from the bidder to this contract
            _buyToken.token.safeTransferFrom(msg.sender, address(this), _addition);
        } else {
            // Ensure the sent Ether matches the additional bid amount
            if (msg.value < _addition) {
                revert MismatchedBidAmount(msg.value);
            }
            nativeFee -= _addition;
        }

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.UPDATEBID, updateBidMsg);

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: nativeFee}(chainID, payable(msg.sender), payload);

        emit UpdatedBid(updateBidMsg.orderID, _currentBid.bidder, _currentBid.amount);
    }

    function acceptBid(AcceptBidMsg calldata acceptBidMsg)
        external
        payable
        nonReentrant
        onlyExist(acceptBidMsg.orderID)
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
        Bid storage selectedBid = bids[_orderID][_bidder];
        // Ensure the bid is in 'Placed' status
        if (selectedBid.status != BidStatus.Placed) {
            revert BidNotInPlacedStatus(selectedBid.status);
        }

        // Ensure the bid is expired or not
        if (selectedBid.expireTimestamp < block.timestamp) {
            revert BidAlreadyExpired(selectedBid.expireTimestamp, block.timestamp);
        }

        // Update the bid status to 'Executed'
        selectedBid.status = BidStatus.Executed;

        // Process sell token transfers
        Coin storage _sellToken = _order.sellToken;
        _sellToken.token.transferWithFee(
            selectedBid.bidderReceiver, _sellToken.amount, buyerFeeRate, maxFeeRateScale, treasury
        );

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.ACCEPTBID, acceptBidMsg);
        uint16 dstChainID = swapOrderITCParams[_orderID].dstChainID;

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: msg.value}(dstChainID, payable(msg.sender), payload);
        emit AcceptedBid(_orderID, _bidder, selectedBid.amount);
    }

    function cancelBid(bytes32 _orderID) external payable nonReentrant onlyExist(_orderID) {
        // Retrieve the selected bid from storage
        Bid storage selectedBid = bids[_orderID][msg.sender];
        if (selectedBid.bidder == address(0)) {
            revert BidDoesNotExist();
        }
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
            _buyToken.token.safeTransfer(selectedBid.bidder, selectedBid.amount);
        } else {
            // If buy token is Ether, transfer it back to the bidder
            payable(selectedBid.bidder).transfer(selectedBid.amount);
        }

        // Encode the bid message into a payload
        bytes memory payload = abi.encode(0, MsgType.ACCEPTBID, _orderID);
        uint16 dstChainID = swapOrderITCParams[_orderID].dstChainID;

        // Send the interchain message with the necessary payload
        bridge.sendLzMsg{value: msg.value}(dstChainID, payable(msg.sender), payload);
        emit CanceledBid(_orderID, selectedBid.bidder);
    }

    function onReceivePacket(uint16 _srcChainID, bytes memory _srcAddress, uint64 _nonce, bytes calldata _payload)
        public
        payable
        virtual
        override
    {
        MsgType msgType = abi.decode(_payload[:32], (MsgType));
        if (msgType == MsgType.MAKESWAP) {
            bytes32 id = bytes32(_payload[32:64]);
            ICMakeSwapLzMsg memory makeswap = abi.decode(_payload[64:], (ICMakeSwapLzMsg));
            swapOrder[id].id = id;
            swapOrder[id].acceptBid = makeswap.acceptBid;
            swapOrder[id].buyToken = makeswap.buyToken;
            //swapOrder[id].expiredAt = makeswap.expireAt;
            //swapOrder[id].taker = makeswap.desiredTaker;
            swapOrderITCParams[id].makerReceiver = makeswap.makerReceiver;
            swapOrderITCParams[id].dstChainID = _srcChainID;
        } else if (msgType == MsgType.TAKESWAP) {
            TakeSwapMsg memory takeswap = abi.decode(_payload[32:], (TakeSwapMsg));
            swapOrder[takeswap.orderID].status = OrderStatus.COMPLETE;
            // send token
        } else if (msgType == MsgType.CANCELSWAP) {
            bytes32 id = bytes32(_payload[32:]);
            swapOrder.removeAtomicSwapOrder(id);
        } else if (msgType == MsgType.PLACEBID) {
            PlaceBidMsg memory _bidMsg = abi.decode(_payload[32:], (PlaceBidMsg));
            bids.addNewBid(_bidMsg);
        } else if (msgType == MsgType.ACCEPTBID) {
            AcceptBidMsg memory _acceptBidMsg = abi.decode(_payload[32:], (AcceptBidMsg));
            bytes32 _orderID = _acceptBidMsg.orderID;
            address _bidder = _acceptBidMsg.bidder;

            Coin storage _buyToken = swapOrder[_orderID].buyToken;
            address _makerReceiver = swapOrderITCParams[_orderID].makerReceiver;

            _buyToken.token.transferWithFee(_makerReceiver, _buyToken.amount, sellerFeeRate, maxFeeRateScale, treasury);
            bids[_orderID][_bidder].status = BidStatus.Executed;
        } else if (msgType == MsgType.UPDATEBID) {
            UpdateBidMsg memory _updateBidMsg = abi.decode(_payload[32:], (UpdateBidMsg));
            bytes32 _orderID = _updateBidMsg.orderID;
            address _bidder = _updateBidMsg.bidder;
            Bid storage _bid = bids[_orderID][_bidder];
            _bid.amount += _updateBidMsg.addition;
        }
    }

    function bytesToAddress(bytes memory data) public pure returns (address) {
        return address(uint160(bytes20(data)));
    }
}
