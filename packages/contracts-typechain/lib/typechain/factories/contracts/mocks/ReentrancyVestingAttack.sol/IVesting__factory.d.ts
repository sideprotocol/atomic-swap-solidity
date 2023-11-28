import { type ContractRunner } from "ethers";
import type { IVesting, IVestingInterface } from "../../../../contracts/mocks/ReentrancyVestingAttack.sol/IVesting";
export declare class IVesting__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "orderId";
            readonly type: "bytes32";
        }];
        readonly name: "release";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): IVesting;
}
