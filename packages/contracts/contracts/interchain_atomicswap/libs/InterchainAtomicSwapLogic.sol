// SPDX-License-Identifier: BUSL-1.1

pragma solidity >=0.8.19;

import "../interfaces/IInterchainAtomicSwap.sol";
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

library InterchainAtomicSwapLogic {
    function _validateInitializeParams(IInterchainAtomicSwap.InitialParams calldata _params, uint256 maxFeeRateScale)
        external
        pure
    {
        require(_params.sellerFee < maxFeeRateScale, "sellerFee has to be smaller than maxFee");
        require(_params.buyerFee < maxFeeRateScale, "sellerFee has to be smaller than maxFee");
        require(_params.treasury != address(0), "invalid treasury address");
    }
}
