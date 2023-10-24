// SPDX-License-Identifier: BUSL-1.1

pragma solidity >=0.8.19;
import "../interfaces/IInterchainAtomicSwap.sol";
import "../../abstracts/interfaces/IAtomicSwapBase.sol";

library InterchainAtomicSwapLogic {
    function _validateInitializeParams(
        IInterchainAtomicSwap.InitialParams calldata _params,
        uint maxFee
    ) external pure {
        require(
            _params.sellerFee < maxFee,
            "sellerFee has to be smaller than maxFee"
        );
        require(
            _params.buyerFee < maxFee,
            "sellerFee has to be smaller than maxFee"
        );
        require(_params.treasury != address(0), "invalid treasury address");
    }
}
