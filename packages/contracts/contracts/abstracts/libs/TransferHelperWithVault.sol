// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IVault} from "../interfaces/IVault.sol";

library TransferHelperWithVault {
    /// @notice Transfers tokens from the targeted address to the given destination
    /// @notice Errors with 'STF' if transfer fails
    /// @param token The contract address of the token to be transferred
    /// @param from The originating address from which the tokens will be transferred
    /// @param to The destination address of the transfer
    /// @param value The amount to be transferred
    function safeTransferFrom(
        address vault,
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) =
            vault.call(abi.encodeWithSelector(IVault.transferFrom.selector, token, from, to, value));
            require(success && (data.length == 0 || abi.decode(data, (bool))), "STF");
    }

    /// @notice Transfers tokens from msg.sender to a recipient
    /// @dev Errors with ST if transfer fails
    /// @param token The contract address of the token which will be transferred
    /// @param to The recipient of the transfer
    /// @param value The value of the transfer
    function safeTransfer(
        address vault,
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = vault.call(abi.encodeWithSelector(IVault.transfer.selector,token, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "ST");
    }

    /// @notice Approves the stipulated contract to spend the given allowance in the given token
    /// @dev Errors with 'SA' if transfer fails
    /// @param token The contract address of the token to be approved
    /// @param to The target of the approval
    /// @param value The amount of the given token the target will be allowed to spend
    function safeApprove(
        address vault,
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = vault.call(abi.encodeWithSelector(IVault.approve.selector,token, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "SA");
    }
}
