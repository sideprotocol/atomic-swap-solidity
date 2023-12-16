// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AtomicSwapBase} from "../abstracts/AtomicSwapBase.sol";
import {AtomicSwapMsgValidator} from "../abstracts/libs/utils/AtomicSwapMsgValidator.sol";
import {AtomicSwapStateLogic} from "../abstracts/libs/logic/AtomicSwapStateLogic.sol";
import {IInchainAtomicSwap} from "./interfaces/IInchainAtomicSwap.sol";
import {IVesting} from "../vesting/interfaces/IVesting.sol";
/// @title Inchain Atomic Swap
/// @notice Contract for handling in-chain atomic swaps with vesting capabilities.
/// @dev Extends the AtomicSwapBase and implements the IInchainAtomicSwap interface.
contract InchainAtomicSwap is AtomicSwapBase, IInchainAtomicSwap {
    using AtomicSwapMsgValidator for *;
    using AtomicSwapStateLogic for *;

    /// @notice Initializes the contract with necessary parameters.
    /// @param _admin The admin address for the contract.
    /// @param _vestingManager The address of the vesting manager contract.
    /// @param _treasury The address where fees are collected.
    /// @param _sellerFee The fee rate for the seller in the swap.
    /// @param _buyerFee The fee rate for the buyer in the swap.
    function initialize(
        address _admin,
        address _vault,
        address _vestingManager,
        address _treasury,
        uint256 _sellerFee,
        uint256 _buyerFee
    ) external initializer {
        __OwnablePausableUpgradeable_init(_admin);
        if (_sellerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidSellerFee();
        }
        if (_buyerFee > MAX_FEE_RATE_SCALE) {
            revert InvalidBuyerFee();
        }
        if (_treasury == address(0)) {
            revert InvalidTreasuryAddress();
        }
        sellerFeeRate = _sellerFee;
        buyerFeeRate = _buyerFee;
        treasury = _treasury;
        vault = _vault;
        vestingManager = IVesting(_vestingManager);
    }


    function executeSwapWithPermit(
        SwapWithPermitMsg calldata swap,
        Release[] calldata releases 
    ) external  nonReentrant whenNotPaused {
        if(swap.sellToken.token == swap.buyToken.token) {
            revert UnsupportedTokenPair();
        }
        FeeParams memory params = FeeParams(
            sellerFeeRate,
            buyerFeeRate,
            MAX_FEE_RATE_SCALE,
            treasury
        );
        (bytes32 orderId, address maker, address taker) = swapOrder.executeSwapWithPermit(
            swap,
            releases,
            vault,
            vestingManager,
            params
        );
        emit AtomicSwapOrderCreated(orderId);
        if(swap.acceptBid) {
            emit AcceptedBid(orderId,maker,swap.buyToken.amount);
        }else{
            emit AtomicSwapOrderTook(
                maker,
                taker,
                orderId
            );
        }
    }
}
