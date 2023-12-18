// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IAtomicSwapBase} from "../../interfaces/IAtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../utils/AtomicSwapMsgValidator.sol";
import {IVaultPermit} from "../../interfaces/IVaultPermit.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IVesting} from "../../../vesting/interfaces/IVesting.sol";
import {AnteHandler} from "../utils/AnteHandler.sol";
import {IVaultPermit} from "../../interfaces/IVaultPermit.sol";
/// @title Atomic Swap State Logic
/// @notice Library providing state management functions for atomic swap orders and bids.
/// @dev Used by atomic swap contracts to manipulate order and bid states.
library AtomicSwapStateLogic {
    /// @notice Generates a new unique identifier for an atomic swap.
    /// @param uuid A unique value used to generate the ID.
    /// @param contractAddress The address of the contract using the ID.
    /// @return id The generated unique identifier.
    /// @dev Uses keccak256 hashing to generate a unique ID.
    function generateNewAtomicSwapID(bytes32 uuid, address contractAddress) public pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }

    function executeSwapWithPermit(
        mapping( bytes32 => IAtomicSwapBase.AtomicSwapOrder
    ) storage swapOrder,
        IAtomicSwapBase.SwapWithPermitMsg calldata swap,
        IAtomicSwapBase.Release[] calldata releases,  
        address vault,
        IVesting vestingManager, 
        IAtomicSwapBase.FeeParams memory feeParams
    ) external returns (bytes32 id, address, address) {

        id = generateNewAtomicSwapID(swap.uuid, address(this));
        if(swapOrder[id].maker != address(0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }

        if(swap.sellToken.token == address(0) || swap.buyToken.token == address(0)) {
            revert IAtomicSwapBase.UnsupportedTokenPair();
        }
        if(swap.makerSignature.deadline < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(swap.makerSignature.deadline, block.timestamp);
        }

        if(swap.takerSignature.deadline < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(swap.takerSignature.deadline, block.timestamp);
        }

        _permitAndTransfer(id,vault,vestingManager, swap,releases,feeParams);
        _addNewSwapOrder(
            swapOrder,
            swap,
            id
        );
        return (id, swap.makerSignature.owner, swap.takerSignature.owner);
    }

    function _permitAndTransfer(
        bytes32 orderId,
        address vault,
        IVesting vestingManager, 
        IAtomicSwapBase.SwapWithPermitMsg calldata swap,
        IAtomicSwapBase.Release[] calldata releases,
        IAtomicSwapBase.FeeParams memory feeParams
    ) internal {
        //
        bytes32 agreement = _generateAgreement(swap);
        // Call permit to approve token transfer
        IVaultPermit(vault).permit(
            swap.sellToken.token,
            address(this),
            swap.sellToken.amount,
            agreement,
            swap.makerSignature
        );

        // (release)
        IVaultPermit(vault).permit(
            swap.buyToken.token,
            address(this),
            swap.buyToken.amount,
            agreement,
            swap.takerSignature
        );

        AnteHandler.transferFromWithFeeAtVault(
            address(vault),
            swap.buyToken.token,
            swap.takerSignature.owner,
            swap.makerSignature.owner,
            swap.buyToken.amount,
            feeParams.sellerFeeRate,
            feeParams.maxFeeRateScale,
            feeParams.treasury
        );

        AnteHandler.transferFromSellTokenToBuyerAtVault(
            orderId,
            swap.sellToken,
            releases,
            address(vault),
            vestingManager,
            swap.makerSignature.owner,
            swap.takerSignature.owner,
            feeParams,
            true
        );
    }

    /// @notice Adds a new swap order to the mapping.
    /// @param swapOrder The mapping of swap orders.
    /// @param swap The details of the swap to be added.
    /// @param id The unique identifier for the new swap order.
    /// @dev Reverts if an order with the same ID already exists.
    function _addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.SwapWithPermitMsg memory swap,
        bytes32 id
    ) internal {
        if (swapOrder[id].id != bytes32(0x0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }

        IAtomicSwapBase.AtomicSwapOrder memory order = IAtomicSwapBase.AtomicSwapOrder(
            id,
            IAtomicSwapBase.OrderStatus.INITIAL,
            swap.makerSignature.owner,
            swap.sellToken,
            swap.desiredTaker,
            swap.buyToken,
            swap.minBidAmount,
            block.timestamp,
            0,
            0,
            swap.makerSignature.deadline,
            swap.acceptBid
        );
        swapOrder[id] = order;
    }

    function _generateAgreement(
        IAtomicSwapBase.SwapWithPermitMsg calldata swap
    ) internal pure returns  (bytes32 agreement) {
        agreement = keccak256(
            abi.encode(
                swap.uuid,
                swap.sellToken,
                swap.buyToken, 
                swap.desiredTaker,
                swap.minBidAmount,
                swap.acceptBid
            )
        );
    }
}
