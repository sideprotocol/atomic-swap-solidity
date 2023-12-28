// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IAtomicSwapBase} from "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface IInchainAtomicSwap is IAtomicSwapBase {
    function executeSwapWithPermit(
        SwapWithPermitMsg calldata swap,
        Release[] calldata releases 
    ) external;
}
