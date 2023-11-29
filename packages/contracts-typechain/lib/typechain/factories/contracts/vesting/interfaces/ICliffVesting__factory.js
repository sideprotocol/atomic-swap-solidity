"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICliffVesting__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InvalidTotalPercentage",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidVesting",
        type: "error",
    },
    {
        inputs: [],
        name: "NoVestedTokensAvailable",
        type: "error",
    },
    {
        inputs: [],
        name: "NoVestedTokensForRelease",
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
                name: "beneficiary",
                type: "address",
            },
        ],
        name: "VestingAlreadyStarted",
        type: "error",
    },
    {
        inputs: [],
        name: "VestingNotStarted",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "from",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "start",
                                type: "uint256",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "totalAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amountReleased",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "lastReleasedStep",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct ICliffVesting.VestingSchedule",
                        name: "schedule",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "durationInHours",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "percentage",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct IAtomicSwapBase.Release[]",
                        name: "release",
                        type: "tuple[]",
                    },
                    {
                        internalType: "address",
                        name: "beneficiary",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "scheduleId",
                        type: "uint256",
                    },
                ],
                indexed: true,
                internalType: "struct ICliffVesting.VestingInfo",
                name: "vesting",
                type: "tuple",
            },
        ],
        name: "NewVesting",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Received",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Released",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "durationInHours",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "percentage",
                        type: "uint256",
                    },
                ],
                internalType: "struct IAtomicSwapBase.Release[]",
                name: "releases",
                type: "tuple[]",
            },
        ],
        name: "startVesting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ICliffVesting__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ICliffVesting__factory = ICliffVesting__factory;
ICliffVesting__factory.abi = _abi;
//# sourceMappingURL=ICliffVesting__factory.js.map