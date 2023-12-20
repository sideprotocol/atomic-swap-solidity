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
            // Exchange the tokens
            // If buying with ERC20 tokens
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
        } else {
            // Transfer sell token to vesting contract
            uint256 sellTokenFee = (sellToken.amount * feeParams.buyerFeeRate) /
                feeParams.maxFeeRateScale;
            uint256 sellTokenAmountAfterFee = sellToken.amount -
                sellTokenFee;
            // Take Fee.
            // Move fund from vault to contract address for vesting:
            TransferHelperWithVault.safeTransferFrom(
                    vault,
                    sellToken.token,
                    seller,
                    address(this),
                    sellToken.amount
            );
            
            // take fee:
            IVault(vault).withdraw( sellToken.token,feeParams.treasury, sellTokenFee);
            if(!isWithdraw) {
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
            }else{
                if (sellToken.token == address(0)) {
                    // Take Fee.
                    // slither-disable-next-line arbitrary-send-eth
                    vestingManager.startVesting{value: sellTokenAmountAfterFee}(
                        orderId,
                        buyer,
                        sellToken.token,
                        sellTokenAmountAfterFee,
                        releases,
                        false
                    );
                } else {
                    IVault(vault).withdraw(sellToken.token,address(this), sellTokenAmountAfterFee);
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
                        isWithdraw
                    );
                }
            }
        }
    }
}
