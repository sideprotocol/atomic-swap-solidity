// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IAtomicSwapBase} from "../../interfaces/IAtomicSwapBase.sol";
//import {AtomicSwapMsgValidator} from "../utils/AtomicSwapMsgValidator.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
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
    ) external {
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

    function executeSwapWithPermit(
        IAtomicSwapBase.SwapWithPermitMsg calldata swap 
    ) external {
        if(swap.sellToken.token == address(0)) {
            revert();
        }
        if(swap.buyToken.token == address(0)) {
            revert();
        }
        
        (uint256 makerDeadline, uint8 makerV, bytes32 makerR, bytes32 makerS,address maker) = abi.decode(swap.makerPermitSignature, (uint256, uint8, bytes32, bytes32, address));
        if(makerDeadline > block.timestamp) {
            revert();
        }
        (uint256 takerDeadline, uint8 takerV, bytes32 takerR, bytes32 takerS, address taker) = abi.decode(swap.takerPermitSignature, (uint256, uint8, bytes32, bytes32, address));
        if(takerDeadline > block.timestamp) {
            revert();
        }

        // Call permit to approve token transfer
        IERC20Permit(swap.sellToken.token).permit(
            maker,
            address(this),
            swap.sellToken.amount,
            makerDeadline,
            makerV, makerR, makerS
        );

        // (release)

        IERC20Permit(swap.buyToken.token).permit(
            taker,
            address(this),
            swap.buyToken.amount,
            takerDeadline,
            takerV, takerR,takerS
        );
        

        TransferHelper.safeTransferFrom(
            swap.sellToken.token,
            maker,
            taker,
            swap.sellToken.amount
        );

        TransferHelper.safeTransferFrom(
            swap.buyToken.token,
            taker,
            maker,
            swap.buyToken.amount
        );
    }
    
}
