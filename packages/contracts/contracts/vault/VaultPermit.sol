// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {EIP712Upgradeable} from  "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {IAtomicSwapBase} from "../abstracts/interfaces/IAtomicSwapBase.sol";
import {IVaultPermit} from  "./interfaces/IVaultPermit.sol" ;
import {Vault} from "../abstracts/Vault.sol";
import {IAtomicSwapBase} from "./../abstracts/interfaces/IAtomicSwapBase.sol";
import {OwnablePausableUpgradeable} from  "../abstracts/OwnablePausableUpgradeable.sol";
contract VaultPermit is  Vault, EIP712Upgradeable,IVaultPermit, OwnablePausableUpgradeable {
    bytes32 private constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,bytes32 agreement,uint256 deadline)");
    using EnumerableSet for EnumerableSet.Bytes32Set;
    //mapping (bytes32 => uint) _agreements;
    EnumerableSet.Bytes32Set private _agreements;
    /**
     * @dev Permit deadline has expired.
     */
    error VaultExpiredSignature(uint256 deadline);

    /**
     * @dev Permit deadline has expired.
     */
    error VaultDuplicatedAgreement(bytes32 agreement);


    /**
     * @dev Mismatched signature.
     */
    error VaultInvalidSigner(address signer, address owner);

    /// @notice Initializes the vesting contract with necessary parameters.
    function initialize(address admin, string memory name) external initializer {
        __OwnablePausableUpgradeable_init(admin);
        __EIP712_init(name,"1");
    }


    function permit(
        address token, 
        address spender,
        uint256 value,
        bytes32 agreement,
        IAtomicSwapBase.PermitSignature calldata signature
    ) public virtual {
        // if(_agreements[agreement]>1) {
        //     revert VaultDuplicatedAgreement(agreement);
        // }
        if(_agreements.contains(agreement)) {
            revert VaultDuplicatedAgreement(agreement);
        }
        if (block.timestamp > signature.deadline) {
            revert VaultExpiredSignature(signature.deadline);
        }

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signature.owner, spender, value,agreement, signature.deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, signature.v, signature.r, signature.s);
        if (signer != signature.owner) {
            revert VaultInvalidSigner(signer, signature.owner);
        }
        _agreements.add(agreement);
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

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signature.owner, spender, value,agreement, signature.deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, signature.v, signature.r, signature.s);
        if (signer != signature.owner) {
            revert VaultInvalidSigner(signer, signature.owner);
        }
        _approve(token,signature.owner, spender, value, true);
    }
    function DOMAIN_SEPARATOR() external view virtual returns (bytes32) {
        return _domainSeparatorV4();
    }   
}