import { type ContractRunner } from "ethers";
import type { ReentrancyGuardUpgradeable, ReentrancyGuardUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable";
export declare class ReentrancyGuardUpgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }];
    static createInterface(): ReentrancyGuardUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ReentrancyGuardUpgradeable;
}
