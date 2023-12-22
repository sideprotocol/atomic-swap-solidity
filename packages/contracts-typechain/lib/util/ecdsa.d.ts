import { BigNumberish, Signer } from "ethers";
export declare const createPermitSignature: (params: {
    contractAddress: string;
    tokenName: string;
    chainId: BigNumberish;
    author: Signer;
    spender: string;
    value: BigNumberish;
    agreement: string;
    deadline: BigNumberish;
}) => Promise<{
    signature: string;
}>;
