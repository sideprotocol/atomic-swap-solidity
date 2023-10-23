import { type ContractRunner } from "ethers";
import type { ILayerZeroEndpointUpgradeable, ILayerZeroEndpointUpgradeableInterface } from "../../../../../contracts/interchain_atomicswap/interfaces/layerzero/ILayerZeroEndpointUpgradeable";
export declare class ILayerZeroEndpointUpgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_dstChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }, {
            readonly internalType: "bool";
            readonly name: "_payInZRO";
            readonly type: "bool";
        }, {
            readonly internalType: "bytes";
            readonly name: "_adapterParam";
            readonly type: "bytes";
        }];
        readonly name: "estimateFees";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "nativeFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "zroFee";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
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
        readonly inputs: readonly [];
        readonly name: "getChainId";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "view";
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
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_configType";
            readonly type: "uint256";
        }];
        readonly name: "getConfig";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }];
        readonly name: "getInboundNonce";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "";
            readonly type: "uint64";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_dstChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "address";
            readonly name: "_srcAddress";
            readonly type: "address";
        }];
        readonly name: "getOutboundNonce";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "";
            readonly type: "uint64";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }];
        readonly name: "getReceiveLibraryAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }];
        readonly name: "getReceiveVersion";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }];
        readonly name: "getSendLibraryAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_userApplication";
            readonly type: "address";
        }];
        readonly name: "getSendVersion";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }];
        readonly name: "hasStoredPayload";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "isReceivingPayload";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "isSendingPayload";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }, {
            readonly internalType: "address";
            readonly name: "_dstAddress";
            readonly type: "address";
        }, {
            readonly internalType: "uint64";
            readonly name: "_nonce";
            readonly type: "uint64";
        }, {
            readonly internalType: "uint256";
            readonly name: "_gasLimit";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }];
        readonly name: "receivePayload";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_srcChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_srcAddress";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }];
        readonly name: "retryPayload";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_dstChainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "_destination";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "_payload";
            readonly type: "bytes";
        }, {
            readonly internalType: "address payable";
            readonly name: "_refundAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_zroPaymentAddress";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "_adapterParams";
            readonly type: "bytes";
        }];
        readonly name: "send";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
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
    static createInterface(): ILayerZeroEndpointUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ILayerZeroEndpointUpgradeable;
}
