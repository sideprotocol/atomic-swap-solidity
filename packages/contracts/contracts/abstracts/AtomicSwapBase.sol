// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAtomicSwapBase.sol";

abstract contract AtomicSwapBase is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    IAtomicSwapBase
{
    mapping(bytes32 => AtomicSwapOrder) public swapOrder;
    mapping(bytes32 => mapping(address => Bid)) public bids;

    address treasury;
    uint public sellerFeeRate;
    uint public buyerFeeRate;
    uint constant maxFee = 1e3;

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
