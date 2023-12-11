// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IAtomicSwapBase} from "../../abstracts/interfaces/IAtomicSwapBase.sol";

interface IInchainAtomicSwap is IAtomicSwapBase {
    function makeSwap(MakeSwapMsg calldata makeswap) external payable  returns (bytes32);
    function makeSwapWithVesting(MakeSwapMsg calldata makeswap, Release[] calldata releases) external payable returns (bytes32);
    function takeSwap(TakeSwapMsg calldata takeswap) external payable;
    function cancelSwap(CancelSwapMsg calldata cancelswap) external payable;
    function placeBid(PlaceBidMsg calldata placeBidMsg) external payable;
    function updateBid(UpdateBidMsg calldata updateBidMsg) external payable;
    function acceptBid(AcceptBidMsg calldata acceptBidMsg) external payable;
}
