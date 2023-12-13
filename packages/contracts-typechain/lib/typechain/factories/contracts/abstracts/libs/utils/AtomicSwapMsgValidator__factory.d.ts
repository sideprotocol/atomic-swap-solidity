import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { AtomicSwapMsgValidator, AtomicSwapMsgValidatorInterface } from "../../../../../contracts/abstracts/libs/utils/AtomicSwapMsgValidator";
type AtomicSwapMsgValidatorConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AtomicSwapMsgValidator__factory extends ContractFactory {
    constructor(...args: AtomicSwapMsgValidatorConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AtomicSwapMsgValidator & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AtomicSwapMsgValidator__factory;
    static readonly bytecode = "0x610e87610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c8063162790551461006657806333b988f51461009657806362e454f7146100b25780639a0ebe00146100ce578063c3aee15d146100ea575b600080fd5b610080600480360381019061007b91906107e6565b610106565b60405161008d919061082e565b60405180910390f35b6100b060048036038101906100ab9190610a2d565b61011f565b005b6100cc60048036038101906100c79190610b32565b610262565b005b6100e860048036038101906100e39190610cba565b610407565b005b61010460048036038101906100ff9190610ce8565b6106e8565b005b600080823b905060008163ffffffff1611915050919050565b600081510361015a576040517ffd68e07a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b82518110156101e657600083828151811061017c5761017b610d15565b5b6020026020010151602001519050600081036101c4576040517f2b82b70d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80836101d09190610d73565b92505080806101de90610da7565b91505061015e565b506127108114610222576040517f0b8ad7f100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60968251111561025e576040517f1531e37f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16036102cc576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561037d57503373ffffffffffffffffffffffffffffffffffffffff168260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b156103b4576040517fbe544a2b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b4282600b01541015610403574282600b01546040517f0fe77d7d0000000000000000000000000000000000000000000000000000000081526004016103fa929190610dfe565b60405180910390fd5b5050565b80604001516000015173ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff160361047c576040517f45b3a4c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff16141580156104cf57506104cd816020015160000151610106565b155b15610519578060200151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016105109190610e36565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1681604001516000015173ffffffffffffffffffffffffffffffffffffffff161415801561056c575061056a816040015160000151610106565b155b156105b6578060400151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016105ad9190610e36565b60405180910390fd5b60008160a00151116105f4576040517f5fe07c7d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061065f5750806060015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610696576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428160c0015110156106e5578060c00151426040517ff00605cf0000000000000000000000000000000000000000000000000000000081526004016106dc929190610dfe565b60405180910390fd5b50565b3373ffffffffffffffffffffffffffffffffffffffff168160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610771576040517f978f045600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107b382610788565b9050919050565b6107c3816107a8565b81146107ce57600080fd5b50565b6000813590506107e0816107ba565b92915050565b6000602082840312156107fc576107fb61077e565b5b600061080a848285016107d1565b91505092915050565b60008115159050919050565b61082881610813565b82525050565b6000602082019050610843600083018461081f565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6108978261084e565b810181811067ffffffffffffffff821117156108b6576108b561085f565b5b80604052505050565b60006108c9610774565b90506108d5828261088e565b919050565b600067ffffffffffffffff8211156108f5576108f461085f565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b61092381610910565b811461092e57600080fd5b50565b6000813590506109408161091a565b92915050565b60006040828403121561095c5761095b61090b565b5b61096660406108bf565b9050600061097684828501610931565b600083015250602061098a84828501610931565b60208301525092915050565b60006109a96109a4846108da565b6108bf565b905080838252602082019050604084028301858111156109cc576109cb610906565b5b835b818110156109f557806109e18882610946565b8452602084019350506040810190506109ce565b5050509392505050565b600082601f830112610a1457610a13610849565b5b8135610a24848260208601610996565b91505092915050565b600060208284031215610a4357610a4261077e565b5b600082013567ffffffffffffffff811115610a6157610a60610783565b5b610a6d848285016109ff565b91505092915050565b6000819050919050565b610a8981610a76565b8114610a9457600080fd5b50565b600081359050610aa681610a80565b92915050565b6000819050919050565b610abf81610aac565b8114610aca57600080fd5b50565b600081359050610adc81610ab6565b92915050565b600060408284031215610af857610af761090b565b5b610b0260406108bf565b90506000610b1284828501610acd565b6000830152506020610b26848285016107d1565b60208301525092915050565b60008060608385031215610b4957610b4861077e565b5b6000610b5785828601610a97565b9250506020610b6885828601610ae2565b9150509250929050565b600060408284031215610b8857610b8761090b565b5b610b9260406108bf565b90506000610ba2848285016107d1565b6000830152506020610bb684828501610931565b60208301525092915050565b610bcb81610813565b8114610bd657600080fd5b50565b600081359050610be881610bc2565b92915050565b60006101408284031215610c0557610c0461090b565b5b610c106101006108bf565b90506000610c2084828501610acd565b6000830152506020610c3484828501610b72565b6020830152506060610c4884828501610b72565b60408301525060a0610c5c848285016107d1565b60608301525060c0610c70848285016107d1565b60808301525060e0610c8484828501610931565b60a083015250610100610c9984828501610931565b60c083015250610120610cae84828501610bd9565b60e08301525092915050565b60006101408284031215610cd157610cd061077e565b5b6000610cdf84828501610bee565b91505092915050565b600060208284031215610cfe57610cfd61077e565b5b6000610d0c84828501610a97565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d7e82610910565b9150610d8983610910565b9250828201905080821115610da157610da0610d44565b5b92915050565b6000610db282610910565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610de457610de3610d44565b5b600182019050919050565b610df881610910565b82525050565b6000604082019050610e136000830185610def565b610e206020830184610def565b9392505050565b610e30816107a8565b82525050565b6000602082019050610e4b6000830184610e27565b9291505056fea26469706673582212207e74360bc9f83d02bdae108af553c8980db9a32f714548afd222cfee505bf24364736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddress";
            readonly type: "address";
        }];
        readonly name: "InvalidContractAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "provided";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maximum";
            readonly type: "uint256";
        }];
        readonly name: "InvalidExpirationTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidMinimumBidLimit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidReleasePercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "current";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiredTime";
            readonly type: "uint256";
        }];
        readonly name: "OrderAlreadyExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OverMaximumReleaseStep";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedCancelAction";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedTakeAction";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnsupportedTokenPair";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ZeroReleaseSchedule";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_addr";
            readonly type: "address";
        }];
        readonly name: "isContract";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bytes32";
                readonly name: "uuid";
                readonly type: "bytes32";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.Coin";
                readonly name: "sellToken";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.Coin";
                readonly name: "buyToken";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "maker";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "desiredTaker";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "minBidAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "expireAt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bool";
                readonly name: "acceptBid";
                readonly type: "bool";
            }];
            readonly internalType: "struct IAtomicSwapBase.MakeSwapMsg";
            readonly name: "makeswap";
            readonly type: "tuple";
        }];
        readonly name: "validateMakeSwapParams";
        readonly outputs: readonly [];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
        readonly name: "validateVestingParams";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): AtomicSwapMsgValidatorInterface;
    static connect(address: string, runner?: ContractRunner | null): AtomicSwapMsgValidator;
}
export {};
