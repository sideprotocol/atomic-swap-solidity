// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAtomicSwapBase.sol";
import "../vesting/interfaces/ICliffVesting.sol";

/// @title AtomicSwapBase
/// @notice Abstract contract for creating atomic swap orders with support for vesting parameters.
/// @dev Inherits from OpenZeppelin's OwnableUpgradeable and ReentrancyGuardUpgradeable.
abstract contract AtomicSwapBase is OwnableUpgradeable, ReentrancyGuardUpgradeable, IAtomicSwapBase {
    /// @notice Stores each atomic swap order by its unique identifier.
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;

    /// @notice Records vesting parameters for each swap order.
    mapping(bytes32 => Release[]) public swapOrderVestingParams;

    /// @notice Stores the bids for each swap order by bidder address.
    mapping(bytes32 => mapping(address => Bid)) public bids;

    /// @notice Contract managing the vesting of tokens.
    ICliffVesting vestingManager;

    /// @notice Address of the treasury where fees are sent.
    address treasury;

    /// @notice Fee rate charged to the seller in a swap transaction.
    uint256 public sellerFeeRate;

    /// @notice Fee rate charged to the buyer in a swap transaction.
    uint256 public buyerFeeRate;

    /// @dev Maximum scale for fee rate calculations.
    uint256 constant maxFeeRateScale = 1e4;

    /// @notice Mapping of counteroffers for each bid.
    /// @dev Primary mapping using BidKey (order + bidder).
    mapping(bytes32 => mapping(address => uint256)) public counteroffers;

    /// @notice Ensures that the order exists before proceeding.
    /// @param id The unique identifier of the order.
    modifier onlyExist(bytes32 id) {
        if (swapOrder[id].id == bytes32(0x0)) {
            revert OrderDoesNotExist();
        }
        _;
    }
}
