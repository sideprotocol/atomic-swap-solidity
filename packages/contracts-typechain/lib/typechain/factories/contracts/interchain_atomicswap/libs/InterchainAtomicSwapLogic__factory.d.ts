import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { InterchainAtomicSwapLogic, InterchainAtomicSwapLogicInterface } from "../../../../contracts/interchain_atomicswap/libs/InterchainAtomicSwapLogic";
type InterchainAtomicSwapLogicConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class InterchainAtomicSwapLogic__factory extends ContractFactory {
    constructor(...args: InterchainAtomicSwapLogicConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<InterchainAtomicSwapLogic & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): InterchainAtomicSwapLogic__factory;
    static readonly bytecode = "0x6103d7610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063cf5bfc7c1461003a575b600080fd5b610054600480360381019061004f91906101c6565b610056565b005b808260a001351061009c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100939061028a565b60405180910390fd5b808260c00135106100e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100d99061028a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1682608001602081019061010d9190610308565b73ffffffffffffffffffffffffffffffffffffffff1603610163576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015a90610381565b60405180910390fd5b5050565b600080fd5b600080fd5b600060e082840312156101875761018661016c565b5b81905092915050565b6000819050919050565b6101a381610190565b81146101ae57600080fd5b50565b6000813590506101c08161019a565b92915050565b60008061010083850312156101de576101dd610167565b5b60006101ec85828601610171565b92505060e06101fd858286016101b1565b9150509250929050565b600082825260208201905092915050565b7f73656c6c65724665652068617320746f20626520736d616c6c6572207468616e60008201527f206d617846656500000000000000000000000000000000000000000000000000602082015250565b6000610274602783610207565b915061027f82610218565b604082019050919050565b600060208201905081810360008301526102a381610267565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102d5826102aa565b9050919050565b6102e5816102ca565b81146102f057600080fd5b50565b600081359050610302816102dc565b92915050565b60006020828403121561031e5761031d610167565b5b600061032c848285016102f3565b91505092915050565b7f696e76616c696420747265617375727920616464726573730000000000000000600082015250565b600061036b601883610207565b915061037682610335565b602082019050919050565b6000602082019050818103600083015261039a8161035e565b905091905056fea264697066735822122050bb0717f25137a1f746410d3ba96ed0c9004eff6a6df8e9ea921a64b450662064736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "admin";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "vestingManager";
                readonly type: "address";
            }, {
                readonly internalType: "uint16";
                readonly name: "chainID";
                readonly type: "uint16";
            }, {
                readonly internalType: "address";
                readonly name: "bridge";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "treasury";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "sellerFee";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "buyerFee";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IInterchainAtomicSwap.InitialParams";
            readonly name: "_params";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "maxFeeRateScale";
            readonly type: "uint256";
        }];
        readonly name: "_validateInitializeParams";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): InterchainAtomicSwapLogicInterface;
    static connect(address: string, runner?: ContractRunner | null): InterchainAtomicSwapLogic;
}
export {};
