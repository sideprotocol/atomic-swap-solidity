import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { Math, MathInterface } from "../../../../../@openzeppelin/contracts/utils/math/Math";
type MathConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Math__factory extends ContractFactory {
    constructor(...args: MathConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Math & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Math__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220790d7b91fdd446ac2c697f171eeef084d56599665c6d788fe80fcce7f6a12f8764736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "MathOverflowedMulDiv";
        readonly type: "error";
    }];
    static createInterface(): MathInterface;
    static connect(address: string, runner?: ContractRunner | null): Math;
}
export {};
