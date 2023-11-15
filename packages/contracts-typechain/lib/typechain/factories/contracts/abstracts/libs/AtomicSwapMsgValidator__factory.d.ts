import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { AtomicSwapMsgValidator, AtomicSwapMsgValidatorInterface } from "../../../../contracts/abstracts/libs/AtomicSwapMsgValidator";
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
    static readonly bytecode = "0x610a1c610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061004b5760003560e01c80632dbbbec01461005057806357fc12b01461006c5780639efdfeb114610088575b600080fd5b61006a600480360381019061006591906106fa565b6100a4565b005b610086600480360381019061008191906108c4565b610263565b005b6100a2600480360381019061009d9190610928565b610432565b005b600081600084600001518152602001908152602001600020905080600c0160009054906101000a900460ff1615610107576040517f531749dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156101b857503373ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b156101ef576040517fbe544a2b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600381111561020357610202610955565b5b8160010160009054906101000a900460ff16600381111561022757610226610955565b5b0361025e576040517f0368368700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff16141580156102b657506102b481602001516000015161052d565b155b15610300578060200151600001516040517f19bb40290000000000000000000000000000000000000000000000000000000081526004016102f79190610993565b60405180910390fd5b60008160a001511161033e576040517f5fe07c7d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806103a95750806060015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156103e0576040517f0809490800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428160c00151101561042f578060c00151426040517ff00605cf0000000000000000000000000000000000000000000000000000000081526004016104269291906109bd565b60405180910390fd5b50565b3373ffffffffffffffffffffffffffffffffffffffff168160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104bb576040517f978f045600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038111156104cf576104ce610955565b5b8160010160009054906101000a900460ff1660038111156104f3576104f2610955565b5b1461052a576040517f0368368700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600080823b905060008111915050919050565b6000604051905090565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61059d82610554565b810181811067ffffffffffffffff821117156105bc576105bb610565565b5b80604052505050565b60006105cf610540565b90506105db8282610594565b919050565b6000819050919050565b6105f3816105e0565b81146105fe57600080fd5b50565b600081359050610610816105ea565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061064182610616565b9050919050565b61065181610636565b811461065c57600080fd5b50565b60008135905061066e81610648565b92915050565b60006040828403121561068a5761068961054f565b5b61069460406105c5565b905060006106a484828501610601565b60008301525060206106b88482850161065f565b60208301525092915050565b6000819050919050565b6106d7816106c4565b81146106e257600080fd5b50565b6000813590506106f4816106ce565b92915050565b600080606083850312156107115761071061054a565b5b600061071f85828601610674565b9250506040610730858286016106e5565b9150509250929050565b6000819050919050565b61074d8161073a565b811461075857600080fd5b50565b60008135905061076a81610744565b92915050565b6000604082840312156107865761078561054f565b5b61079060406105c5565b905060006107a08482850161065f565b60008301525060206107b48482850161075b565b60208301525092915050565b60008115159050919050565b6107d5816107c0565b81146107e057600080fd5b50565b6000813590506107f2816107cc565b92915050565b6000610140828403121561080f5761080e61054f565b5b61081a6101006105c5565b9050600061082a84828501610601565b600083015250602061083e84828501610770565b602083015250606061085284828501610770565b60408301525060a06108668482850161065f565b60608301525060c061087a8482850161065f565b60808301525060e061088e8482850161075b565b60a0830152506101006108a38482850161075b565b60c0830152506101206108b8848285016107e3565b60e08301525092915050565b600061014082840312156108db576108da61054a565b5b60006108e9848285016107f8565b91505092915050565b6000819050919050565b610905816108f2565b811461091057600080fd5b50565b600081359050610922816108fc565b92915050565b60006020828403121561093e5761093d61054a565b5b600061094c84828501610913565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b61098d81610636565b82525050565b60006020820190506109a86000830184610984565b92915050565b6109b78161073a565b82525050565b60006040820190506109d260008301856109ae565b6109df60208301846109ae565b939250505056fea264697066735822122054174ebb3c36ffedeec718ab7ad894c86a115b02bcf220e5d67bae4a592270b764736f6c63430008140033";
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
        readonly name: "OrderAlreadyCompleted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderNotAllowTake";
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
        readonly name: "_validateMakeSwapParams";
        readonly outputs: readonly [];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): AtomicSwapMsgValidatorInterface;
    static connect(address: string, runner?: ContractRunner | null): AtomicSwapMsgValidator;
}
export {};
