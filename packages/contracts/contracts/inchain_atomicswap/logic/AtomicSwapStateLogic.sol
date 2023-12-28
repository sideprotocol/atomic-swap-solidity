// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing interfaces and libraries necessary for the atomic swap functionality.
import {IAtomicSwapBase} from "../../abstracts/interfaces/IAtomicSwapBase.sol";
import {IVaultPermit} from "../../vault/interfaces/IVaultPermit.sol";
import {IVesting} from "../../vesting/interfaces/IVesting.sol";
import {AnteHandler} from "../../abstracts/libs/AnteHandler.sol";

/// @title Atomic Swap State Logic
/// @notice This library provides the core functionalities for managing the state of atomic swap orders and bids.
/// @dev Used by atomic swap contracts to create, execute, and manage orders and bids in a decentralized manner.
library AtomicSwapStateLogic {

    /// @notice Generates a new unique identifier for an atomic swap order.
    /// @param uuid A unique value used to generate the ID, ensuring uniqueness.
    /// @param contractAddress The address of the contract using the ID, adding an extra layer of uniqueness.
    /// @return id The generated unique identifier for the swap order.
    /// @dev Utilizes the keccak256 hashing function to create a unique ID from the input parameters.
    function generateNewAtomicSwapID(bytes32 uuid, address contractAddress) public pure returns (bytes32 id) {
        id = keccak256(abi.encode(contractAddress, uuid));
    }

    /// @notice Executes a swap with the given parameters and permits, setting up the atomic swap.
    /// @param swapOrder The storage mapping of current swap orders.
    /// @param swap Details of the swap including the tokens, amounts, and participant signatures.
    /// @param releases An array of release conditions for the swap, dictating how and when funds are released.
    /// @param vault The address of the vault where tokens are held during the swap.
    /// @param vestingManager The address of the vesting manager, handling any vesting requirements.
    /// @param feeParams Fee parameters including rates for both sellers and buyers.
    /// @return id The unique identifier of the newly created swap order.
    /// @dev Validates and processes the swap, handles permits, and updates the state with a new order.
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
        // Ensuring that the swap order does not already exist.
        if(swapOrder[id].maker != address(0)) {
            revert IAtomicSwapBase.OrderAlreadyExists();
        }

        // Validating the expiration time of the seller's signature.
        if(swap.sellerSignature.deadline < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(swap.sellerSignature.deadline, block.timestamp);
        }

        // Validating the expiration time of the buyer's signature.
        if(swap.buyerSignature.deadline < block.timestamp) {
            revert IAtomicSwapBase.InvalidExpirationTime(swap.buyerSignature.deadline, block.timestamp);
        }

        // Handling the permit and transfer of tokens as part of the swap execution.
        _permitAndTransfer(id,vault,vestingManager, swap,releases,feeParams);
        // Adding the new swap order to the mapping of current orders.
        _addNewSwapOrder(
            swapOrder,
            swap,
            id
        );
        return (id, swap.sellerSignature.owner, swap.buyerSignature.owner);
    }

    /// @notice Internal function to handle permits and transfer tokens as part of the atomic swap.
    /// @param orderId The unique identifier of the swap order.
    /// @param vault The address of the vault where tokens are held.
    /// @param vestingManager The vesting manager address for handling any vesting requirements.
    /// @param swap Details of the swap including the tokens and amounts.
    /// @param releases Release conditions for the swap.
    /// @param feeParams Fee parameters for the transaction.
    /// @dev Processes token transfers with fees, utilizing permits for secure token movements.
    function _permitAndTransfer(
        bytes32 orderId,
        address vault,
        IVesting vestingManager, 
        IAtomicSwapBase.SwapWithPermitMsg calldata swap,
        IAtomicSwapBase.Release[] calldata releases,
        IAtomicSwapBase.FeeParams memory feeParams
    ) internal {
        // Generating agreements based on the swap details for both seller and buyer.
        (bytes32 sellerAgreement, bytes32 buyerAgreement) = _generateAgreement(swap);

        // Utilizing the permit function of the vault contract to authorize token transfers.
        IVaultPermit(vault).permit(
            swap.sellToken.token,
            address(this),
            swap.sellToken.amount,
            sellerAgreement,
            swap.sellerSignature
        );

        IVaultPermit(vault).permit(
            swap.buyToken.token,
            address(this),
            swap.buyToken.amount,
            buyerAgreement,
            swap.buyerSignature
        );

        // Handling the transfer of the buy token to the seller, including fee deductions.
        AnteHandler.transferFromWithFeeAtVault(
            address(vault),
            swap.buyToken.token,
            swap.buyerSignature.owner,
            swap.sellerSignature.owner,
            swap.buyToken.amount,
            feeParams.sellerFeeRate,
            feeParams.maxFeeRateScale,
            feeParams.treasury,
            swap.withdrawToSellerAccount
        );

        // Transferring the sell token to the buyer, considering vesting and other swap conditions.
        AnteHandler.transferFromSellTokenToBuyerAtVault(
            orderId,
            swap.sellToken,
            releases,
            address(vault),
            vestingManager,
            swap.sellerSignature.owner,
            swap.buyerSignature.owner,
            feeParams,
            swap.withdrawToBuyerAccount
        );
    }

    /// @notice Adds a new atomic swap order to the mapping of current orders.
    /// @param swapOrder The mapping of existing atomic swap orders.
    /// @param swap The details of the swap order being added.
    /// @param id The unique identifier for the new swap order.
    /// @dev Ensures the atomic swap order is correctly set up and stored in the mapping.
    function _addNewSwapOrder(
        mapping(bytes32 => IAtomicSwapBase.AtomicSwapOrder) storage swapOrder,
        IAtomicSwapBase.SwapWithPermitMsg memory swap,
        bytes32 id
    ) internal {
        IAtomicSwapBase.AtomicSwapOrder memory order = IAtomicSwapBase.AtomicSwapOrder(
            id,
            IAtomicSwapBase.OrderStatus.INITIAL,
            swap.sellerSignature.owner,
            swap.sellToken,
            swap.desiredTaker,
            swap.buyToken,
            swap.minBidAmount,
            block.timestamp,
            0,
            0,
            swap.sellerSignature.deadline,
            swap.acceptBid
        );
        // Storing the new order in the swap orders mapping.
        swapOrder[id] = order;
    }

    /// @notice Generates agreement hashes for the seller and buyer based on the swap details.
    /// @param swap Details of the swap including tokens, participants, and terms.
    /// @return sellerAgreement The hash representing the seller's agreement to the swap terms.
    /// @return buyerAgreement The hash representing the buyer's agreement to the swap terms.
    /// @dev These hashes are used for secure verification of the swap terms agreed upon by both parties.
    function _generateAgreement(
        IAtomicSwapBase.SwapWithPermitMsg calldata swap
    ) internal pure returns  (bytes32 sellerAgreement, bytes32 buyerAgreement) {
        sellerAgreement = keccak256(
            abi.encode(
                swap.sellerSignature.owner,
                swap.uuid,
                swap.sellToken,
                swap.buyToken, 
                swap.desiredTaker,
                swap.minBidAmount,
                swap.acceptBid,
                swap.withdrawToSellerAccount
            )
        );

        buyerAgreement = keccak256(
            abi.encode(
                swap.buyerSignature.owner,
                swap.uuid,
                swap.sellToken,
                swap.buyToken, 
                swap.desiredTaker,
                swap.minBidAmount,
                swap.acceptBid,
                swap.withdrawToSellerAccount
            )
        );
    }
}
