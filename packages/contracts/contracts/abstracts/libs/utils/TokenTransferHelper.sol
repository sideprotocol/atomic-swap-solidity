// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../interfaces/IAtomicSwapBase.sol";
import "hardhat/console.sol";

library TokenTransferHelper {
    function transferWithFee(
        address token,
        address recipient,
        uint amount,
        uint feeRate,
        uint maxFeeRateScale,
        address treasury
    ) external {
        uint fee = (amount * feeRate) / maxFeeRateScale;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransfer(token, recipient, amountAfterFee);
            safeTransfer(token, treasury, fee);
        } else {
            _transferEtherWithFee(recipient, treasury, amountAfterFee, fee);
        }
    }

    function transferFromWithFee(
        address token,
        address from,
        address recipient,
        uint amount,
        uint feeRate,
        uint maxFeeRateScale,
        address treasury
    ) external {
        uint fee = (amount * feeRate) / maxFeeRateScale;
        uint amountAfterFee = amount - fee;

        if (token != address(0)) {
            safeTransferFrom(token, from, recipient, amountAfterFee);
            safeTransferFrom(token, from, treasury, fee);
        } else {
            _transferEtherWithFee(recipient, treasury, amountAfterFee, fee);
        }
    }

    function _transferEtherWithFee(
        address recipient,
        address treasury,
        uint amountAfterFee,
        uint fee
    ) internal {
        (bool successToRecipient, ) = payable(recipient).call{
            value: amountAfterFee
        }("");
        require(successToRecipient, "Transfer to recipient failed.");
        (bool successToTreasury, ) = payable(treasury).call{value: fee}("");
        require(successToTreasury, "Transfer to treasury failed.");
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        IERC20 _token = IERC20(token);
        uint256 allowance = _token.allowance(from, address(this));
        if (allowance < amount) {
            revert IAtomicSwapBase.NotAllowedTransferAmount(allowance, amount);
        }
        require(_token.transferFrom(from, to, amount), "TransferFrom failed.");
    }

    function safeTransfer(address token, address to, uint256 amount) internal {
        IERC20 _token = IERC20(token);
        require(_token.transfer(to, amount), "Transfer failed.");
    }
}
