// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IAtomicSwapBase} from "../../interfaces/IAtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../utils/AtomicSwapMsgValidator.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IVesting} from "../../../vesting/interfaces/IVesting.sol";
import {AnteHandler} from "../utils/AnteHandler.sol";
/// @title Atomic Swap State Logic
/// @notice Library providing state management functions for atomic swap orders and bids.
/// @dev Used by atomic swap contracts to manipulate order and bid states.
library AtomicSwapStateLogic {
    /// @notice Adds a new swap order to the mapping.
    /// @param swapOrder The mapping of swap orders.
    /// @param makeswap The details of the swap to be added.
    /// @param id The unique identifier for the new swap order.
    /// @param sender The address of the user who is creating the swap order.
    /// @dev Reverts if an order with the same ID already exists.
    function addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.MakeSwapMsg memory makeswap,
        bytes32 id,
        address sender
    ) public {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }

        IAtomicSwapBase.AtomicSwapOrder memory order = IAtomicSwapBase.AtomicSwapOrder(
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
        swapOrder[id] = order;
    }
    /// @notice Adds a new bid to a swap order.
    /// @param bids The mapping of bids for swap orders.
    /// @param bidMsg The details of the bid to be added.
    /// @dev Adds a bid with the status set to 'Placed'.
    function addNewBid(
        mapping(bytes32 => mapping(address => IAtomicSwapBase.Bid)) storage bids,
        IAtomicSwapBase.PlaceBidMsg memory bidMsg
    ) public {
        IAtomicSwapBase.Bid memory newBid = IAtomicSwapBase.Bid({
            amount: bidMsg.bidAmount,
            order: bidMsg.orderID,
            status: IAtomicSwapBase.BidStatus.Placed,
            bidder: bidMsg.bidder,
            receiveTimestamp: block.timestamp,
            expireTimestamp: bidMsg.expireTimestamp
        });
        bids[bidMsg.orderID][bidMsg.bidder] = newBid;
    }

    
    /// @notice Generates a new unique identifier for an atomic swap.
    /// @param uuid A unique value used to generate the ID.
    /// @param contractAddress The address of the contract using the ID.
    /// @return id The generated unique identifier.
    /// @dev Uses keccak256 hashing to generate a unique ID.
    function generateNewAtomicSwapID(bytes32 uuid, address contractAddress) public pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }


    function makeSwap(
        mapping (bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.MakeSwapMsg calldata makeswap
    ) public returns (bytes32) {
        //AtomicSwapMsgValidator.validateMakeSwapParams(makeswap);
        // Generate a unique ID and add the new swap order to the contract's state.   
        // UUID should be unique, In current logic anyone can spam orders with uuid and code
        // will fail when we send some uuid from frontend
        bytes32 id = generateNewAtomicSwapID(makeswap.uuid,address(this));
        addNewSwapOrder(swapOrder,makeswap, id, msg.sender);
        
        if (makeswap.sellToken.token == address(0)) {
            // If selling Ether, ensure sufficient Ether was sent with the transaction.
            if (msg.value < makeswap.sellToken.amount) {
                revert IAtomicSwapBase.NotEnoughFund(msg.value, makeswap.sellToken.amount);
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
        return id;
    }

      /// @notice Allows a user to complete a swap order.
    /// @param takeswap Struct containing the ID of the swap order to be taken.
    function takeSwap(
        IAtomicSwapBase.AtomicSwapOrder storage order,
        IAtomicSwapBase.TakeSwapMsg calldata takeswap,
        IAtomicSwapBase.Release[] memory releases,
        IVesting vestingManager,
        uint    sellerFeeRate,
        uint    buyerFeeRate,
        uint    MAX_FEE_RATE_SCALE,
        address treasury
    )
        external
    {

        //order.validateTakeSwap(takeswap);
        AtomicSwapMsgValidator.validateTakeSwap(order,takeswap);
        // Update order details
        order.status = IAtomicSwapBase.OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;
        order.taker = msg.sender;

        AnteHandler.transferSellTokenToBuyer(
            order,
            releases, 
            vestingManager,
            takeswap.takerReceiver,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );

        AnteHandler.transferFromWithFee(
            order.buyToken.token,
            order.maker,
            order.buyToken.amount,
            sellerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
    }

    function cancelSwap(
        IAtomicSwapBase.AtomicSwapOrder storage order
    )
        external {
        AtomicSwapMsgValidator.validateCancelSwap(order);
        // Update the status of the swap order to 'CANCEL'
        order.status = IAtomicSwapBase.OrderStatus.CANCEL;
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
    }

    function placeBid(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder ) storage swapOrder,
        mapping( bytes32 => mapping( address => IAtomicSwapBase.Bid ) ) storage bids,
        IAtomicSwapBase.PlaceBidMsg calldata placeBidMsg
        
    ) external {
        bytes32 orderID = placeBidMsg.orderID;
        
        uint256 bidAmount = placeBidMsg.bidAmount;
        // Ensure the caller is the bidder
        if (placeBidMsg.bidder != msg.sender) {
            revert IAtomicSwapBase.InvalidBidderAddress();
        }

        IAtomicSwapBase.Bid storage currentBid = bids[orderID][msg.sender];
        if (currentBid.bidder != address(0)) {
            revert IAtomicSwapBase.BidAlreadyPlaced();
        }

        IAtomicSwapBase.AtomicSwapOrder storage order = swapOrder[orderID];
        // Update last bidder expire time in order
        if(!order.acceptBid) {
            revert IAtomicSwapBase.BidNotAllowed();
        }
        if (order.expiredAt < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(order.expiredAt, block.timestamp);
        }
        // Ensure bid amount meet bid requirements.
        if (
            bidAmount < order.minBidAmount ||
            bidAmount > order.buyToken.amount
        ) {
            revert IAtomicSwapBase.MismatchedBidAmount(bidAmount);
        }

        // Calculate the additional token amount being bid
        IAtomicSwapBase.Coin storage buyToken = order.buyToken;
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
                revert IAtomicSwapBase.MismatchedBidAmount(msg.value);
            }
        }
        addNewBid(bids, placeBidMsg);
    }


    function updateBid(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder ) storage swapOrder,
        mapping( bytes32 => mapping( address => IAtomicSwapBase.Bid ) ) storage bids,
        IAtomicSwapBase.UpdateBidMsg calldata updateBidMsg
    )
        external returns (address, uint) {
// Extracting details from the updateBidMsg for easy reference
        bytes32 orderID = updateBidMsg.orderID;
        uint256 addition = updateBidMsg.addition;
        // Retrieving the current bid for this order and sender
        IAtomicSwapBase.Bid storage currentBid = bids[orderID][msg.sender];
        if(currentBid.expireTimestamp < block.timestamp) {
            revert IAtomicSwapBase.BidAlreadyExpired(currentBid.expireTimestamp,block.timestamp);
        }
        // Ensure the function caller has previously placed a bid
         // It doesn't happen in normal senarios
        if (currentBid.bidder == address(0)) {
            revert IAtomicSwapBase.NoBidPlaced();
        }

        // Retrieve the associated AtomicSwapOrder
        IAtomicSwapBase.AtomicSwapOrder storage order = swapOrder[orderID];

        // It doesn't happen in normal senarios 
        if (currentBid.status != IAtomicSwapBase.BidStatus.Placed) {
            revert IAtomicSwapBase.NoBidPlaced();
        }

        // Ensure the additional bid amount is non-zero
        if (addition == 0) {
            revert IAtomicSwapBase.MismatchedBidAmount(addition);
        }

        // Update the bid amount
        currentBid.amount += addition;
        if (currentBid.amount > order.buyToken.amount) {
            revert IAtomicSwapBase.MismatchedBidAmount(currentBid.amount);
        }

        // Retrieving details of the buy token for this order
        IAtomicSwapBase.Coin storage buyToken = order.buyToken;

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
                revert IAtomicSwapBase.MismatchedBidAmount(msg.value);
            }
        }
        return (currentBid.bidder, currentBid.amount);
    }


     /// @notice Allows the maker to accept a bid on their swap order.
    /// @param acceptBidMsg Struct containing details of the bid to accept.
    function acceptBid(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder ) storage swapOrder,
        mapping( bytes32 => mapping( address => IAtomicSwapBase.Bid ) ) storage bids,
        mapping(bytes32 => IAtomicSwapBase.Release[]) storage swapOrderVestingParams, 
        IAtomicSwapBase.AcceptBidMsg calldata acceptBidMsg,
        
        IVesting vestingManager,
        uint sellerFeeRate,
        uint buyerFeeRate,    
        uint MAX_FEE_RATE_SCALE,
        address treasury
    )
        external returns(address, uint)
    {
        // Ensure no unnecessary Ether is sent with the transaction
        bytes32 orderID = acceptBidMsg.orderID;
        address bidder = acceptBidMsg.bidder;
        if (msg.sender == address(0)) {
            revert IAtomicSwapBase.UnauthorizedSender();
        }
        IAtomicSwapBase.AtomicSwapOrder storage order = swapOrder[orderID];
        if (!order.acceptBid) {
            revert IAtomicSwapBase.BidNotAllowed();
        }
        // Ensure the caller is the maker of the order
        if (order.maker != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedAcceptAction(order.maker, msg.sender);
        }

        // Retrieve the bid from storage
        IAtomicSwapBase.Bid storage selectedBid = bids[orderID][bidder];
        // Ensure the bid is in 'Placed' status
        if (selectedBid.status != IAtomicSwapBase.BidStatus.Placed) {
            revert IAtomicSwapBase.BidNotInPlacedStatus(selectedBid.status);
        }

        // Ensure the bid is expired or not
        if (selectedBid.expireTimestamp < block.timestamp) {
            revert IAtomicSwapBase.BidAlreadyExpired(
                selectedBid.expireTimestamp,
                block.timestamp
            );
        }

        // update the order status to 'COMPLETE'
        order.status = IAtomicSwapBase.OrderStatus.COMPLETE;
        order.completedAt = block.timestamp;
        order.taker = bidder;

        // Update the bid status to 'Executed'
        selectedBid.status = IAtomicSwapBase.BidStatus.Executed;

        AnteHandler.transferSellTokenToBuyer(
            order,
            swapOrderVestingParams[order.id], 
            vestingManager,
            selectedBid.bidder,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        // Process buy token transfers
        IAtomicSwapBase.Coin storage buyToken = order.buyToken;
        AnteHandler.transferWithFee(
            buyToken.token,
            order.maker,
            selectedBid.amount,
            sellerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        return (selectedBid.bidder, selectedBid.amount);
    }

       /// @notice Allows a bidder to cancel their bid on a swap order.
    /// @param orderID The unique identifier of the swap order.
    function cancelBid(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder ) storage swapOrder,
        mapping( bytes32 => mapping( address => IAtomicSwapBase.Bid ) ) storage bids,
        bytes32 orderID
    ) external returns (address)  {
        // Retrieve the selected bid from storage
        IAtomicSwapBase.Bid storage selectedBid = bids[orderID][msg.sender];

        // Ensure that msg.sender is same with bidder.
        if (selectedBid.bidder != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedCancelAction();
        }

        // Ensure that the bid is in the 'Placed' status
        if (selectedBid.status != IAtomicSwapBase.BidStatus.Placed) {
            revert IAtomicSwapBase.BidNotInPlacedStatus(selectedBid.status);
        }
        // Update the bid status to 'Cancelled'
        selectedBid.status = IAtomicSwapBase.BidStatus.Cancelled;

        // Retrieve the buy tokens details from storage
        IAtomicSwapBase.Coin storage buyToken = swapOrder[orderID].buyToken;

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
        return selectedBid.bidder;
    }

    function executeSwapWithPermit(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder
    ) storage swapOrder,
        IAtomicSwapBase.SwapWithPermitMsg calldata swap,
        IAtomicSwapBase.Release[] calldata releases,  
        IVesting vestingManager, 
        IAtomicSwapBase.FeeParams memory feeParams
        // uint    sellerFeeRate,
        // uint    buyerFeeRate,
        // uint    MAX_FEE_RATE_SCALE,
        // address treasury
    ) external returns (bytes32 id, address, address) {
        id = generateNewAtomicSwapID(swap.uuid, address(this));
        if(swapOrder[id].maker != address(0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }
        if(swap.sellToken.token == address(0) || swap.buyToken.token == address(0)) {
            revert IAtomicSwapBase.UnsupportedTokenPair();
        }
        
        IAtomicSwapBase.PermitSignature memory makerSignature = parseSignature(
            swap.makerPermitSignature
        );
        if(makerSignature.deadline > block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(makerSignature.deadline, block.timestamp);
        }

        IAtomicSwapBase.PermitSignature memory takerSignature = parseSignature(
            swap.takerPermitSignature
        );
        if(takerSignature.deadline > block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(takerSignature.deadline, block.timestamp);
        }

        // Call permit to approve token transfer
        IERC20Permit(swap.sellToken.token).permit(
            makerSignature.sender,
            address(this),
            swap.sellToken.amount,
            makerSignature.deadline,
            makerSignature.v, makerSignature.r, makerSignature.s
        );

        // // (release)
        IERC20Permit(swap.buyToken.token).permit(
            takerSignature.sender,
            address(this),
            swap.sellToken.amount,
            takerSignature.deadline,
            takerSignature.v, takerSignature.r, takerSignature.s
        );

        AnteHandler.transferFromWithFee(
            swap.buyToken.token,
            makerSignature.sender,
            swap.buyToken.amount,
            feeParams.sellerFeeRate,
            feeParams.MAX_FEE_RATE_SCALE,
            feeParams.treasury
        );

        IAtomicSwapBase.AtomicSwapOrder memory order = IAtomicSwapBase.AtomicSwapOrder(
            id,
            IAtomicSwapBase.OrderStatus.INITIAL,
            makerSignature.sender,
            swap.sellToken,
            swap.desiredTaker,
            swap.buyToken,
            swap.minBidAmount,
            block.timestamp,
            0,
            0,
            makerSignature.deadline,
            swap.acceptBid
        );
        swapOrder[id] = order;

        AnteHandler.transferSellTokenToBuyer(
            swapOrder[id],
            releases,
            vestingManager,
            takerSignature.sender,
            feeParams.buyerFeeRate,
            feeParams.MAX_FEE_RATE_SCALE,
            feeParams.treasury
        );
        return (id, makerSignature.sender, takerSignature.sender);
    }
    


    function parseSignature(bytes memory signature) private pure returns (IAtomicSwapBase.PermitSignature memory permitSignature) {
        (uint256 deadline, uint8 v, bytes32 r, bytes32 s, address sender) = abi.decode(signature, (uint256, uint8, bytes32, bytes32, address));
        permitSignature = IAtomicSwapBase.PermitSignature(
            deadline,
            v,
            r,
            s,
            sender
        );
    }
}
