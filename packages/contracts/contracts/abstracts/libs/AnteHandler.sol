// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing necessary helper libraries and interfaces for token transfers, ERC20 tokens, vault operations, and atomic swaps.
import {TransferHelperWithVault} from "./TransferHelperWithVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IVault} from "../interfaces/IVault.sol";
import {IVesting} from "../../vesting/interfaces/IVesting.sol";
import { IAtomicSwapBase } from "../interfaces/IAtomicSwapBase.sol";

/// @title Token Transfer Helper
/// @notice Library providing functions to safely transfer tokens with support for fee deductions and vesting schedules.
/// @dev Used for handling ERC20 token transfers, including fee calculation and vesting, in atomic swap operations.
library AnteHandler {

    /// @notice Transfers tokens from a sender to a recipient, deducting a fee that goes to the treasury.
    /// @param vault The address of the vault from where tokens are transferred.
    /// @param token The token address (ERC20) or zero address for Ether.
    /// @param from The address of the sender.
    /// @param recipient The address of the recipient.
    /// @param amount The total amount to be transferred before fee deductions.
    /// @param feeRate The rate at which the fee is calculated.
    /// @param maxFeeRateScale The scaling factor for calculating the fee.
    /// @param treasury The address where the fee is deposited.
    /// @param isWithdraw A boolean indicating if the transfer is a direct withdrawal.
    /// @dev Calculates the fee, performs the transfer of the net amount and fee, and handles withdrawals if specified.
    function transferFromWithFeeAtVault(
        address vault,
        address token,
        address from,
        address recipient,
        uint256 amount,
        uint256 feeRate,
        uint256 maxFeeRateScale,
        address treasury,
        bool isWithdraw
    ) public {
        // Calculate the fee and the amount after fee deduction
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;

        // Transfer the amount after fee deduction to the recipient
        if(isWithdraw) {
            TransferHelperWithVault.safeTransferFrom(vault, token, from, address(this), amountAfterFee);
            IVault(vault).withdraw(token, recipient, amountAfterFee);
        } else {
            TransferHelperWithVault.safeTransferFrom(vault, token, from, recipient, amountAfterFee);
        }

        // Transfer the fee to the treasury
        TransferHelperWithVault.safeTransferFrom(vault, token, from, address(this), fee);
        IVault(vault).withdraw(token, treasury, fee);
    }

    /// @notice Handles the transfer of a sell token to a buyer, potentially with vesting schedules.
    /// @param orderId The unique identifier of the atomic swap order.
    /// @param sellToken The sell token details including token address and amount.
    /// @param releases An array of release conditions for vesting.
    /// @param vault The address of the vault involved in the transfer.
    /// @param vestingManager The address of the vesting manager handling vesting schedules.
    /// @param seller The address of the seller.
    /// @param buyer The address of the buyer.
    /// @param feeParams Parameters for calculating fees.
    /// @param isWithdraw Whether the transfer is a direct withdrawal.
    /// @dev Depending on whether vesting is applied, it calls different internal functions for transfer.
    function transferFromSellTokenToBuyerAtVault(
        bytes32 orderId,
        IAtomicSwapBase.Coin memory sellToken,
        IAtomicSwapBase.Release[] memory releases,
        address vault,
        IVesting vestingManager,
        address seller,
        address buyer,
        IAtomicSwapBase.FeeParams memory feeParams,
        bool isWithdraw
    ) internal {
        if (releases.length == 0) {
            // If there are no vesting releases, transfer without vesting.
            _transferWithoutVesting(
                vault, 
                sellToken, 
                seller, 
                buyer, 
                feeParams, 
                isWithdraw
            );
        } else {
            // If vesting releases exist, process the transfer with vesting schedules.
            _transferWithVesting(
                orderId,
                vault,
                sellToken,
                seller,
                buyer,
                feeParams,
                isWithdraw,
                vestingManager,
                releases
            );
        }
    }

    /// @notice Transfers the sell token to the buyer without any vesting schedules.
    /// @param vault The address of the vault.
    /// @param sellToken The details of the sell token.
    /// @param seller The address of the seller.
    /// @param buyer The address of the buyer.
    /// @param feeParams The parameters for fee calculation.
    /// @param isWithdraw Whether the transfer is a direct withdrawal.
    /// @dev Uses transferFromWithFeeAtVault to handle the actual transfer.
    function _transferWithoutVesting(
        address vault,
        IAtomicSwapBase.Coin memory sellToken,
        address seller,
        address buyer,
        IAtomicSwapBase.FeeParams memory feeParams,
        bool isWithdraw
    ) private {
        transferFromWithFeeAtVault(
            vault,
            sellToken.token,
            seller,
            buyer,
            sellToken.amount,
            feeParams.buyerFeeRate,
            feeParams.maxFeeRateScale,
            feeParams.treasury,
            isWithdraw
        );
    }

    /// @notice Transfers the sell token to the buyer with vesting schedules.
    /// @param orderId The unique identifier of the atomic swap order.
    /// @param vault The address of the vault.
    /// @param sellToken The details of the sell token.
    /// @param seller The address of the seller.
    /// @param buyer The address of the buyer.
    /// @param feeParams The parameters for fee calculation.
    /// @param isWithdraw Whether the transfer is a direct withdrawal.
    /// @param vestingManager The address of the vesting manager.
    /// @param releases The vesting release conditions.
    /// @dev Handles fee calculation, token transfer, and initiates the vesting process.
    function _transferWithVesting(
        bytes32 orderId,
        address vault,
        IAtomicSwapBase.Coin memory sellToken,
        address seller,
        address buyer,
        IAtomicSwapBase.FeeParams memory feeParams,
        bool isWithdraw,
        IVesting vestingManager,
        IAtomicSwapBase.Release[] memory releases
    ) private {
        // Calculate the fee and the net amount after fee deduction.
        (uint256 sellTokenFee, uint256 sellTokenAmountAfterFee) = _calculateSellTokenFee(
            sellToken.amount, 
            feeParams
        );

        // Transfer the total sell token amount to the vault.
        TransferHelperWithVault.safeTransferFrom(
            vault,
            sellToken.token,
            seller,
            address(this),
            sellToken.amount
        );

        // Withdraw the fee to the treasury.
        IVault(vault).withdraw(sellToken.token, feeParams.treasury, sellTokenFee);

        // Handle the vesting of the sell token amount after fee deduction.
        _handleVesting(
            orderId,
            vault,
            sellToken,
            buyer,
            sellTokenAmountAfterFee,
            isWithdraw,
            vestingManager,
            releases
        );
    }

    /// @notice Calculates the fee and the net amount after fee deduction.
    /// @param amount The total amount of tokens.
    /// @param feeParams The parameters for fee calculation.
    /// @return fee The calculated fee amount.
    /// @return amountAfterFee The net amount after fee deduction.
    /// @dev Performs the fee calculation based on the provided parameters.
    function _calculateSellTokenFee(
        uint256 amount,
        IAtomicSwapBase.FeeParams memory feeParams
    ) private pure returns (uint256 fee, uint256 amountAfterFee) {
        fee = (amount * feeParams.buyerFeeRate) / feeParams.maxFeeRateScale;
        amountAfterFee = amount - fee;
        return (fee, amountAfterFee);
    }

    /// @notice Handles the vesting of the sell token after the transfer.
    /// @param orderId The unique identifier of the atomic swap order.
    /// @param vault The address of the vault.
    /// @param sellToken The details of the sell token.
    /// @param buyer The address of the buyer.
    /// @param sellTokenAmountAfterFee The net amount of sell token after fee deduction.
    /// @param isWithdraw Whether the transfer is a direct withdrawal.
    /// @param vestingManager The address of the vesting manager.
    /// @param releases The vesting release conditions.
    /// @dev Initiates the vesting process for the sell token.
    function _handleVesting(
        bytes32 orderId,
        address vault,
        IAtomicSwapBase.Coin memory sellToken,
        address buyer,
        uint256 sellTokenAmountAfterFee,
        bool isWithdraw,
        IVesting vestingManager,
        IAtomicSwapBase.Release[] memory releases
    ) private {
        if (!isWithdraw) {
            // Approve the vesting manager to handle the sell token amount after fee deduction.
            IVault(vault).approve(
                sellToken.token,
                address(vestingManager),
                sellTokenAmountAfterFee
            );
            // Start the vesting process with the provided conditions.
            vestingManager.startVesting(
                orderId,
                buyer,
                sellToken.token,
                sellTokenAmountAfterFee,
                releases,
                isWithdraw
            );
        } else {
            // Handle the withdrawal process for vesting.
            _handleWithdrawForVesting(
                orderId,
                vault,
                sellToken,
                buyer,
                sellTokenAmountAfterFee,
                vestingManager,
                releases
            );
        }
    }

    /// @notice Handles the withdrawal process for the sell token in the vesting scenario.
    /// @param orderId The unique identifier of the atomic swap order.
    /// @param vault The address of the vault.
    /// @param sellToken The details of the sell token.
    /// @param buyer The address of the buyer.
    /// @param sellTokenAmountAfterFee The net amount of sell token after fee deduction.
    /// @param vestingManager The address of the vesting manager.
    /// @param releases The vesting release conditions.
    /// @dev Withdraws the sell token and initiates the vesting process in the case of a withdrawal.
    function _handleWithdrawForVesting(
        bytes32 orderId,
        address vault,
        IAtomicSwapBase.Coin memory sellToken,
        address buyer,
        uint256 sellTokenAmountAfterFee,
        IVesting vestingManager,
        IAtomicSwapBase.Release[] memory releases
    ) private {
        // Withdraw the sell token amount after fee deduction to the contract.
        IVault(vault).withdraw(sellToken.token, address(this), sellTokenAmountAfterFee);

        // Start the vesting process with the withdrawn sell token amount.
        if (sellToken.token == address(0)) {
            // For Ether, use the value transfer method for vesting.
            vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                orderId,
                buyer,
                sellToken.token,
                sellTokenAmountAfterFee,
                releases,
                true // isWithdraw is true here
            );
        } else {
            // For ERC20 tokens, approve and start the vesting process.
            IERC20(sellToken.token).approve(
                address(vestingManager),
                sellTokenAmountAfterFee
            );
            vestingManager.startVesting(
                orderId,
                buyer,
                sellToken.token,
                sellTokenAmountAfterFee,
                releases,
                true // isWithdraw is true here
            );
        }
    }
}
