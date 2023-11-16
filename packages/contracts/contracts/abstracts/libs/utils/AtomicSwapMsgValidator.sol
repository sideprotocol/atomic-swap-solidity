// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../../interfaces/IAtomicSwapBase.sol";

/// @title Atomic Swap Message Validator
/// @notice Library providing validation functions for various atomic swap messages.
/// @dev Used for ensuring the correctness and integrity of data in atomic swap operations.
library AtomicSwapMsgValidator {
    /// @notice Validates parameters for creating an atomic swap.
    /// @param makeswap The structure containing swap details.
    /// @dev Checks for valid contract address, positive minimum bid, authorized sender, and future expiration time.
    function validateMakeSwapParams(IAtomicSwapBase.MakeSwapMsg memory makeswap) external view {
        if (makeswap.sellToken.token != address(0) && !isContract(makeswap.sellToken.token)) {
            revert IAtomicSwapBase.InvalidContractAddress(makeswap.sellToken.token);
        }

        if (makeswap.minBidAmount <= 0) {
            revert IAtomicSwapBase.InvalidMinimumBidLimit();
        }

        if (msg.sender == address(0) || msg.sender != makeswap.maker) {
            revert IAtomicSwapBase.UnauthorizedSender();
        }

        if (makeswap.expireAt < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(makeswap.expireAt, block.timestamp);
        }
    }

    /// @notice Validates parameters for taking an atomic swap.
    /// @param takeswap The take swap message details.
    /// @param swapOrder Mapping of current atomic swap orders.
    /// @dev Checks if the order is not already accepted or completed, and if the taker is authorized.
    function validateTakeSwapParams(
        IAtomicSwapBase.TakeSwapMsg memory takeswap,
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder
    ) external view {
        IAtomicSwapBase.AtomicSwapOrder storage order = swapOrder[takeswap.orderID];

        if (order.acceptBid) {
            revert IAtomicSwapBase.OrderNotAllowTake();
        }

        if (order.taker != address(0) && order.taker != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedTakeAction();
        }

        if (order.status == IAtomicSwapBase.OrderStatus.COMPLETE) {
            revert IAtomicSwapBase.OrderAlreadyCompleted();
        }
    }

    /// @notice Validates the cancellation of a swap.
    /// @param order The atomic swap order to validate for cancellation.
    /// @dev Ensures that the order is in the initial state and the sender is authorized to cancel.
    function validateCancelSwap(IAtomicSwapBase.AtomicSwapOrder storage order) external view {
        if (order.maker != msg.sender) {
            revert IAtomicSwapBase.UnauthorizedCancelAction();
        }

        if (order.status != IAtomicSwapBase.OrderStatus.INITIAL) {
            revert IAtomicSwapBase.OrderAlreadyCompleted();
        }
    }

    /// @notice Validates vesting parameters for an atomic swap.
    /// @param releases Array of release schedules for the vesting.
    /// @dev Ensures the total percentage of releases equals 100% and the number of releases is within limits.
    function validateVestingParams(IAtomicSwapBase.Release[] memory releases) external pure {
        if (releases.length == 0) {
            revert IAtomicSwapBase.ZeroReleaseSchedule();
        }

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < releases.length; i++) {
            totalPercentage += releases[i].percentage;
        }

        if (totalPercentage != 10000) {
            revert IAtomicSwapBase.InvalidTotalPercentage();
        }

        if (releases.length > 150) {
            revert IAtomicSwapBase.OverMaximumReleaseStep();
        }
    }

    /// @notice Checks if an address is a contract.
    /// @param addr The address to check.
    /// @return True if the address is a contract, false otherwise.
    /// @dev Uses assembly to check the size of the code at the address.
    function isContract(address addr) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}
