// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {TransferHelperWithVault} from "./TransferHelperWithVault.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IVault} from "../../../vault/IVault.sol";
import {IVesting} from "../../../vesting/interfaces/IVesting.sol";
import { IAtomicSwapBase } from "../../interfaces/IAtomicSwapBase.sol";
import "hardhat/console.sol";
/// @title Token Transfer Helper
/// @notice Library providing functions to safely transfer tokens with support for fee deductions.
/// @dev Used for handling ERC20 token transfers with fee calculations in atomic swap operations.
library AnteHandler {
    /// @notice Transfers tokens to a recipient with a fee deducted, sending the fee to the treasury.
    /// @param token The address of the token (ERC20) or zero address for Ether.
    /// @param recipient The address receiving the tokens.
    /// @param amount The total amount to transfer before fees.
    /// @param feeRate The fee rate to apply.
    /// @param maxFeeRateScale The scaling factor for the fee rate.
    /// @param treasury The address of the treasury to receive the fee.
    /// @dev Deducts a fee from the amount and transfers the net amount to the recipient and fee to the treasury.
  
    function transferWithFee(
        address token,
        address recipient,
        uint256 amount,
        uint256 feeRate,
        uint256 maxFeeRateScale,
        address treasury
    ) public {
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;
        TransferHelper.safeTransfer(token, recipient, amountAfterFee);
        TransferHelper.safeTransfer(token, treasury, fee);
    }
    // /// @notice Transfers tokens from one address to another with a fee deducted, sending the fee to the treasury.
    // /// @param token The address of the token (ERC20) or zero address for Ether.
    // /// @param recipient The address receiving the tokens.
    // /// @param amount The total amount to transfer before fees.
    // /// @param feeRate The fee rate to apply.
    // /// @param maxFeeRateScale The scaling factor for the fee rate.
    // /// @param treasury The address of the treasury to receive the fee.
    // /// @dev Deducts a fee from the amount and transfers the net amount to the recipient and fee to the treasury.
    // function transferFromWithFee(
    //     address token,
    //     address from,
    //     address recipient,
    //     uint256 amount,
    //     uint256 feeRate,
    //     uint256 maxFeeRateScale,
    //     address treasury
    // ) public {
    //     uint256 fee = (amount * feeRate) / maxFeeRateScale;
    //     uint256 amountAfterFee = amount - fee;

    //     if (token != address(0)) {
    //         TransferHelper.safeTransferFrom(token, from, recipient, amountAfterFee);
    //         TransferHelper.safeTransferFrom(token, from, treasury, fee);
    //     } else {
    //         if(msg.value != amount) {
    //             revert IAtomicSwapBase.NotEnoughFund(msg.value, amount);
    //         }
    //         TransferHelper.safeTransferETH(recipient,amountAfterFee);
    //         TransferHelper.safeTransferETH(treasury,fee);
    //     }
    // }


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
        address treasury
    ) public {
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;
        TransferHelperWithVault.safeTransferFrom(vault,token, from, recipient, amountAfterFee);
        TransferHelperWithVault.safeTransferFrom(vault,token, from, treasury, fee);
    }

    /// @notice Transfers tokens from one address to another with a fee deducted, sending the fee to the treasury.
    /// @param token The address of the token (ERC20) or zero address for Ether.
    /// @param recipient The address receiving the tokens.
    /// @param amount The total amount to transfer before fees.
    /// @param feeRate The fee rate to apply.
    /// @param maxFeeRateScale The scaling factor for the fee rate.
    /// @param treasury The address of the treasury to receive the fee.
    /// @dev Deducts a fee from the amount and transfers the net amount to the recipient and fee to the treasury.
    function transferFromWithFee(
        address token,
        address from,
        address recipient,
        uint256 amount,
        uint256 feeRate,
        uint256 maxFeeRateScale,
        address treasury
    ) public {
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;

        if (token != address(0)) {
            TransferHelper.safeTransferFrom(token, from, recipient, amountAfterFee);
            TransferHelper.safeTransferFrom(token, from, treasury, fee);
        } else {
            if(msg.value != amount) {
                revert IAtomicSwapBase.NotEnoughFund(msg.value, amount);
            }
            TransferHelper.safeTransferETH(recipient,amountAfterFee);
            TransferHelper.safeTransferETH(treasury,fee);
        }
    }




    /// @notice Transfers the sell token to the buyer with optional vesting
    /// @dev This function handles both immediate transfers and vesting-based transfers of the sell token.
    /// @param order The atomic swap order containing details of the transaction
    /// @param buyer The address of the buyer receiving the sell token
    function transferSellTokenToBuyer(
        IAtomicSwapBase.AtomicSwapOrder storage order,
        IAtomicSwapBase.Release[] memory releases,
        IVesting vestingManager,
        address buyer,
        uint    buyerFeeRate,
        uint    MAX_FEE_RATE_SCALE,
        address treasury
    ) internal {
        
        if (releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            transferWithFee(
                order.sellToken.token,
                buyer,
                order.sellToken.amount,
                buyerFeeRate,
                MAX_FEE_RATE_SCALE,
                treasury
            );
        } else {
            // Transfer sell token to vesting contract
            uint256 sellTokenFee = (order.sellToken.amount * buyerFeeRate) /
                MAX_FEE_RATE_SCALE;
            uint256 sellTokenAmountAfterFee = order.sellToken.amount -
                sellTokenFee;
            if (order.sellToken.token == address(0)) {
                TransferHelper.safeTransferETH(
                    treasury,
                    sellTokenFee
                );
                // Take Fee.
                // slither-disable-next-line arbitrary-send-eth
                vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases,
                    false
                );
            } else {
                // Take Fee.
                TransferHelper.safeTransfer(
                    order.sellToken.token,
                    address(treasury),
                    sellTokenFee
                );
                IERC20(order.sellToken.token).approve(
                    address(vestingManager),
                    sellTokenAmountAfterFee
                );
                vestingManager.startVesting(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases,
                    false
                );
            }
        }
    }

    function transferFromSellTokenToBuyer(
        IAtomicSwapBase.AtomicSwapOrder storage order,
        IAtomicSwapBase.Release[] memory releases,
        IVesting vestingManager,
        address seller,
        address buyer,
        uint    buyerFeeRate,
        uint    MAX_FEE_RATE_SCALE,
        address treasury
    ) internal {
        
        if (releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            transferFromWithFee(
                order.sellToken.token,
                seller,
                buyer,
                order.sellToken.amount,
                buyerFeeRate,
                MAX_FEE_RATE_SCALE,
                treasury
            );
        } else {
            // Transfer sell token to vesting contract
            uint256 sellTokenFee = (order.sellToken.amount * buyerFeeRate) /
                MAX_FEE_RATE_SCALE;
            uint256 sellTokenAmountAfterFee = order.sellToken.amount -
                sellTokenFee;
            if (order.sellToken.token == address(0)) {
                TransferHelper.safeTransferETH(
                    treasury,
                    sellTokenFee
                );
                // Take Fee.
                // slither-disable-next-line arbitrary-send-eth
                vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases,
                    false
                );
            } else {
                // Take Fee.
                TransferHelper.safeTransferFrom(
                    order.sellToken.token,
                    seller,
                    address(treasury),
                    sellTokenFee
                );
                TransferHelper.safeTransferFrom(
                    order.sellToken.token,
                    seller,
                    address(this),
                    sellTokenAmountAfterFee
                );
                IERC20(order.sellToken.token).approve(
                    address(vestingManager),
                    sellTokenAmountAfterFee
                );
                vestingManager.startVesting(
                    order.id,
                    buyer,
                    order.sellToken.token,
                    sellTokenAmountAfterFee,
                    releases,
                    false
                );
            }
        }
    }

    function transferFromSellTokenToBuyerAtVault(
        IAtomicSwapBase.AtomicSwapOrder storage order,
        IAtomicSwapBase.Release[] memory releases,
        address vault,
        IVesting vestingManager,
        address seller,
        address buyer,
        IAtomicSwapBase.FeeParams memory feeParams,
        bool withVault
    ) internal {
        
        if (releases.length == 0) {
            // Exchange the tokens
            // If buying with ERC20 tokens
            transferFromWithFeeAtVault(
                vault,
                order.sellToken.token,
                seller,
                buyer,
                order.sellToken.amount,
                feeParams.buyerFeeRate,
                feeParams.MAX_FEE_RATE_SCALE,
                feeParams.treasury
            );
        } else {
            // Transfer sell token to vesting contract
            uint256 sellTokenFee = (order.sellToken.amount * feeParams.buyerFeeRate) /
                feeParams.MAX_FEE_RATE_SCALE;
            uint256 sellTokenAmountAfterFee = order.sellToken.amount -
                sellTokenFee;
            // Take Fee.
            // Move fund from vault to contract address for vesting:
            TransferHelperWithVault.safeTransferFrom(
                    vault,
                    order.sellToken.token,
                    seller,
                    address(this),
                    order.sellToken.amount
            );
            
            // take fee:
            if(withVault) {
                IVault(vault).approve(
                    order.sellToken.token,
                    address(vestingManager),
                    sellTokenAmountAfterFee
                );
                vestingManager.startVesting(
                        order.id,
                        buyer,
                        order.sellToken.token,
                        sellTokenAmountAfterFee,
                        releases,
                        true
                );
            }else{
                IVault(vault).withdraw(order.sellToken.token,feeParams.treasury, sellTokenFee);
                if (order.sellToken.token == address(0)) {
                    // Take Fee.
                    // slither-disable-next-line arbitrary-send-eth
                    vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                        order.id,
                        buyer,
                        order.sellToken.token,
                        sellTokenAmountAfterFee,
                        releases,
                        false
                    );
                } else {
                    IVault(vault).withdraw(order.sellToken.token,address(this), sellTokenAmountAfterFee);
                    IERC20(order.sellToken.token).approve(
                        address(vestingManager),
                        sellTokenAmountAfterFee
                    );
                    vestingManager.startVesting(
                        order.id,
                        buyer,
                        order.sellToken.token,
                        sellTokenAmountAfterFee,
                        releases,
                        false
                    );
                }
            }
        }
    }
}
