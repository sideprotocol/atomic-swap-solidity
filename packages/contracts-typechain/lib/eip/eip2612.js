"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP2612 = void 0;
const ethers_1 = require("ethers");
class EIP2612 {
    constructor(name, version, chainId, verifyingContract) {
        this._types = {
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
        if (ethers_1.ethers.isAddress(verifyingContract)) {
            return;
        }
        this._domain = {
            name: name,
            version: version,
            chainId: chainId,
            verifyingContract: verifyingContract,
        };
    }
    async sign(owner, value) {
        const signature = await owner.signTypedData(this._domain, this._types, { Permit: value });
        // split the signature into its components
        const sig = ethers_1.ethers.Signature.from(signature);
        // verify the Permit type data with the signature
        const recovered = ethers_1.ethers.verifyTypedData(this._domain, this._types, value, sig);
        if (recovered) {
            console.log("Recovered:", recovered);
        }
        return sig;
    }
}
exports.EIP2612 = EIP2612;
//# sourceMappingURL=eip2612.js.map