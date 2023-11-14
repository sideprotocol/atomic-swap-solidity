// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAtomicSwapBase.sol";
import "../vesting/interfaces/ICliffVesting.sol";

abstract contract AtomicSwapBase is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    IAtomicSwapBase
{
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;
    mapping(bytes32 => Release[]) public swapOrderVestingParams; //
    mapping(bytes32 => mapping(address => Bid)) public bids;
    ICliffVesting vestingManager;
    address treasury;
    uint public sellerFeeRate;
    uint public buyerFeeRate;
    uint constant maxFeeRateScale = 1e4;

    // Bid
    // Primary mapping using BidKey (order + bidder)
    mapping(bytes32 => mapping(address => uint)) public counteroffers;

    modifier onlyExist(bytes32 id) {
        if (swapOrder[id].id == bytes32(0x0)) {
            revert OrderDoesNotExist();
        }
        _;
    }
}
