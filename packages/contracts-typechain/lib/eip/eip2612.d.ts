import { BigNumberish, TypedDataField, ethers } from "ethers";
export type EIP2612Domain = {
    name: string;
    version: string;
    chainId: string;
    verifyingContract: string;
};
export type PermitType = {
    owner: string;
    spender: string;
    value: BigNumberish;
    nonce: BigNumberish;
    deadline: BigNumberish;
};
export declare class EIP2612 {
    protected _domain: EIP2612Domain;
    protected _types: Record<string, Array<TypedDataField>>;
    constructor(name: string, version: string, chainId: string, verifyingContract: string);
    sign(owner: ethers.Wallet, value: PermitType): Promise<ethers.Signature>;
}
