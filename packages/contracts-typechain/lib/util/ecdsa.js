"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPermitSignature = void 0;
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
const _signingDomain = async (params) => {
    const { version, tokenName, contractAddress, chainId } = params;
    return {
        name: tokenName,
        version,
        verifyingContract: contractAddress,
        chainId,
    };
};
const _formatSignature = async (params) => {
    const { version, contractAddress, tokenName, chainId, author, message } = params;
    const domain = await _signingDomain({ version, tokenName, contractAddress, chainId });
    const signature = await author.signTypedData(domain, types, message);
    return signature;
};
const createPermitSignature = async (params) => {
    const { chainId, tokenName, contractAddress, author, spender, value, nonce, deadline } = params;
    const permitMsg = {
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
exports.createPermitSignature = createPermitSignature;
//# sourceMappingURL=ecdsa.js.map