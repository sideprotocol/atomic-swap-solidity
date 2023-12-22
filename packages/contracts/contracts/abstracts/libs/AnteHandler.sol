// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {TransferHelperWithVault} from "./TransferHelperWithVault.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IVault} from "../interfaces/IVault.sol";
import {IVesting} from "../../vesting/interfaces/IVesting.sol";
import { IAtomicSwapBase } from "../interfaces/IAtomicSwapBase.sol";
import "hardhat/console.sol";
/// @title Token Transfer Helper
/// @notice Library providing functions to safely transfer tokens with support for fee deductions.
/// @dev Used for handling ERC20 token transfers with fee calculations in atomic swap operations.
library AnteHandler {
    /// @notice Transfers tokens from one address to another with a fee deducted, sending the fee to the treasury.
    /// @param token The address of the token (ERC20) or zero address for Ether.
    /// @param recipient The address receiving the tokens.
    /// @param amount The total amount to transfer before fees.
    /// @param feeRate The fee rate to apply.
    /// @param maxFeeRateScale The scaling factor for the fee rate.
    /// @param treasury The address of the treasury to receive the fee.
    /// @dev Deducts a fee from the amount and transfers the net amount to the recipient and fee to the treasury.
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
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;
        if(isWithdraw) {
            TransferHelperWithVault.safeTransferFrom(vault,token, from, address(this), amountAfterFee);
            IVault(vault).withdraw(token,recipient, amountAfterFee);
        }else{
            TransferHelperWithVault.safeTransferFrom(vault,token, from, recipient, amountAfterFee);
        }
        TransferHelperWithVault.safeTransferFrom(vault,token, from, address(this), fee);
        IVault(vault).withdraw(token,treasury, fee);
    }

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
            _transferWithoutVesting(
                vault, 
                sellToken, 
                seller, 
                buyer, 
                feeParams, 
                isWithdraw
            );
        } else {
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
        (uint256 sellTokenFee, uint256 sellTokenAmountAfterFee) = _calculateSellTokenFee(
            sellToken.amount, 
            feeParams
        );

        TransferHelperWithVault.safeTransferFrom(
            vault,
            sellToken.token,
            seller,
            address(this),
            sellToken.amount
        );

        IVault(vault).withdraw(sellToken.token, feeParams.treasury, sellTokenFee);
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

    function _calculateSellTokenFee(
        uint256 amount,
        IAtomicSwapBase.FeeParams memory feeParams
    ) private pure returns (uint256 fee, uint256 amountAfterFee) {
        fee = (amount * feeParams.buyerFeeRate) / feeParams.maxFeeRateScale;
        amountAfterFee = amount - fee;
        return (fee, amountAfterFee);
    }

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
            IVault(vault).approve(
                sellToken.token,
                address(vestingManager),
                sellTokenAmountAfterFee
            );
            vestingManager.startVesting(
                orderId,
                buyer,
                sellToken.token,
                sellTokenAmountAfterFee,
                releases,
                isWithdraw
            );
        } else {
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

    function _handleWithdrawForVesting(
        bytes32 orderId,
        address vault,
        IAtomicSwapBase.Coin memory sellToken,
        address buyer,
        uint256 sellTokenAmountAfterFee,
        IVesting vestingManager,
        IAtomicSwapBase.Release[] memory releases
    ) private {
        IVault(vault).withdraw(sellToken.token, address(this), sellTokenAmountAfterFee);
        if (sellToken.token == address(0)) {
            vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                orderId,
                buyer,
                sellToken.token,
                sellTokenAmountAfterFee,
                releases,
                true // isWithdraw is true here
            );
        } else {
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
