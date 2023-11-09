import { type ContractRunner } from "ethers";
import type { ICliffVesting, ICliffVestingInterface } from "../../../../contracts/vesting/interfaces/ICliffVesting";
export declare class ICliffVesting__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "CliffNotEnded";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensAvailable";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "cliffDurationInHours";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "durationInHours";
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
            readonly name: "releaseIntervalInHours";
            readonly type: "uint256";
        }];
        readonly name: "startVesting";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ICliffVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): ICliffVesting;
}
