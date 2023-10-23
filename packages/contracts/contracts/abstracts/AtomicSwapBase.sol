// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAtomicSwapBase.sol";

abstract contract AtomicSwapBase is
    OwnableUpgradeable,
    IAtomicSwapBase,
    ReentrancyGuardUpgradeable
{
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;
    mapping(bytes32 => mapping(address => Bid)) public bids;

    address treasury;
    uint public sellerFeeRate;
    uint public buyerFeeRate;
    uint constant maxFee = 1e3;
    uint public swapOrderCounter;

    // Bid
    // Primary mapping using BidKey (order + bidder)
    mapping(bytes32 => mapping(address => uint)) public counteroffers;

    modifier onlyExist(bytes32 id) {
        if (swapOrder[id].id == bytes32(0x0)) {
            revert OrderDoesNotExist();
        }
        _;
    }

    // /**
    //  * @notice Creates a new swap order in the contract.
    //  * @param makeswap Struct containing the details of the swap order to be created.
    //  */

    // function makeSwap(MakeSwapMsg calldata makeswap) external payable virtual;

    // /**
    //  * @notice Allows a taker to complete a swap order by exchanging tokens.
    //  * @param takeswap A struct containing the ID of the swap order to be taken.
    //  */
    // function takeSwap(TakeSwapMsg calldata takeswap) external payable virtual;

    // /**
    //  * @notice Allows the maker of a swap order to cancel it.
    //  * @dev The function documentation mentions an upcoming update with EIP 1193 to improve user readability regarding transaction messages.
    //  * @param cancelswap A struct containing the ID of the swap order to be canceled.
    //  */
    // function cancelSwap(
    //     CancelSwapMsg calldata cancelswap
    // ) external payable virtual;

    // /**
    //  * @notice Allows a user to place a bid on a specific order.
    //  * @dev This function is designed to be called only on the taker chain.
    //  * @param placeBidMsg A struct containing details of the bid being placed.
    //  */

    // function placeBid(
    //     PlaceBidMsg calldata placeBidMsg
    // ) external payable virtual;

    // /**
    //  * @dev Allows an existing bidder to increase their bid amount.
    //  * @param updateBidMsg The message containing orderID and the amount to be added to the existing bid.
    //  */

    // function updateBid(
    //     UpdateBidMsg calldata updateBidMsg
    // ) external payable virtual;

    // /**
    //  * @notice Allows the maker of an order to accept a specific bid.
    //  * @param acceptBidMsg.orderID The ID of the order for which a bid is being accepted.
    //  * @param acceptBidMsg.bidder The address of the bidder whose bid is being accepted.
    //  */

    // function acceptBid(
    //     AcceptBidMsg calldata acceptBidMsg
    // ) external payable virtual;

    // /**
    //  * @dev Cancels a bid for a given order ID.
    //  * The function ensures that the bid exists, is in 'Placed' status, and then cancels it.
    //  * After cancellation, if the buy token was an ERC20 token, it transfers the tokens back to the bidder.
    //  * If the buy token was Ether, it transfers the Ether back to the bidder.
    //  * @param _orderID The ID of the order associated with the bid.
    //  */

    // function cancelBid(bytes32 _orderID) external payable virtual;

    // Helpers

    function _addNewSwapOrder(
        bytes32 id,
        address sender,
        MakeSwapMsg memory makeswap
    ) internal {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert OrderAlreadyExists();
        }
        AtomicSwapOrder memory _order = AtomicSwapOrder(
            id,
            OrderStatus.INITIAL,
            sender,
            makeswap.sellToken,
            makeswap.desiredTaker,
            makeswap.buyToken,
            makeswap.minBidAmount,
            block.timestamp,
            0,
            0,
            makeswap.expireAt,
            makeswap.acceptBid
        );

        swapOrder[id] = _order;
        emit AtomicSwapOrderCreated(id);
    }

    function _addNewSwapInterchainParams(
        bytes32 id,
        MakeSwapMsg memory makeswap
    ) internal {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert OrderAlreadyExists();
        }
        AtomicSwapOrder memory _order = AtomicSwapOrder(
            id,
            OrderStatus.INITIAL,
            msg.sender,
            makeswap.sellToken,
            makeswap.desiredTaker,
            makeswap.buyToken,
            makeswap.minBidAmount,
            block.timestamp,
            0,
            0,
            makeswap.expireAt,
            makeswap.acceptBid
        );

        swapOrder[id] = _order;
        //swapOrderBuyToken[id] = makeswap.buyToken;
        emit AtomicSwapOrderCreated(id);
    }

    function _removeAtomicSwapOrder(bytes32 id) internal virtual {
        delete (swapOrder[id]);
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

    function _processTransfer(
        address token,
        address recipient,
        uint amount,
        uint feeRate
    ) internal {
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

    function _processTransferFrom(
        address token,
        address from,
        address recipient,
        uint amount,
        uint feeRate
    ) internal {
        uint fee = (amount * feeRate) / maxFee;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            _safeTransferFrom(token, from, recipient, amountAfterFee);
            _safeTransferFrom(token, from, treasury, fee);
        } else {
            payable(recipient).transfer(amountAfterFee);
            payable(treasury).transfer(fee);
        }
    }

    function _generateNewAtomicSwapID(
        address sender
    ) internal returns (bytes32 id) {
        id = keccak256(abi.encode(sender, swapOrderCounter));
        swapOrderCounter++;
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
            revert NotAllowedTransferAmount(allowalnce, amount);
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

    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}
