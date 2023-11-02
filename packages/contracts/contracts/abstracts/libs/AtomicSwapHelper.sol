// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../interfaces/IAtomicSwapBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

library AtomicSwapHelper {
    function addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.MakeSwapMsg memory makeswap,
        bytes32 id,
        address sender
    ) external {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }
        IAtomicSwapBase.AtomicSwapOrder memory _order = IAtomicSwapBase
            .AtomicSwapOrder(
                id,
                IAtomicSwapBase.OrderStatus.INITIAL,
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
        //emit IAtomicSwapBase.AtomicSwapOrderCreated(id);
    }

    function removeAtomicSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        bytes32 id
    ) external {
        delete (swapOrder[id]);
    }

    function addNewBid(
        mapping(bytes32 => mapping(address => IAtomicSwapBase.Bid))
            storage bids,
        IAtomicSwapBase.PlaceBidMsg memory bidMsg
    ) external {
        // Populate the primary bids mapping
        IAtomicSwapBase.Bid memory newBid = IAtomicSwapBase.Bid({
            amount: bidMsg.bidAmount,
            order: bidMsg.orderID,
            status: IAtomicSwapBase.BidStatus.Placed,
            bidder: bidMsg.bidder,
            bidderReceiver: bidMsg.bidderReceiver,
            receiveTimestamp: block.timestamp,
            expireTimestamp: bidMsg.expireTimestamp
        });
        bids[bidMsg.orderID][bidMsg.bidder] = newBid;
    }

    function processTransfer(
        address token,
        address recipient,
        uint amount,
        uint feeRate,
        uint maxFee,
        address treasury
    ) external {
        uint fee = (amount * feeRate) / maxFee;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransfer(token, recipient, amountAfterFee);
            safeTransfer(token, treasury, fee);
        } else {
            payable(recipient).transfer(amountAfterFee);
            payable(treasury).transfer(fee);
        }
    }

    function processTransferFrom(
        address token,
        address from,
        address recipient,
        uint amount,
        uint feeRate,
        uint maxFee,
        address treasury
    ) external {
        uint fee = (amount * feeRate) / maxFee;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransferFrom(token, from, recipient, amountAfterFee);
            safeTransferFrom(token, from, treasury, fee);
        } else {
            payable(recipient).transfer(amountAfterFee);
            payable(treasury).transfer(fee);
        }
    }

    function generateNewAtomicSwapID(
        bytes32 uuid,
        address contractAddress
    ) external pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        IERC20 _token = IERC20(token);
        uint allowalnce = _token.allowance(from, address(this));
        if (allowalnce < amount) {
            revert IAtomicSwapBase.NotAllowedTransferAmount(allowalnce, amount);
        }
        require(
            _token.transferFrom(from, to, amount),
            "Failed to transfer from"
        );
    }

    function safeTransfer(address token, address to, uint256 amount) internal {
        IERC20 _token = IERC20(token);
        require(_token.transfer(to, amount), "Failed to transfer from");
    }
}
