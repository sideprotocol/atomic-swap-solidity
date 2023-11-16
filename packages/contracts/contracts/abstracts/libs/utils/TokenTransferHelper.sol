// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../interfaces/IAtomicSwapBase.sol";
import "hardhat/console.sol";

/// @title Token Transfer Helper
/// @notice Library providing functions to safely transfer tokens with support for fee deductions.
/// @dev Used for handling ERC20 token transfers with fee calculations in atomic swap operations.
library TokenTransferHelper {
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
    ) external {
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransfer(token, recipient, amountAfterFee);
            safeTransfer(token, treasury, fee);
        } else {
            _transferEtherWithFee(recipient, treasury, amountAfterFee, fee);
        }
    }

    /// @notice Transfers tokens from one address to another with a fee deducted, sending the fee to the treasury.
    /// @param token The address of the token (ERC20) or zero address for Ether.
    /// @param from The address from which tokens are transferred.
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
    ) external {
        uint256 fee = (amount * feeRate) / maxFeeRateScale;
        uint256 amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransferFrom(token, from, recipient, amountAfterFee);
            safeTransferFrom(token, from, treasury, fee);
        } else {
            _transferEtherWithFee(recipient, treasury, amountAfterFee, fee);
        }
    }

    /// @notice Internal function to handle Ether transfers with fee deduction.
    /// @param recipient The address receiving the Ether.
    /// @param treasury The treasury address receiving the fee.
    /// @param amountAfterFee The net amount of Ether to transfer to the recipient.
    /// @param fee The fee amount to transfer to the treasury.
    /// @dev Transfers Ether to the recipient and treasury, ensuring both transfers succeed.
    function _transferEtherWithFee(address recipient, address treasury, uint256 amountAfterFee, uint256 fee) internal {
        (bool successToRecipient,) = payable(recipient).call{value: amountAfterFee}("");
        require(successToRecipient, "Transfer to recipient failed.");
        (bool successToTreasury,) = payable(treasury).call{value: fee}("");
        require(successToTreasury, "Transfer to treasury failed.");
    }

    /// @notice Safely transfers tokens from one address to another.
    /// @param token The ERC20 token address.
    /// @param from The address from which tokens are transferred.
    /// @param to The address receiving the tokens.
    /// @param amount The amount of tokens to transfer.
    /// @dev Ensures that the transferFrom operation is allowed and succeeds.
    function safeTransferFrom(address token, address from, address to, uint256 amount) internal {
        IERC20 _token = IERC20(token);
        uint256 allowance = _token.allowance(from, address(this));
        if (allowance < amount) {
            revert IAtomicSwapBase.NotAllowedTransferAmount(allowance, amount);
        }
        require(_token.transferFrom(from, to, amount), "TransferFrom failed.");
    }

    /// @notice Safely transfers tokens to a specified address.
    /// @param token The ERC20 token address.
    /// @param to The address receiving the tokens.
    /// @param amount The amount of tokens to transfer.
    /// @dev Ensures that the transfer operation succeeds.
    function safeTransfer(address token, address to, uint256 amount) internal {
        IERC20 _token = IERC20(token);
        require(_token.transfer(to, amount), "Transfer failed.");
    }
}
