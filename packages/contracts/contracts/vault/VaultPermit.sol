// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing necessary OpenZeppelin contracts and interfaces for cryptographic functions, data structures, and atomic swap base interfaces.
import {EIP712Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {IAtomicSwapBase} from "../abstracts/interfaces/IAtomicSwapBase.sol";
import {IVaultPermit} from "./interfaces/IVaultPermit.sol";
import {Vault} from "../abstracts/Vault.sol";
import {OwnablePausableUpgradeable} from "../abstracts/OwnablePausableUpgradeable.sol";

/// @title Vault Permit Contract
/// @notice This contract handles permits for token transactions within a vault, using EIP-712 typed data signing.
/// @dev Inherits from Vault, EIP712Upgradeable, IVaultPermit, and OwnablePausableUpgradeable for comprehensive functionality.
contract VaultPermit is Vault, EIP712Upgradeable, IVaultPermit, OwnablePausableUpgradeable {
    // The typehash used for EIP-712 compliant permit signing.
    bytes32 private constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,bytes32 agreement,uint256 deadline)");

    // Using EnumerableSet for managing unique agreements.
    using EnumerableSet for EnumerableSet.Bytes32Set;
    EnumerableSet.Bytes32Set private _agreements;

    // Custom errors for specific revert conditions.
    error VaultExpiredSignature(uint256 deadline);
    error VaultDuplicatedAgreement(bytes32 agreement);
    error VaultInvalidSigner(address signer, address owner);

    /// @notice Initializes the vault permit contract with an admin and a name for EIP712 domain.
    /// @param admin The admin address for the contract.
    /// @param name The name used for the EIP712 domain, important for permit signing.
    function initialize(address admin, string memory name) external initializer {
        __OwnablePausableUpgradeable_init(admin);
        __EIP712_init(name, "1");
    }

    /// @notice Handles the creation of a permit for token transactions within the vault.
    /// @param token The address of the token for which the permit is created.
    /// @param spender The address authorized to spend the tokens.
    /// @param value The amount of tokens the spender is authorized to use.
    /// @param agreement A unique identifier for the permit agreement.
    /// @param signature The digital signature provided by the token owner, confirming the permit.
    /// @dev Validates the signature, checks for agreement uniqueness, and records the permit.
    function permit(
        address token, 
        address spender,
        uint256 value,
        bytes32 agreement,
        IAtomicSwapBase.PermitSignature calldata signature
    ) public virtual {
        if (_agreements.contains(agreement)) {
            revert VaultDuplicatedAgreement(agreement);
        }
        if (block.timestamp > signature.deadline) {
            revert VaultExpiredSignature(signature.deadline);
        }

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signature.owner, spender, value, agreement, signature.deadline));
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(hash, signature.v, signature.r, signature.s);

        if (signer != signature.owner) {
            revert VaultInvalidSigner(signer, signature.owner);
        }
        _agreements.add(agreement);
        _approve(token, signature.owner, spender, value, true);
    }

    /// @notice Returns the domain separator used for EIP-712 typed data signing.
    /// @return The current domain separator.
    /// @dev Useful for off-chain services that need to construct and sign EIP-712 typed data.
    function DOMAIN_SEPARATOR() external view virtual returns (bytes32) {
        return _domainSeparatorV4();
    }   
}
