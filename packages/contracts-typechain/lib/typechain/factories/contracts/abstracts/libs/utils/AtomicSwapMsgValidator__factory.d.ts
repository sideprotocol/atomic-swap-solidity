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
    static readonly bytecode = "0x610d8b610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c806333b988f51461005b5780639a0ebe0014610077578063c3aee15d14610093578063fe963084146100af575b600080fd5b61007560048036038101906100709190610862565b6100cb565b005b610091600480360381019061008c9190610a93565b6101ce565b005b6100ad60048036038101906100a89190610af7565b61039d565b005b6100c960048036038101906100c49190610baa565b610498565b005b6000815103610106576040517ffd68e07a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b82518110156101525782818151811061012657610125610bea565b5b6020026020010151602001518261013d9190610c48565b9150808061014a90610c7c565b91505061010a565b50612710811461018e576040517f0b8ad7f100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6096825111156101ca576040517f1531e37f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff1614158015610221575061021f816020015160000151610657565b155b1561026b578060200151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016102629190610cd3565b60405180910390fd5b60008160a00151116102a9576040517f5fe07c7d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806103145750806060015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b1561034b576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428160c00151101561039a578060c00151426040517ff00605cf000000000000000000000000000000000000000000000000000000008152600401610391929190610cfd565b60405180910390fd5b50565b3373ffffffffffffffffffffffffffffffffffffffff168160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610426576040517f978f045600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600381111561043a57610439610d26565b5b8160010160009054906101000a900460ff16600381111561045e5761045d610d26565b5b14610495576040517f0368368700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600081600084600001518152602001908152602001600020905080600c0160009054906101000a900460ff16156104fb576040517f531749dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156105ac57503373ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b156105e3576040517fbe544a2b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260038111156105f7576105f6610d26565b5b8160010160009054906101000a900460ff16600381111561061b5761061a610d26565b5b03610652576040517f0368368700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600080823b905060008111915050919050565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6106cc82610683565b810181811067ffffffffffffffff821117156106eb576106ea610694565b5b80604052505050565b60006106fe61066a565b905061070a82826106c3565b919050565b600067ffffffffffffffff82111561072a57610729610694565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b61075881610745565b811461076357600080fd5b50565b6000813590506107758161074f565b92915050565b60006040828403121561079157610790610740565b5b61079b60406106f4565b905060006107ab84828501610766565b60008301525060206107bf84828501610766565b60208301525092915050565b60006107de6107d98461070f565b6106f4565b905080838252602082019050604084028301858111156108015761080061073b565b5b835b8181101561082a5780610816888261077b565b845260208401935050604081019050610803565b5050509392505050565b600082601f8301126108495761084861067e565b5b81356108598482602086016107cb565b91505092915050565b60006020828403121561087857610877610674565b5b600082013567ffffffffffffffff81111561089657610895610679565b5b6108a284828501610834565b91505092915050565b6000819050919050565b6108be816108ab565b81146108c957600080fd5b50565b6000813590506108db816108b5565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061090c826108e1565b9050919050565b61091c81610901565b811461092757600080fd5b50565b60008135905061093981610913565b92915050565b60006040828403121561095557610954610740565b5b61095f60406106f4565b9050600061096f8482850161092a565b600083015250602061098384828501610766565b60208301525092915050565b60008115159050919050565b6109a48161098f565b81146109af57600080fd5b50565b6000813590506109c18161099b565b92915050565b600061014082840312156109de576109dd610740565b5b6109e96101006106f4565b905060006109f9848285016108cc565b6000830152506020610a0d8482850161093f565b6020830152506060610a218482850161093f565b60408301525060a0610a358482850161092a565b60608301525060c0610a498482850161092a565b60808301525060e0610a5d84828501610766565b60a083015250610100610a7284828501610766565b60c083015250610120610a87848285016109b2565b60e08301525092915050565b60006101408284031215610aaa57610aa9610674565b5b6000610ab8848285016109c7565b91505092915050565b6000819050919050565b610ad481610ac1565b8114610adf57600080fd5b50565b600081359050610af181610acb565b92915050565b600060208284031215610b0d57610b0c610674565b5b6000610b1b84828501610ae2565b91505092915050565b600060408284031215610b3a57610b39610740565b5b610b4460406106f4565b90506000610b54848285016108cc565b6000830152506020610b688482850161092a565b60208301525092915050565b6000819050919050565b610b8781610b74565b8114610b9257600080fd5b50565b600081359050610ba481610b7e565b92915050565b60008060608385031215610bc157610bc0610674565b5b6000610bcf85828601610b24565b9250506040610be085828601610b95565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c5382610745565b9150610c5e83610745565b9250828201905080821115610c7657610c75610c19565b5b92915050565b6000610c8782610745565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610cb957610cb8610c19565b5b600182019050919050565b610ccd81610901565b82525050565b6000602082019050610ce86000830184610cc4565b92915050565b610cf781610745565b82525050565b6000604082019050610d126000830185610cee565b610d1f6020830184610cee565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220e0db834f8b214baa90413e8de6d943c7bee38bae9743049ed5385e81bb20991764736f6c63430008140033";
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
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderAlreadyCompleted";
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
