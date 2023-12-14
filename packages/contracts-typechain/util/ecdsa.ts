import { BigNumberish, Signer } from "ethers";

interface TypedDataDomain {
  name: string;
  version: string;
  chainId: BigNumberish;
  verifyingContract: string;
}

interface Permit {
  owner: string;
  spender: string;
  value: BigNumberish;
  nonce: BigNumberish;
  deadline: BigNumberish;
}

//const SIGNING_DOMAIN_NAME = "SideProtocol";

const types = {
  // EIP712Domain: [
  //   { name: "name", type: "string" },
  //   { name: "version", type: "string" },
  //   { name: "chainId", type: "uint256" },
  //   { name: "verifyingContract", type: "address" },
  // ],
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};

const _signingDomain = async (params: {
  version: string;
  tokenName: string;
  contractAddress: string;
  chainId: BigNumberish;
}): Promise<TypedDataDomain> => {
  const { version, tokenName, contractAddress, chainId } = params;
  return {
    name: tokenName,
    version,
    verifyingContract: contractAddress,
    chainId,
  };
};

const _formatSignature = async (params: {
  version: string;
  contractAddress: string;
  tokenName: string;
  chainId: BigNumberish;
  author: Signer;
  message: Permit;
}) => {
  const { version, contractAddress, tokenName, chainId, author, message } = params;
  const domain = await _signingDomain({ version, tokenName, contractAddress, chainId });
  const signature = await author.signTypedData(domain, types, message);
  return signature;
};

export const createPermitSignature = async (params: {
  contractAddress: string;
  tokenName: string;
  chainId: BigNumberish;
  author: Signer;
  spender: string;
  value: BigNumberish;
  nonce: BigNumberish;
  deadline: BigNumberish;
}): Promise<{ signature: string }> => {
  const { chainId, tokenName, contractAddress, author, spender, value, nonce, deadline } = params;
  const permitMsg: Permit = {
    owner: await author.getAddress(),
    spender,
    value,
    nonce: nonce,
    deadline,
  };
  const signature = await _formatSignature({
    version: "1",
    contractAddress,
    tokenName,
    chainId,
    author,
    message: permitMsg,
  });
  return { signature };
};
