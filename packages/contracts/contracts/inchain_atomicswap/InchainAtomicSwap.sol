// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing necessary contract modules for atomic swap functionality
import {AtomicSwapBase} from "../abstracts/AtomicSwapBase.sol";
import {AtomicSwapStateLogic} from "./logic/AtomicSwapStateLogic.sol";
import {IInchainAtomicSwap} from "./interfaces/IInchainAtomicSwap.sol";
import {IVesting} from "../vesting/interfaces/IVesting.sol";

/// @title Inchain Atomic Swap
/// @notice This contract is designed for executing in-chain atomic swaps with an added vesting feature.
/// @dev Inherits from AtomicSwapBase and implements the IInchainAtomicSwap interface for atomic swap functionalities.
contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapStateLogic for *; // Enables state logic operations for atomic swaps.

    /// @notice Initializes the contract with necessary administrative and fee parameters.
    /// @dev Sets up the contract with admin, vault, vesting manager, treasury addresses, and fee rates.
    /// @param _admin The admin address for the contract, responsible for management operations.
    /// @param _vault The address of the vault where assets are held during the swap.
    /// @param _vestingManager The address of the vesting manager contract, handling the vesting process.
    /// @param _treasury The address where fees are collected, must be a valid address.
    /// @param _sellerFee The fee rate for the seller in the swap, should be within the allowed range.
    /// @param _buyerFee The fee rate for the buyer in the swap, should be within the allowed range.
    function initialize(
        address _admin,
        address _vault,
        address _vestingManager,
        address _treasury,
        uint256 _sellerFee,
        uint256 _buyerFee
    ) external initializer {
        __OwnablePausableUpgradeable_init(_admin);
        // Validating fee rates to ensure they are within the permissible range.
        if (_sellerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidSellerFee();
        }
        if (_buyerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidBuyerFee();
        }
        // Ensuring a valid address is provided for the treasury.
        if (_treasury == address(0)) {
            revert InvalidTreasuryAddress();
        }
        // Setting up the contract state with provided parameters.
        sellerFeeRate = _sellerFee;
        buyerFeeRate = _buyerFee;
        treasury = _treasury;
        vault = _vault;
        vestingManager = IVesting(_vestingManager);
    }

    /// @notice Executes an atomic swap with permit, allowing for token transfer authorization.
    /// @dev Handles swap execution logic, including fee calculations and order events.
    /// @param swap The swap details including tokens, amounts, and participant signatures.
    function executeSwapWithPermit(
        SwapWithPermitMsg calldata swap
    ) external nonReentrant whenNotPaused {
        _validateSwapParams(swap);
        // Setting up fee parameters for the swap.
        FeeParams memory params = FeeParams(
            sellerFeeRate,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        // Executing the swap and retrieving order details.
        (bytes32 orderId, address maker, address taker) = swapOrder
            .executeSwapWithPermit(swap, vault, vestingManager, params);
        // Emitting relevant events based on the swap action.
        emit AtomicSwapOrderCreated(orderId);
        if (swap.completeByBid) {
            emit AcceptedBid(orderId, taker, swap.buyToken.amount);
        } else {
            emit AtomicSwapOrderTook(orderId, maker, taker);
        }
    }

    /// @dev Validates the parameters of a swap to ensure they adhere to the contract's logic and constraints.
    /// @param swap The swap details to be validated.
    function _validateSwapParams(
        SwapWithPermitMsg calldata swap
    ) internal pure {
        // Ensuring the swap does not involve the same token for both selling and buying.
        if (swap.sellToken.token == swap.buyToken.token) {
            revert UnsupportedTokenPair();
        }
        // Checking for distinct signers for the seller and buyer to prevent fraudulent swaps.
        if (swap.sellerSignature.owner == swap.buyerSignature.owner) {
            revert InvalidSigners();
        }
        // Ensuring the minimum bid amount is not greater than the sell token amount.
        if (swap.minBidAmount > swap.sellToken.amount) {
            revert InvalidMinBidAmount(swap.minBidAmount);
        }
    }

    // Fallback function to handle direct Ether transfers to the contract.
    receive() external payable {}
}
