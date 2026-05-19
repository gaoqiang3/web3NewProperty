// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/MyTokens.sol";
import "../src/Vault.sol";
import "./handlers/VaultHandler.sol"; //

contract InvariantVault is Test {
    MyTokens public myToken;
    SentinelVault public vault;
    VaultHandler public handler; // ✅ 添加 handler 变量
    address owner = makeAddr("owner");
    address user = makeAddr("user");

    function setUp() public {
        vm.startPrank(owner);

        // 初始化合约
        myToken = new MyTokens(owner);
        vault = new SentinelVault(address(myToken));

        // ✅ 初始化 Handler
        handler = new VaultHandler(address(vault), address(myToken));

        // ✅ 标记 Handler 为目标合约（不变性测试需要）
        targetContract(address(handler));

        // 给 Vault 注入储备金
        myToken.mint(address(vault), 100 ether);

        vm.stopPrank();
    }

    // 不变性测试：Vault 的余额必须 >= 总锁定金额
    function invariant_Solvency() public view {
        assertGe(myToken.balanceOf(address(vault)), vault.lockedAmount(), "Insolvency: Vault balance less than total locked");
    }

    // ✅ 影子变量断言：追踪的预期余额必须与实际余额匹配
    function invariant_balanceMatchesGhost() public view {
        // 无论 Fuzzing 跑了多少次随机组合，这两者必须永远相等
        uint256 expectedBalance = handler.ghost_expectedTotalBalance();
        uint256 actualBalance = vault.lockedAmount(); // ✅ 使用合约的实际锁定金额
        assertEq(expectedBalance, actualBalance, "Ghost variable mismatch");
    }
}
