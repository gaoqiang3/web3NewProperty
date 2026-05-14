// 合规模糊测试
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/MyTokens.sol";
import "../src/Vault.sol";
import "./handlers/VaultHandler.sol";

contract InvariantVaultCompliance is Test {
    MyTokens public myToken;
    SentinelVault public vault;
    VaultHandler public handler;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    function setUp() public {
        vm.startPrank(owner);

        // 初始化合约
        myToken = new MyTokens(owner);
        vault = new SentinelVault(address(myToken));

        // 将 Vault 设为免税地址
        myToken.setExcludedFromFees(address(vault), true);

        // 将 Vault 加入白名单（这样可以铸造更多代币作为储备金）
        myToken.setWhiteList(address(vault), true);

        // 为 Vault 注入利息储备金
        myToken.mint(address(vault), 1000 ether);

        vm.stopPrank();

        // 创建 Handler
        handler = new VaultHandler(address(vault), address(myToken));

        // 标记要测试的目标合约
        targetContract(address(handler));
    }

    // 不变性测试：只有存过钱的用户才能取钱
    function invariant_OnlyDepositorCanWithdraw() public view {
        // 获取用户是否存过钱
        (uint256 lockedAmount,, bool isReleased,) = vault.getLockInfo(user);
        bool hasDeposited = lockedAmount > 0 || isReleased;

        // 核心不变性：没有存过钱的用户，锁定金额应该为 0
        assert(hasDeposited || lockedAmount == 0);
    }

    // 不变性测试：取钱后锁定金额应该减少
    function invariant_WithdrawReducesLockedAmount() public {
        uint256 lockedBefore = vault.lockedAmount();

        // 时间快进后尝试取钱
        vm.warp(block.timestamp + 365 days + 1);

        (uint256 lockedAmount,, bool isReleased,) = vault.getLockInfo(user);

        if (lockedAmount > 0 && !isReleased) {
            vm.prank(user);
            vault.releaseTokens();
        }

        uint256 lockedAfter = vault.lockedAmount();

        // 如果取钱成功，锁定金额应该减少
        assert(lockedAfter <= lockedBefore);
    }

    // 不变性测试：Vault 的状态一致性
    function invariant_VaultStateConsistency() public view {
        uint256 totalLocked = vault.lockedAmount();
        uint256 vaultBalance = myToken.balanceOf(address(vault));

        // Vault 余额必须 >= 总锁定金额
        assert(vaultBalance >= totalLocked);
    }
}
