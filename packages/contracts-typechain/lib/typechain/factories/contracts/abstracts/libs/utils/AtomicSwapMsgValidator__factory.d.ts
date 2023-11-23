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
    static readonly bytecode = "0x610e55610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c8063162790551461006657806333b988f5146100965780639a0ebe00146100b2578063c3aee15d146100ce578063fe963084146100ea575b600080fd5b610080600480360381019061007b919061074f565b610106565b60405161008d9190610797565b60405180910390f35b6100b060048036038101906100ab9190610996565b610151565b005b6100cc60048036038101906100c79190610b5d565b610254565b005b6100e860048036038101906100e39190610bc1565b610423565b005b61010460048036038101906100ff9190610c74565b61051e565b005b60008060007fc5d2460186f7233c927e7db2dcc703c0e500c6ad951cad7ef3aa0f8344b6123960001b9050833f91506000801b82141580156101485750808214155b92505050919050565b600081510361018c576040517ffd68e07a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b82518110156101d8578281815181106101ac576101ab610cb4565b5b602002602001015160200151826101c39190610d12565b915080806101d090610d46565b915050610190565b506127108114610214576040517f0b8ad7f100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b609682511115610250576040517f1531e37f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff16141580156102a757506102a5816020015160000151610106565b155b156102f1578060200151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016102e89190610d9d565b60405180910390fd5b60008160a001511161032f576040517f5fe07c7d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061039a5750806060015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156103d1576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428160c001511015610420578060c00151426040517ff00605cf000000000000000000000000000000000000000000000000000000008152600401610417929190610dc7565b60405180910390fd5b50565b3373ffffffffffffffffffffffffffffffffffffffff168160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104ac576040517f978f045600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038111156104c0576104bf610df0565b5b8160010160009054906101000a900460ff1660038111156104e4576104e3610df0565b5b1461051b576040517fd4dbb56500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600081600084600001518152602001908152602001600020905080600c0160009054906101000a900460ff1615610581576040517f531749dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561063257503373ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15610669576040517fbe544a2b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600381111561067d5761067c610df0565b5b8160010160009054906101000a900460ff1660038111156106a1576106a0610df0565b5b036106d8576040517fd4dbb56500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061071c826106f1565b9050919050565b61072c81610711565b811461073757600080fd5b50565b60008135905061074981610723565b92915050565b600060208284031215610765576107646106e7565b5b60006107738482850161073a565b91505092915050565b60008115159050919050565b6107918161077c565b82525050565b60006020820190506107ac6000830184610788565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610800826107b7565b810181811067ffffffffffffffff8211171561081f5761081e6107c8565b5b80604052505050565b60006108326106dd565b905061083e82826107f7565b919050565b600067ffffffffffffffff82111561085e5761085d6107c8565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b61088c81610879565b811461089757600080fd5b50565b6000813590506108a981610883565b92915050565b6000604082840312156108c5576108c4610874565b5b6108cf6040610828565b905060006108df8482850161089a565b60008301525060206108f38482850161089a565b60208301525092915050565b600061091261090d84610843565b610828565b905080838252602082019050604084028301858111156109355761093461086f565b5b835b8181101561095e578061094a88826108af565b845260208401935050604081019050610937565b5050509392505050565b600082601f83011261097d5761097c6107b2565b5b813561098d8482602086016108ff565b91505092915050565b6000602082840312156109ac576109ab6106e7565b5b600082013567ffffffffffffffff8111156109ca576109c96106ec565b5b6109d684828501610968565b91505092915050565b6000819050919050565b6109f2816109df565b81146109fd57600080fd5b50565b600081359050610a0f816109e9565b92915050565b600060408284031215610a2b57610a2a610874565b5b610a356040610828565b90506000610a458482850161073a565b6000830152506020610a598482850161089a565b60208301525092915050565b610a6e8161077c565b8114610a7957600080fd5b50565b600081359050610a8b81610a65565b92915050565b60006101408284031215610aa857610aa7610874565b5b610ab3610100610828565b90506000610ac384828501610a00565b6000830152506020610ad784828501610a15565b6020830152506060610aeb84828501610a15565b60408301525060a0610aff8482850161073a565b60608301525060c0610b138482850161073a565b60808301525060e0610b278482850161089a565b60a083015250610100610b3c8482850161089a565b60c083015250610120610b5184828501610a7c565b60e08301525092915050565b60006101408284031215610b7457610b736106e7565b5b6000610b8284828501610a91565b91505092915050565b6000819050919050565b610b9e81610b8b565b8114610ba957600080fd5b50565b600081359050610bbb81610b95565b92915050565b600060208284031215610bd757610bd66106e7565b5b6000610be584828501610bac565b91505092915050565b600060408284031215610c0457610c03610874565b5b610c0e6040610828565b90506000610c1e84828501610a00565b6000830152506020610c328482850161073a565b60208301525092915050565b6000819050919050565b610c5181610c3e565b8114610c5c57600080fd5b50565b600081359050610c6e81610c48565b92915050565b60008060608385031215610c8b57610c8a6106e7565b5b6000610c9985828601610bee565b9250506040610caa85828601610c5f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d1d82610879565b9150610d2883610879565b9250828201905080821115610d4057610d3f610ce3565b5b92915050565b6000610d5182610879565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d8357610d82610ce3565b5b600182019050919050565b610d9781610711565b82525050565b6000602082019050610db26000830184610d8e565b92915050565b610dc181610879565b82525050565b6000604082019050610ddc6000830185610db8565b610de96020830184610db8565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220711b4578b35bd21e5813089d1e8c2748ff1e9d696994f694c64d3d803ca171b164736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InactiveOrder";
        readonly type: "error";
    }, {
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
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderNotAllowTake";
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
        readonly name: "ZeroReleaseSchedule";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
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
