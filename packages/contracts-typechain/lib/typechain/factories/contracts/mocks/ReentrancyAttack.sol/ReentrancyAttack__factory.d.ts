import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BytesLike, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { ReentrancyAttack, ReentrancyAttackInterface } from "../../../../contracts/mocks/ReentrancyAttack.sol/ReentrancyAttack";
type ReentrancyAttackConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ReentrancyAttack__factory extends ContractFactory {
    constructor(...args: ReentrancyAttackConstructorParams);
    getDeployTransaction(_vestingContract: AddressLike, _beneficiary: AddressLike, _orderId: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_vestingContract: AddressLike, _beneficiary: AddressLike, _orderId: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ReentrancyAttack & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ReentrancyAttack__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516105a73803806105a78339818101604052810190610032919061015b565b826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055505050506101ae565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f2826100c7565b9050919050565b610102816100e7565b811461010d57600080fd5b50565b60008151905061011f816100f9565b92915050565b6000819050919050565b61013881610125565b811461014357600080fd5b50565b6000815190506101558161012f565b92915050565b600080600060608486031215610174576101736100c2565b5b600061018286828701610110565b935050602061019386828701610110565b92505060406101a486828701610146565b9150509250925092565b6103ea806101bd6000396000f3fe6080604052600436106100435760003560e01c8063163de5e5146100f357806338af3eed1461011e5780635e6f6045146101495780639e5faafc1461017457610044565b5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d7c2eec7600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166002546040518363ffffffff1660e01b81526004016100c39291906102db565b600060405180830381600087803b1580156100dd57600080fd5b505af11580156100f1573d6000803e3d6000fd5b005b3480156100ff57600080fd5b5061010861017e565b6040516101159190610304565b60405180910390f35b34801561012a57600080fd5b50610133610184565b604051610140919061031f565b60405180910390f35b34801561015557600080fd5b5061015e6101aa565b60405161016b9190610399565b60405180910390f35b61017c6101ce565b005b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d7c2eec7600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166002546040518363ffffffff1660e01b815260040161024d9291906102db565b600060405180830381600087803b15801561026757600080fd5b505af115801561027b573d6000803e3d6000fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102ac82610281565b9050919050565b6102bc816102a1565b82525050565b6000819050919050565b6102d5816102c2565b82525050565b60006040820190506102f060008301856102b3565b6102fd60208301846102cc565b9392505050565b600060208201905061031960008301846102cc565b92915050565b600060208201905061033460008301846102b3565b92915050565b6000819050919050565b600061035f61035a61035584610281565b61033a565b610281565b9050919050565b600061037182610344565b9050919050565b600061038382610366565b9050919050565b61039381610378565b82525050565b60006020820190506103ae600083018461038a565b9291505056fea2646970667358221220a4ba454431429265a08c3671f711871c71300a353425f39a9b8c3c382968850264736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_vestingContract";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_beneficiary";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "_orderId";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly inputs: readonly [];
        readonly name: "attack";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "beneficiary";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "orderId";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vestingContract";
        readonly outputs: readonly [{
            readonly internalType: "contract IVesting";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ReentrancyAttackInterface;
    static connect(address: string, runner?: ContractRunner | null): ReentrancyAttack;
}
export {};
