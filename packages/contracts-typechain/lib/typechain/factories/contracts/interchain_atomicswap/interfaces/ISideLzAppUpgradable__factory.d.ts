import { type ContractRunner } from "ethers";
import type { ISideLzAppUpgradable, ISideLzAppUpgradableInterface } from "../../../../contracts/interchain_atomicswap/interfaces/ISideLzAppUpgradable";
export declare class ISideLzAppUpgradable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "address payable";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }];
        readonly name: "sendLzMsg";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): ISideLzAppUpgradableInterface;
    static connect(address: string, runner?: ContractRunner | null): ISideLzAppUpgradable;
}
