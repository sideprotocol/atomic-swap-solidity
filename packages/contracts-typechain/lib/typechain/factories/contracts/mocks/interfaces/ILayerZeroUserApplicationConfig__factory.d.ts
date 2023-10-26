import { type ContractRunner } from "ethers";
import type { ILayerZeroUserApplicationConfig, ILayerZeroUserApplicationConfigInterface } from "../../../../contracts/mocks/interfaces/ILayerZeroUserApplicationConfig";
export declare class ILayerZeroUserApplicationConfig__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }];
        readonly name: "forceResumeReceive";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_version";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "_chainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint256";
            readonly name: "_configType";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "_config";
            readonly type: "bytes";
        }];
        readonly name: "setConfig";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_version";
            readonly type: "uint16";
        }];
        readonly name: "setReceiveVersion";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_version";
            readonly type: "uint16";
        }];
        readonly name: "setSendVersion";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ILayerZeroUserApplicationConfigInterface;
    static connect(address: string, runner?: ContractRunner | null): ILayerZeroUserApplicationConfig;
}
