// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    bool public failTransferFrom = false;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function setFailTransferFrom(bool _value) external {
        failTransferFrom = _value;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        if (failTransferFrom) {
            return false;
        }

        // Call the original transferFrom function
        return super.transferFrom(sender, recipient, amount);
    }
}
