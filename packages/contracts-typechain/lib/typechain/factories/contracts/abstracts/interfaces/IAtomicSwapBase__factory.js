"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAtomicSwapBase__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "provided",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expectedExpiry",
                type: "uint256",
            },
        ],
        name: "BidAlreadyExpired",
        type: "error",
    },
    {
        inputs: [],
        name: "BidAlreadyPlaced",
        type: "error",
    },
    {
        inputs: [],
        name: "BidDoesNotExist",
        type: "error",
    },
    {
        inputs: [],
        name: "BidNotAllowed",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "enum IAtomicSwapBase.BidStatus",
                name: "status",
                type: "uint8",
            },
        ],
        name: "BidNotInPlacedStatus",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "contractAddress",
                type: "address",
            },
        ],
        name: "InvalidContractAddress",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "provided",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maximum",
                type: "uint256",
            },
        ],
        name: "InvalidExpirationTime",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidMinimumBidLimit",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidTotalPercentage",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "MismatchedBidAmount",
        type: "error",
    },
    {
        inputs: [],
        name: "NoBidPlaced",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "allowance",
                type: "uint256",
            },
        ],
        name: "NotAllowedTransferAmount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "real",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expected",
                type: "uint256",
            },
        ],
        name: "NotEnoughFund",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderAlreadyCompleted",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderAlreadyExists",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderDoesNotExist",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderNotAllowTake",
        type: "error",
    },
    {
        inputs: [],
        name: "OverMaximumReleaseStep",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "caller",
                type: "address",
            },
            {
                internalType: "address",
                name: "expected",
                type: "address",
            },
        ],
        name: "UnauthorizedAcceptAction",
        type: "error",
    },
    {
        inputs: [],
        name: "UnauthorizedCancelAction",
        type: "error",
    },
    {
        inputs: [],
        name: "UnauthorizedSender",
        type: "error",
    },
    {
        inputs: [],
        name: "UnauthorizedTakeAction",
        type: "error",
    },
    {
        inputs: [],
        name: "UnsupportedTokenPair",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroReleaseSchedule",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderID",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bidder",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "AcceptedBid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "AtomicSwapOrderCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "AtomicSwapOrderCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "maker",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "taker",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "AtomicSwapOrderTook",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderID",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bidder",
                type: "address",
            },
        ],
        name: "CanceledBid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderID",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bidder",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "PlacedBid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderID",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bidder",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "ReceivedNewBid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderID",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bidder",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "UpdatedBid",
        type: "event",
    },
];
class IAtomicSwapBase__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IAtomicSwapBase__factory = IAtomicSwapBase__factory;
IAtomicSwapBase__factory.abi = _abi;
//# sourceMappingURL=IAtomicSwapBase__factory.js.map