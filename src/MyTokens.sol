// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC1363} from "@openzeppelin/contracts/token/ERC20/extensions/ERC1363.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyTokens is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC1363, ERC20Permit, ERC20FlashMint {

    mapping(address => bool) public whiteList;
    mapping(address => bool) public isExcludedFromFees;

    uint256 public constant GENERAL_AMOUNT = 500 * 10**18;
    uint256 public constant WHITE_AMOUNT = 1000 * 10**18;
    uint256 public constant TAX_FEE = 100; // 1%
    uint256 public constant FEE_DENOMINATOR = 10000;

    constructor(address initialOwner)
        ERC20("MySuperBoomToken", "MTBK")
        Ownable(initialOwner)
        ERC20Permit("MySuperBoomToken")
    {
        isExcludedFromFees[initialOwner] = true;
    }

    function pause() public onlyOwner { _pause(); }
    function unpause() public onlyOwner { _unpause(); }

    function setWhiteList(address account, bool status) public onlyOwner {
        whiteList[account] = status;
    }

    function setExcludedFromFees(address account, bool excluded) public onlyOwner {
        isExcludedFromFees[account] = excluded;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        uint256 limit = whiteList[to] ? WHITE_AMOUNT : GENERAL_AMOUNT;
        require(amount <= limit, "Exceeds mint limit");
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        // 逻辑：
        // 1. 铸造/销毁不扣税
        // 2. 如果发送方 from 免税 (比如 Vault)，全额转账给用户
        // 3. 如果接收方 to 免税 (如果你希望存入 Vault 也不扣税，可以加上 isExcludedFromFees[to])
        if (from == address(0) || to == address(0) || isExcludedFromFees[from]) {
            super._update(from, to, value);
        } else {
            uint256 taxAmount = (value * TAX_FEE) / FEE_DENOMINATOR;
            uint256 amountAfterTax = value - taxAmount;

            super._update(from, owner(), taxAmount); // 税费发给 owner
            super._update(from, to, amountAfterTax); // 余款发给接收者
        }
    }
}