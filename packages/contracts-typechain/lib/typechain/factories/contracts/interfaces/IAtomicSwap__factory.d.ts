import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAtomicSwap, IAtomicSwapInterface } from "../../../contracts/interfaces/IAtomicSwap";
export declare class IAtomicSwap__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AlreadyCompleted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "AlreadyExistPool";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expected";
            readonly type: "uint256";
        }];
        readonly name: "AlreadyExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "InvalidBidAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "real";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "expected";
            readonly type: "address";
        }];
        readonly name: "InvalidBidder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "max";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "InvalidExpireTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidMinBidCap";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTokenPair";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "real";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "expected";
            readonly type: "address";
        }];
        readonly name: "NoPermissionToAccept";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoPermissionToCancel";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoPermissionToTake";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum IAtomicSwap.BidStatus";
            readonly name: "status";
            readonly type: "uint8";
        }];
        readonly name: "NoPlaceStatusOfBid";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NonExistPool";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expected";
            readonly type: "uint256";
        }];
        readonly name: "NotAllowedAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expected";
            readonly type: "uint256";
        }];
        readonly name: "NotExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TokenTransferFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "current";
            readonly type: "uint256";
        }];
        readonly name: "WrongExpireTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ZeroTokenAddress";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }];
        readonly name: "AtomicSwapOrderCanceled";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }];
        readonly name: "AtomicSwapOrderCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }];
        readonly name: "AtomicSwapOrderTook";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "payer";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "daoShare";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "burned";
            readonly type: "uint256";
        }];
        readonly name: "PaymentReceived";
        readonly type: "event";
    }];
    static createInterface(): IAtomicSwapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAtomicSwap;
}
