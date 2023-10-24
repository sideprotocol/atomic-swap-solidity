// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Import the atomic swap interface to access its data structures and enums.
import "../interfaces/IAtomicSwapBase.sol";

// Define a library that provides message validation for atomic swaps.
library AtomicSwapMsgValidator {
    // Validates the parameters for making an atomic swap.
    function _validateMakeSwapParams(
        IAtomicSwapBase.MakeSwapMsg memory makeswap
    ) external view {
        // Check if the token being sold is a valid contract address.
        if (
            makeswap.sellToken.token != address(0) && // Ensure it's not the zero address
            !isContract(makeswap.sellToken.token) // Ensure it's a contract address
        ) {
            revert IAtomicSwapBase.InvalidContractAddress(
                makeswap.sellToken.token
            );
        }

        // Ensure the minimum bid amount is a positive value.
        if (makeswap.minBidAmount <= 0) {
            revert IAtomicSwapBase.InvalidMinimumBidLimit();
        }

        // Ensure that the message sender is the one creating the swap.
        if (msg.sender == address(0) || msg.sender != makeswap.maker) {
            revert IAtomicSwapBase.UnauthorizedSender();
        }

        // Ensure the expiration time of the swap is in the future.
        if (makeswap.expireAt < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(
                makeswap.expireAt,
                block.timestamp
            );
        }
    }

    // Validates the parameters for taking an atomic swap.
    function _validateTakeSwapParams(
        IAtomicSwapBase.TakeSwapMsg memory takeswap,
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder // The existing swap orders
    ) external view {
        // Retrieve the swap order details using the orderID from the input.
        IAtomicSwapBase.AtomicSwapOrder storage order = swapOrder[
            takeswap.orderID
        ];

        // Ensure the swap order hasn't been accepted yet.
        if (order.acceptBid) {
            revert IAtomicSwapBase.OrderNotAllowTake();
        }

        // Ensure that the taker is authorized to take the order.
        if (order.taker != address(0) && order.taker != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedTakeAction();
        }

        // Ensure the swap order has not been completed.
        if (order.status == IAtomicSwapBase.OrderStatus.COMPLETE) {
            revert IAtomicSwapBase.OrderAlreadyCompleted();
        }
    }

    // Validates the parameters to cancel a swap.
    function _validateCancelSwap(
        IAtomicSwapBase.AtomicSwapOrder storage order // The order details to validate
    ) external view {
        // Ensure the person trying to cancel the swap is the maker of the order.
        if (order.maker != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedCancelAction();
        }

        // Ensure the swap order is still in the INITIAL state and hasn't been completed or accepted.
        if (order.status != IAtomicSwapBase.OrderStatus.INITIAL) {
            revert IAtomicSwapBase.OrderAlreadyCompleted();
        }
    }

    // Utility function to check if an address is a contract.
    function isContract(address addr) internal view returns (bool) {
        uint size;
        // Use assembly to retrieve the size of the code on target address. Contracts will have code size > 0.
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}
