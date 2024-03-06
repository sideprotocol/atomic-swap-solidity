// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {IVault} from  "./interfaces/IVault.sol";

abstract contract Vault is ContextUpgradeable,IVault  {
    
    mapping(address account => mapping(address token => uint256 amount)) private _balances;
    mapping(address account => mapping(address  token => mapping(address spender => uint256))) private _allowances;

    event  VaultApproval(address indexed owner, address indexed spender, uint256 indexed value);
    event  VaultTransfer(address token, address from, address to, uint256 value);
      // Event for Deposits
    event Deposit(address indexed token, address indexed from, uint256 value);
    // Event for Withdrawals
    event Withdrawal(address indexed token, address indexed to, uint256 value);

    
    error VaultInvalidApprover(address approver);

    error VaultInvalidSpender(address spender);
    error VaultInvalidSender(address sender);
    error VaultInvalidReceiver(address receiver);

    error VaultInsufficientAllowance(address spender, uint256 currentAllowance, uint256 value);
    
    
    error VaultInsufficientBalance(address token, address from, uint256 fromBalance, uint256 value);

    error VaultInvalidAmount(uint256 amount);
    error VaultAdditionalEther(uint256 amount);
    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `value` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address token, address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(token,owner, spender, value, true);
        return true;
    }

    

    function _approve(address token, address owner, address spender, uint256 value, bool emitEvent) internal virtual {
        if (owner == address(0)) {
            revert VaultInvalidApprover(address(0));
        }
        if (spender == address(0)) {
            revert VaultInvalidSpender(address(0));
        }
        _allowances[owner][token][spender] = value;
        if (emitEvent) {
            emit VaultApproval(owner, spender, value);
        }
    }
   
    function balanceOf(address account,address token) public view virtual returns (uint256) {
        return _balances[account][token];
    }

     /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `value`.
     */
    function transfer(address token,address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(token,owner, to, value);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `value`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `value`.
     */
    function transferFrom(address token, address from, address to, uint256 value) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(token,from, spender, value);
        _transfer(token,from, to, value);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address token,address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][token][spender];
    }


    /**
     * @dev Moves a `value` amount of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * NOTE: This function is not virtual, {_update} should be overridden instead.
     */
    function _transfer(address token, address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert VaultInvalidSender(address(0));
        }
        if (to == address(0)) {
            revert VaultInvalidReceiver(address(0));
        }
        _update(token,from, to, value);
    }

    /**
     * @dev Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`
     * (or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding
     * this function.
     *
     * Emits a {Transfer} event.
     */
    function _update(address token, address from, address to, uint256 value) internal virtual {
        uint256 fromBalance = _balances[from][token];
        if (fromBalance < value) {
            revert VaultInsufficientBalance(token, from, fromBalance, value);
        }
        unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
            _balances[from][token] = fromBalance - value;
        }
        unchecked {
            // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
            _balances[to][token] += value;
        }
        emit VaultTransfer(token,from, to, value);
    }
    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `value`.
     *
     * Does not update the allowance value in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Does not emit an {Approval} event.
     */
    function _spendAllowance(address token, address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(token,owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert VaultInsufficientAllowance(spender, currentAllowance, value);
            }
            unchecked {
                _approve(token,owner, spender, currentAllowance - value, false);
            }
        }
    }

    /**
     * @dev Allows a user to deposit ERC20 tokens or Ether into the vault.
     * @param token The address of the ERC20 token contract, or the zero address for Ether.
     */
    function deposit(address token, uint256 amount) public payable {
        if (token != address(0)) {
            // Deposit is for ERC20 tokens
            if(msg.value != 0) {
                revert VaultAdditionalEther(amount);
            }
            TransferHelper.safeTransferFrom(token, _msgSender(), address(this), amount);
        } else {
            if(msg.value != amount) {
                revert VaultInvalidAmount(amount);
            }
        }
        
        // Update the user's balance
        _balances[_msgSender()][token] += amount;
        emit Deposit(token, _msgSender(), amount);
    }

    /**
     * @dev Allows a user to withdraw ERC20 tokens or Ether from the vault.
     * @param token The address of the ERC20 token contract, or the zero address for Ether.
     * @param amount The amount of tokens or Ether to withdraw.
     */
    function withdraw(address token,address to, uint256 amount) public {
        if(amount < 0) {
            revert VaultInvalidAmount(amount);
        }
        uint256 balance = _balances[_msgSender()][token];
        if(balance < amount) {
            revert VaultInvalidAmount(amount);
        }

        // Update the user's balance
        _balances[_msgSender()][token] -= amount;

        if (token == address(0)) {
            // Withdrawal is for Ether
            (bool sent, ) = to.call{value: amount}("");
            require(sent, "Vault: Failed to send Ether");
        } else {
            // Withdrawal is for ERC20 tokens
            TransferHelper.safeTransfer(token, to, amount);
        } 
        emit Withdrawal(token, to, amount);
    }

    // Function to receive Ether when 'send' or 'transfer' is used
    receive() external payable {}
    // Fallback function to receive Ether when called
    fallback() external payable {}
}