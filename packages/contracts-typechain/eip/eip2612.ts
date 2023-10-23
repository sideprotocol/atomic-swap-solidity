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

export class EIP2612 {
  protected _domain: EIP2612Domain;
  protected _types: Record<string, Array<TypedDataField>> = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };
  constructor(name: string, version: string, chainId: string, verifyingContract: string) {
    if (ethers.isAddress(verifyingContract)) {
      return;
    }
    this._domain = {
      name: name,
      version: version,
      chainId: chainId,
      verifyingContract: verifyingContract,
    };
  }

  async sign(owner: ethers.Wallet, value: PermitType): Promise<ethers.Signature> {
    const signature = await owner.signTypedData(this._domain, this._types, { Permit: value });
    // split the signature into its components
    const sig = ethers.Signature.from(signature);
    // verify the Permit type data with the signature
    const recovered = ethers.verifyTypedData(this._domain, this._types, value, sig);
    if (recovered) {
      console.log("Recovered:", recovered);
    }
    return sig;
  }
}
