// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAtomicSwap.sol";
import "hardhat/console.sol";

contract AtomicSwap is
    OwnableUpgradeable,
    IAtomicSwap,
    ReentrancyGuardUpgradeable
{
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;
    address treasury;
    uint public sellerFeeRate;
    uint public buyerFeeRate;
    uint constant maxFee = 1e3;

    // Bid
    // Primary mapping using BidKey (order + bidder)
    mapping(bytes32 => mapping(address => Bid)) public bids;

    uint256 swapOrderCounter;
    uint16 chainID;

    modifier onlyExist(bytes32 id) {
        if (swapOrder[id].id == bytes32(0x0)) {
            revert NonExistPool();
        }
        _;
    }

    function initialize(
        address _admin,
        address _treasury,
        uint _sellerFee,
        uint _buyerFee
    ) external initializer {
        __Ownable_init_unchained();
        transferOwnership(_admin);
        require(_sellerFee < maxFee, "sellerFee has to be smaller than maxFee");
        require(_buyerFee < maxFee, "sellerFee has to be smaller than maxFee");
        require(_treasury != address(0), "invalid treasury address");
        sellerFeeRate = _sellerFee;
        buyerFeeRate = _buyerFee;
        treasury = _treasury;
    }

    /**
     * @notice Creates a new swap order in the contract.
     * @param makeswap Struct containing the details of the swap order to be created.
     */
    function makeSwap(
        MakeSwapMsg calldata makeswap
    ) external payable virtual nonReentrant {
        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.sellToken.token == makeswap.buyToken.token) {
            revert InvalidTokenPair();
        }

        // Ensure the sell token and buy token are not the same non-zero address.
        if (makeswap.minBidCap <= 0) {
            revert InvalidMinBidCap();
        }

        // Ensure the caller is the maker of the swap order.
        if (msg.sender == address(0)) {
            revert InvalidSender();
        }

        // Ensure the expireAt is the future time.
        if (makeswap.expireAt < block.timestamp) {
            revert WrongExpireTime(makeswap.expireAt, block.timestamp);
        }

        // Generate a unique ID and add the new swap order to the contract's state.
        bytes32 id = _generateNewAtomicSwapID(msg.sender);
        _addNewSwapOrder(id, makeswap);

        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            require(msg.value >= makeswap.sellToken.amount, "Not enough ether");
        } else {
            // If selling an ERC20 token, ensure approved and transfer tokens to the contract.
            IERC20 sellToken = IERC20(makeswap.sellToken.token);
            uint256 allowance = sellToken.allowance(msg.sender, address(this));
            if (allowance < makeswap.sellToken.amount) {
                revert NotAllowedAmount(makeswap.sellToken.amount, allowance);
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

        // Emit an event signaling the creation of a new swap order.
        emit AtomicSwapOrderCreated(id);
    }

    /**
     * @notice Allows a taker to complete a swap order by exchanging tokens.
     * @param takeswap A struct containing the ID of the swap order to be taken.
     */
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
        if (order.taker == address(0) || order.taker != msg.sender) {
            revert NoPermissionToTake();
        }

        // Ensure the swap order has not already been completed
        if (order.status == OrderStatus.COMPLETE) {
            revert AlreadyCompleted();
        }

        // Update order details
        order.status = OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;

        // Exchange the tokens
        // If buying with ERC20 tokens
        _processTransfer(
            order.sellToken.token,
            takeswap.takerReceiver,
            order.sellToken.amount,
            sellerFeeRate
        );

        uint buyTokenFee = (order.buyToken.amount * buyerFeeRate) / maxFee;
        uint buyTokenAmountAfterFee = order.buyToken.amount - buyTokenFee;
        // Exchange the tokens
        if (order.buyToken.token == address(0)) {
            // If buying with Ether
            require(
                msg.value >= order.buyToken.amount,
                "Not enough funds to buy"
            );
            payable(order.maker).transfer(buyTokenAmountAfterFee);
            payable(treasury).transfer(buyTokenFee);
        } else {
            // Send token to the taker
            _safeTransferFrom(
                order.buyToken.token,
                msg.sender,
                takeswap.takerReceiver,
                buyTokenAmountAfterFee
            );
            // Send token to the treasury
            _safeTransferFrom(
                order.buyToken.token,
                msg.sender,
                takeswap.takerReceiver,
                buyTokenFee
            );
        }

        // Emit an event signaling the swap was completed
        emit AtomicSwapOrderTook(order.maker, order.taker, takeswap.orderID);
    }

    /**
     * @notice Allows the maker of a swap order to cancel it.
     * @dev The function documentation mentions an upcoming update with EIP 1193 to improve user readability regarding transaction messages.
     * @param cancelswap A struct containing the ID of the swap order to be canceled.
     */
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
            revert NoPermissionToCancel();
        }

        // Ensure the caller is the maker of the swap order
        if (order.status != OrderStatus.INITIAL) {
            revert AlreadyCompleted();
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

    // Generate AtomicOrder ID
    function _generateNewAtomicSwapID(
        address sender
    ) internal returns (bytes32 id) {
        id = keccak256(abi.encode(sender, swapOrderCounter));
        swapOrderCounter++;
    }

    // Refactored functions
    function _addNewSwapOrder(bytes32 id, MakeSwapMsg memory makeswap) private {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert AlreadyExistPool();
        }
        AtomicSwapOrder memory _order = AtomicSwapOrder(
            id,
            OrderStatus.INITIAL,
            msg.sender,
            makeswap.sellToken,
            makeswap.desiredTaker,
            makeswap.buyToken,
            makeswap.minBidCap,
            block.timestamp,
            0,
            0,
            makeswap.expireAt
        );

        swapOrder[id] = _order;
        //swapOrderBuyToken[id] = makeswap.buyToken;
        emit AtomicSwapOrderCreated(id);
    }

    function _removeAtomicSwapOrder(bytes32 id) internal {
        delete (swapOrder[id]);
    }

    /**
     * @notice Allows a user to place a bid on a specific order.
     * @dev This function is designed to be called only on the taker chain.
     * @param placeBidMsg A struct containing details of the bid being placed.
     */
    function placeBid(
        PlaceBidMsg calldata placeBidMsg
    ) external payable nonReentrant onlyExist(placeBidMsg.orderID) {
        // Ensure the caller is the bidder
        require(placeBidMsg.bidder == msg.sender, "Not the bidder");
        // Update last bidder expire time in order
        AtomicSwapOrder storage _order = swapOrder[placeBidMsg.orderID];
        if (_order.expiredAt < placeBidMsg.expireTimestamp) {
            revert InvalidExpireTime(
                _order.expiredAt,
                placeBidMsg.expireTimestamp
            );
        }

        bytes32 _orderID = placeBidMsg.orderID;
        uint256 _bidAmount = placeBidMsg.bidAmount;

        // Retrieve the current bid (if any) for this order by this bidder
        Bid storage _currentBid = bids[_orderID][msg.sender];

        // Ensure the new bid amount is greater than or equal to the current bid amount
        uint _minBidCap = swapOrder[_orderID].minBidCap;
        // Ensure bide amount meet bid requirements.
        if (_bidAmount < _currentBid.amount || _bidAmount < _minBidCap) {
            revert InvalidBidAmount(_bidAmount);
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
            if (msg.value != tokenAmount) {
                revert InvalidBidAmount(msg.value);
            }
        }

        // Record the new bid
        _addNewBid(placeBidMsg);
    }

    /**
     * @notice Allows the maker of an order to accept a specific bid.
     * @param _orderID The ID of the order for which a bid is being accepted.
     * @param _bidder The address of the bidder whose bid is being accepted.
     */
    function acceptBid(
        bytes32 _orderID,
        address _bidder
    ) external payable nonReentrant onlyExist(_orderID) {
        // Ensure no unnecessary Ether is sent with the transaction
        require(msg.value == 0, "Unexpected Ether sent");

        // Ensure the caller is the maker of the order
        if (swapOrder[_orderID].maker != msg.sender) {
            revert NoPermissionToAccept(swapOrder[_orderID].maker, msg.sender);
        }

        // Retrieve the bid from storage
        Bid storage selectedBid = bids[_orderID][_bidder];

        // Ensure the bid is in 'Placed' status
        if (selectedBid.status != BidStatus.Placed) {
            revert NoPlaceStatusOfBid(selectedBid.status);
        }

        // Ensure the bid is expired or not
        if (selectedBid.expireTimestamp < block.timestamp) {
            revert AlreadyExpired(selectedBid.expireTimestamp, block.timestamp);
        }

        // Update the bid status to 'Executed'
        selectedBid.status = BidStatus.Executed;

        // Process sell token transfers
        Coin storage _sellToken = swapOrder[_orderID].sellToken;
        _processTransfer(
            _sellToken.token,
            selectedBid.bidder,
            _sellToken.amount,
            sellerFeeRate
        );

        // Process buy token transfers
        Coin storage _buyToken = swapOrder[_orderID].buyToken;
        _processTransfer(
            _buyToken.token,
            swapOrder[_orderID].maker,
            selectedBid.amount,
            buyerFeeRate
        );
    }

    function _processTransfer(
        address token,
        address recipient,
        uint amount,
        uint feeRate
    ) private {
        uint fee = (amount * feeRate) / maxFee;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            _safeTransfer(token, recipient, amountAfterFee);
            _safeTransfer(token, treasury, fee);
        } else {
            payable(recipient).transfer(amountAfterFee);
            payable(treasury).transfer(fee);
        }
    }

    /**
     * @dev Cancels a bid for a given order ID.
     * The function ensures that the bid exists, is in 'Placed' status, and then cancels it.
     * After cancellation, if the buy token was an ERC20 token, it transfers the tokens back to the bidder.
     * If the buy token was Ether, it transfers the Ether back to the bidder.
     * @param _orderID The ID of the order associated with the bid.
     */
    function cancelBid(
        bytes32 _orderID
    ) external payable nonReentrant onlyExist(_orderID) {
        // Ensure no unnecessary Ether is sent with the transaction
        require(msg.value == 0, "Unexpected Ether sent");

        // Retrieve the selected bid from storage
        Bid storage selectedBid = bids[_orderID][msg.sender];

        // Ensure that msg.sender is same with bidder.
        if (selectedBid.bidder != msg.sender) {
            revert NoPermissionToCancel();
        }

        if (selectedBid.expireTimestamp < block.timestamp) {
            revert NotExpired(selectedBid.expireTimestamp, block.timestamp);
        }

        // Ensure that the bid is in the 'Placed' status
        if (selectedBid.status != BidStatus.Placed) {
            revert NoPlaceStatusOfBid(selectedBid.status);
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

    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        IERC20 _token = IERC20(token);
        uint allowalnce = _token.allowance(msg.sender, address(this));
        if (allowalnce < amount) {
            revert NotAllowedAmount(allowalnce, amount);
        }
        require(
            _token.transferFrom(from, to, amount),
            "Failed to transfer from"
        );
    }

    function _safeTransfer(address token, address to, uint256 amount) internal {
        IERC20 _token = IERC20(token);
        require(_token.transfer(to, amount), "Failed to transfer from");
    }

    function _addNewBid(PlaceBidMsg memory bidMsg) internal {
        // Populate the primary bids mapping
        Bid memory newBid = Bid({
            amount: bidMsg.bidAmount,
            order: bidMsg.orderID,
            status: BidStatus.Placed,
            bidder: bidMsg.bidder,
            receiveTimestamp: block.timestamp,
            expireTimestamp: bidMsg.expireTimestamp
        });
        bids[bidMsg.orderID][bidMsg.bidder] = newBid;
    }
}
