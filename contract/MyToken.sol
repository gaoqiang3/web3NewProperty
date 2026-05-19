// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.6.0
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC1363} from "@openzeppelin/contracts/token/ERC20/extensions/ERC1363.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC1363, ERC20Permit, ERC20FlashMint {

    constructor(address initialOwner)

        ERC20("MySuperBoomToken", "MTBK")
        Ownable(initialOwner)
        ERC20Permit("MySuperBoomToken") //一个离线签名完成授权
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    //白名单控制用户铸造数量 owner也需要加进白名单才能铸造1000个
    mapping(address => bool) public whiteList; //增加一个白名单 让不同用户有不同额度 1000 和 500
    function setWhiteList(address account, bool status) public onlyOwner {
        whiteList[account] = status;
    }

    uint256 public constant GENERAL_AMOUNT = 500 * 10**18;
    uint256 public constant WHITE_AMOUNT= 1000* 10**18;
    function mint(address to, uint256 amount) public onlyOwner {
    uint256 limit = whiteList[to] ? WHITE_AMOUNT : GENERAL_AMOUNT;
    require(amount <= limit, "Exceeds mint limit 500");
    _mint(to, amount);
    }


    //实现税率功能
    uint256 public constant TAX_FEE = 100; //税费
    uint256 public constant FEE_DENOMINATOR = 10000;
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        if(from != address(0) && to !=address (0)){
            uint256 taxAmount = (value * TAX_FEE) / FEE_DENOMINATOR;
            uint256 amountAfterTax = value - taxAmount;
            super._update(from,owner(),taxAmount);
            super._update(from,to,amountAfterTax);

        }{super._update(from, to, value);}

    }
}

