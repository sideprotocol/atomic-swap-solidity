import { type ContractRunner } from "ethers";
import type { ILayerZeroReceiverUpgradeable, ILayerZeroReceiverUpgradeableInterface } from "../../../../../contracts/interchain_atomicswap/interfaces/layerzero/ILayerZeroReceiverUpgradeable";
export declare class ILayerZeroReceiverUpgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint64";
            readonly name: "_nonce";
            readonly type: "uint64";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }];
        readonly name: "lzReceive";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ILayerZeroReceiverUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ILayerZeroReceiverUpgradeable;
}
