// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {OwnablePausableUpgradeable} from  "./OwnablePausableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from  "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

import { IAtomicSwapBase } from "./interfaces/IAtomicSwapBase.sol";
import {IVesting} from  "../vesting/interfaces/IVesting.sol";

/// @title AtomicSwapBase
/// @notice Abstract contract for creating atomic swap orders with support for vesting parameters.
/// @dev Inherits from OpenZeppelin's OwnableUpgradeable and ReentrancyGuardUpgradeable.
abstract contract AtomicSwapBase is OwnablePausableUpgradeable, ReentrancyGuardUpgradeable, IAtomicSwapBase {
    /// @notice Stores each atomic swap order by its unique identifier.
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;

    /// @notice Records vesting parameters for each swap order.
    mapping(bytes32 => Release[]) public swapOrderVestingParams;

    /// @notice Contract managing the vesting of tokens.
    IVesting internal vestingManager;
    address internal vault;

    /// @notice Address of the treasury where fees are sent.
    address internal treasury;

    /// @notice Fee rate charged to the seller in a swap transaction.
    uint256 public sellerFeeRate;

    /// @notice Fee rate charged to the buyer in a swap transaction.
    uint256 public buyerFeeRate;

    /// @dev Maximum scale for fee rate calculations.
    uint256 constant internal MAX_FEE_RATE_SCALE = 1e4;
}
