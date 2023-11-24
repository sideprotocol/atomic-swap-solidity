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
    static readonly bytecode = "0x610df1610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061006c5760003560e01c8063162790551461007157806333b988f5146100a15780637aa10b6a146100bd5780639a0ebe00146100d9578063c27eeaac146100f5578063c3aee15d14610111575b600080fd5b61008b60048036038101906100869190610763565b61012d565b60405161009891906107ab565b60405180910390f35b6100bb60048036038101906100b691906109aa565b610146565b005b6100d760048036038101906100d29190610a29565b6102a1565b005b6100f360048036038101906100ee9190610bd4565b61038c565b005b61010f600480360381019061010a9190610c52565b6105f8565b005b61012b60048036038101906101269190610a29565b610665565b005b600080823b905060008163ffffffff1611915050919050565b6000815103610181576040517ffd68e07a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b82518110156102255760008382815181106101a3576101a2610c7f565b5b602002602001015160200151905060008110806101cc57506000821180156101cb5750600081145b5b15610203576040517f2b82b70d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b808361020f9190610cdd565b925050808061021d90610d11565b915050610185565b506127108114610261576040517f0b8ad7f100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60968251111561029d576040517f1531e37f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561035257503373ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15610389576040517fbe544a2b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff16141580156103df57506103dd81602001516000015161012d565b155b15610429578060200151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016104209190610d68565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1681604001516000015173ffffffffffffffffffffffffffffffffffffffff161415801561047c575061047a81604001516000015161012d565b155b156104c6578060400151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016104bd9190610d68565b60405180910390fd5b60008160a0015111610504576040517f5fe07c7d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061056f5750806060015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156105a6576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428160c0015110156105f5578060c00151426040517ff00605cf0000000000000000000000000000000000000000000000000000000081526004016105ec929190610d92565b60405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1603610662576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b3373ffffffffffffffffffffffffffffffffffffffff168160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146106ee576040517f978f045600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061073082610705565b9050919050565b61074081610725565b811461074b57600080fd5b50565b60008135905061075d81610737565b92915050565b600060208284031215610779576107786106fb565b5b60006107878482850161074e565b91505092915050565b60008115159050919050565b6107a581610790565b82525050565b60006020820190506107c0600083018461079c565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610814826107cb565b810181811067ffffffffffffffff82111715610833576108326107dc565b5b80604052505050565b60006108466106f1565b9050610852828261080b565b919050565b600067ffffffffffffffff821115610872576108716107dc565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b6108a08161088d565b81146108ab57600080fd5b50565b6000813590506108bd81610897565b92915050565b6000604082840312156108d9576108d8610888565b5b6108e3604061083c565b905060006108f3848285016108ae565b6000830152506020610907848285016108ae565b60208301525092915050565b600061092661092184610857565b61083c565b9050808382526020820190506040840283018581111561094957610948610883565b5b835b81811015610972578061095e88826108c3565b84526020840193505060408101905061094b565b5050509392505050565b600082601f830112610991576109906107c6565b5b81356109a1848260208601610913565b91505092915050565b6000602082840312156109c0576109bf6106fb565b5b600082013567ffffffffffffffff8111156109de576109dd610700565b5b6109ea8482850161097c565b91505092915050565b6000819050919050565b610a06816109f3565b8114610a1157600080fd5b50565b600081359050610a23816109fd565b92915050565b600060208284031215610a3f57610a3e6106fb565b5b6000610a4d84828501610a14565b91505092915050565b6000819050919050565b610a6981610a56565b8114610a7457600080fd5b50565b600081359050610a8681610a60565b92915050565b600060408284031215610aa257610aa1610888565b5b610aac604061083c565b90506000610abc8482850161074e565b6000830152506020610ad0848285016108ae565b60208301525092915050565b610ae581610790565b8114610af057600080fd5b50565b600081359050610b0281610adc565b92915050565b60006101408284031215610b1f57610b1e610888565b5b610b2a61010061083c565b90506000610b3a84828501610a77565b6000830152506020610b4e84828501610a8c565b6020830152506060610b6284828501610a8c565b60408301525060a0610b768482850161074e565b60608301525060c0610b8a8482850161074e565b60808301525060e0610b9e848285016108ae565b60a083015250610100610bb3848285016108ae565b60c083015250610120610bc884828501610af3565b60e08301525092915050565b60006101408284031215610beb57610bea6106fb565b5b6000610bf984828501610b08565b91505092915050565b600060408284031215610c1857610c17610888565b5b610c22604061083c565b90506000610c3284828501610a77565b6000830152506020610c468482850161074e565b60208301525092915050565b600060408284031215610c6857610c676106fb565b5b6000610c7684828501610c02565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ce88261088d565b9150610cf38361088d565b9250828201905080821115610d0b57610d0a610cae565b5b92915050565b6000610d1c8261088d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d4e57610d4d610cae565b5b600182019050919050565b610d6281610725565b82525050565b6000602082019050610d7d6000830184610d59565b92915050565b610d8c8161088d565b82525050565b6000604082019050610da76000830185610d83565b610db46020830184610d83565b939250505056fea26469706673582212204e97c4bd7508584817858c2bed4c51e5b004074b130b91cd5608c62f7013dc6e64736f6c63430008140033";
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
                readonly internalType: "bytes32";
                readonly name: "orderID";
                readonly type: "bytes32";
            }, {
                readonly internalType: "address";
                readonly name: "takerReceiver";
                readonly type: "address";
            }];
            readonly internalType: "struct IAtomicSwapBase.TakeSwapMsg";
            readonly name: "takeswap";
            readonly type: "tuple";
        }];
        readonly name: "validateTakeSwapParams";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
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
