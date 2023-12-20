// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {EIP712} from  "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {IAtomicSwapBase} from "../abstracts/interfaces/IAtomicSwapBase.sol";
import {IVaultPermit} from  "./interfaces/IVaultPermit.sol" ;
import {Vault} from "../abstracts/Vault.sol";
import {IAtomicSwapBase} from "./../abstracts/interfaces/IAtomicSwapBase.sol";

contract VaultPermit is  Vault, EIP712, Nonces,IVaultPermit {
    bytes32 private constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,bytes32 agreement,uint256 nonce,uint256 deadline)");
    /**
     * @dev Permit deadline has expired.
     */
    error VaultExpiredSignature(uint256 deadline);

    /**
     * @dev Mismatched signature.
     */
    error VaultInvalidSigner(address signer, address owner);

    constructor(string memory name) EIP712(name, "1") {}

    function permit(
        address token, 
        address spender,
        uint256 value,
        bytes32 agreement,
        IAtomicSwapBase.PermitSignature calldata signature
    ) public virtual {
        if (block.timestamp > signature.deadline) {
            revert VaultExpiredSignature(signature.deadline);
        }

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signature.owner, spender, value,agreement,_useNonce(signature.owner), signature.deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, signature.v, signature.r, signature.s);
        if (signer != signature.owner) {
            revert VaultInvalidSigner(signer, signature.owner);
        }
        _approve(token,signature.owner, spender, value, true);
    }

     function cancelPermit(
        address token, 
        address spender,
        uint256 value,
        bytes32 agreement,
        IAtomicSwapBase.PermitSignature calldata signature
    ) public virtual {
        if (block.timestamp > signature.deadline) {
            revert VaultExpiredSignature(signature.deadline);
        }

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signature.owner, spender, value,agreement,_useNonce(signature.owner), signature.deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, signature.v, signature.r, signature.s);
        if (signer != signature.owner) {
            revert VaultInvalidSigner(signer, signature.owner);
        }
        _approve(token,signature.owner, spender, value, true);
    }
    function nonces(address owner) public view virtual override(IVaultPermit,Nonces) returns (uint256) {
        return super.nonces(owner);
    }

    function DOMAIN_SEPARATOR() external view virtual returns (bytes32) {
        return _domainSeparatorV4();
    }   
}