import { type ContractRunner } from "ethers";
import type { ICliffVesting, ICliffVestingInterface } from "../../../../contracts/vesting/interfaces/ICliffVesting";
export declare class ICliffVesting__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidVesting";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensAvailable";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensForRelease";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OverMaximumReleaseStep";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }];
        readonly name: "VestingAlreadyStarted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "VestingNotStarted";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "from";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "start";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "totalAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amountReleased";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "lastReleasedStep";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct ICliffVesting.VestingSchedule";
                readonly name: "schedule";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "durationInHours";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "percentage";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.Release[]";
                readonly name: "release";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "address";
                readonly name: "beneficiary";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "scheduleId";
                readonly type: "uint256";
            }];
            readonly indexed: true;
            readonly internalType: "struct ICliffVesting.VestingInfo";
            readonly name: "vesting";
            readonly type: "tuple";
        }];
        readonly name: "NewVesting";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "Received";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "Released";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "durationInHours";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "percentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IAtomicSwapBase.Release[]";
            readonly name: "releases";
            readonly type: "tuple[]";
        }];
        readonly name: "startVesting";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ICliffVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): ICliffVesting;
}
