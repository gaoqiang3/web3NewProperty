// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/MyTokens.sol"; // 确保路径正确
import "../src/Vault.sol";

contract TestVault is Test {
    SentinelVault public vault;
    MyTokens public myToken;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    function setUp() public {
        vm.startPrank(owner);

        myToken = new MyTokens(owner);
        vault = new SentinelVault(address(myToken));

        // 将 Vault 设为免税地址（Vault 转出时不扣税）
        myToken.setExcludedFromFees(address(vault), true);

        // 为 Vault 注入利息储备金（500 枚）
        myToken.mint(address(vault), 500 * 10**18);

        vm.stopPrank();
    }

    function test_VaultLockAndReleaseWithInterest(uint256 amount,uint256 lockDuration) public {
        amount = bound(amount,1, 500 * 10**18);
        lockDuration = bound(lockDuration,1, 3650 days); // 2个月

        // 1. 准备代币
        vm.prank(owner);
        myToken.mint(user, amount);

        // 2. 用户授权并存入
        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();

        // 3. 验证存入扣税 (User -> Vault 扣 1%)
        uint256 expectedLocked = amount - (amount * 100) / 10000;
        (uint256 lockedAmount,,,) = vault.locks(user);
        assertEq(lockedAmount, expectedLocked, "Initial tax failed");

        // 4. 时间快进测试不到时间取不出与能取出
        uint256 startTime = block.timestamp;

        // 只有当锁定期超过 200 秒时，才测试提前取出失败
        if (lockDuration > 200) {
            vm.warp(block.timestamp + 200);
            vm.expectRevert("Tokens still locked");
            vm.prank(user);
            vault.releaseTokens();
        }

        vm.warp(startTime + lockDuration + 1);

        // 5. 用户取出
        vm.prank(user);
        vault.releaseTokens();

        // 6. 验证余额 (本金 + 利息)
        // 利息 = 本金 * 0.5% * 完整月份数
        // 使用实际锁定时间计算（快进后的时间 - 存入时间）
        uint256 actualLockTime = (startTime + lockDuration + 1) - startTime;
        uint256 months = actualLockTime / 30 days; // 计算完整月份数
        uint256 expectedInterest = (expectedLocked * 50 * months) / 10000;
        uint256 finalBalance = expectedLocked + expectedInterest;

        // 因为 Vault 免税，用户应该收到 100% 的 finalBalance
        assertEq(myToken.balanceOf(user), finalBalance, "Vault transfer should be tax-free");
    }

    //不满一个月时，利息为0，且取出不扣税
    function test_InterestOnlyForFullMonths(uint256 amount,uint256 lockDuration) public {
        amount =bound(amount,1,500 * 10**18);
        lockDuration =bound(lockDuration,1,29 days) ;

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();

        vm.warp(block.timestamp + lockDuration + 1);

        vm.prank(user);
        vault.releaseTokens();

        uint256 expectedLocked = amount - (amount * 100) / 10000;
        assertEq(myToken.balanceOf(user), expectedLocked);
    }
    // 测试重复存入失败
    function test_RevertWhen_DuplicateDeposit() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 30 days;

        vm.prank(owner);
        myToken.mint(user, amount * 2);

        vm.startPrank(user);
        myToken.approve(address(vault), amount * 2);
        vault.lockTokens(amount, lockDuration);

        // 第二次存入应该失败
        vm.expectRevert("Already have active locked tokens");
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();
    }

    // 测试零金额存入失败
    function test_RevertWhen_ZeroAmount() public {
        vm.expectRevert("Amount must be greater than 0");
        vm.prank(user);
        vault.lockTokens(0, 30 days);
    }

    // 测试零锁定期失败
    function test_RevertWhen_ZeroDuration() public {
        uint256 amount = 10 * 10**18;

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vm.expectRevert("Lock duration must be greater than 0");
        vault.lockTokens(amount, 0);
        vm.stopPrank();
    }

    // 测试重复取出失败
    function test_RevertWhen_DuplicateRelease() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 1 days;

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();

        vm.warp(block.timestamp + lockDuration + 1);

        vm.prank(user);
        vault.releaseTokens();

        // 第二次取出应该失败
        vm.expectRevert("No locked tokens found");
        vm.prank(user);
        vault.releaseTokens();
    }

    // 测试 canRelease 函数
    function test_CanRelease() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 30 days;

        // 没有锁定代币时
        assertEq(vault.canRelease(user), false);

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();

        // 锁定期内不能取出
        assertEq(vault.canRelease(user), false);

        // 锁定期后可以取出
        vm.warp(block.timestamp + lockDuration + 1);
        assertEq(vault.canRelease(user), true);
    }

    function test_GetLockInfo() public {
        vm.prank (user);
        (uint256 lockedAmount, uint256 releaseTime, bool isReleased, uint256 estimatedInterest) = vault.getLockInfo(user);
        assertEq(lockedAmount, 0, "Locked amount mismatch");
        assertEq(releaseTime, 0, "Release time mismatch");
        assertEq(isReleased, false, "Should not be released");
        assertEq(estimatedInterest, 0, "Estimated interest mismatch");

    }

    // 测试授权不足导致 transferFrom 失败
    function test_RevertWhen_InsufficientAllowance() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 30 days;

        vm.prank(owner);
        myToken.mint(user, amount);

        // 用户不授权直接调用 lockTokens（预期会失败）
        vm.prank(user);
        vm.expectRevert();
        vault.lockTokens(amount, lockDuration);
    }

    // 测试合约暂停时转账失败
    function test_RevertWhen_ContractPaused() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 30 days;

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.prank(user);
        myToken.approve(address(vault), amount);

        // 暂停合约
        vm.prank(owner);
        myToken.pause();

        // 暂停时调用 lockTokens（预期会失败）
        vm.prank(user);
        vm.expectRevert();
        vault.lockTokens(amount, lockDuration);

        // 恢复合约
        vm.prank(owner);
        myToken.unpause();
    }

    // 测试 canRelease 在已取出后返回 false
    function test_CanRelease_AfterRelease() public {
        uint256 amount = 10 * 10**18;
        uint256 lockDuration = 1 days;

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.startPrank(user);
        myToken.approve(address(vault), amount);
        vault.lockTokens(amount, lockDuration);
        vm.stopPrank();

        vm.warp(block.timestamp + lockDuration + 1);

        vm.prank(user);
        vault.releaseTokens();

        // 取出后 canRelease 应该返回 false
        assertEq(vault.canRelease(user), false);
    }

}