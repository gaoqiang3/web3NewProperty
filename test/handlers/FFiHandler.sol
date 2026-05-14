// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import {MyTokens} from "../../src/MyTokens.sol";

contract FFIHandler is Test {
    MyTokens public token;

    function setUp() public {
        // 传入 address(this) 作为 initialOwner
        token = new MyTokens(address(this));
    }

    function test_transferWithFFI(address from, address to, uint256 amount) public {
        // 1. 基础过滤与环境准备
        vm.assume(amount > 100); // 让amount大一点 否则总出现扣税为0截断
        vm.assume(from != address(0) && to != address(0) && from != to);
        vm.assume(from != address(token) && to != address(token));

        uint256 testBalance = 100 ether;
        deal(address(token), from, testBalance); // 前面没有vm 代表针对erc20的代币 是封装了底层的函数，代币地址，用户地址
        amount = bound(amount, 1, token.balanceOf(from));

        // 2. 状态快照：必须在 transfer 之前！
        uint256 balanceBeforeTo = token.balanceOf(to);
        uint256 balanceBeforeOwner = token.balanceOf(token.owner());

        // 3. FFI 审计：链下计算预期值
        bool isExcluded = token.isExcludedFromFees(from);
        string[] memory inputs = new string[](4);
        inputs[0] = "python3";
        inputs[1] = "FFiTest/FFipython.py";
        inputs[2] = vm.toString(amount);
        inputs[3] = isExcluded ? "1" : "0";

        bytes memory res = vm.ffi(inputs);
        // expectedTax 接收税费，expectedAfterTax接收税后得到的金额
        (uint256 expectedTax, uint256 expectedAfterTax) = abi.decode(res, (uint256, uint256));

        // 4. 执行链上真实操作
        vm.prank(from);
        token.transfer(to, amount);

        // 5. 硬核对账
        uint256 balanceAfterTo = token.balanceOf(to);
        uint256 actualReceived = balanceAfterTo - balanceBeforeTo;
        assertEq(actualReceived, expectedAfterTax, "Actual received != expected");

        if (!isExcluded) {
            // 计算owner交易前后的余额 得到税费，
            uint256 balanceAfterOwner = token.balanceOf(token.owner());
            uint256 actualTax = balanceAfterOwner - balanceBeforeOwner;
            assertEq(actualTax, expectedTax, "Actual tax != expected");
        }
    }
}