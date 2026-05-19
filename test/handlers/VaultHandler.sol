//模糊测试的中间合约
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../../src/MyTokens.sol";
import "../../src/Vault.sol";

contract VaultHandler is Test {
    SentinelVault public vault; //金库合约
    MyTokens public myToken;// 代币合约
    // 预设两个测试角色
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    // 记录单次操作的状态
    uint256 public depositAmount;
    uint256 public lockDuration;

    //  Ghost Variable 声明在合约级别
    uint256 public ghost_expectedTotalBalance; //影子变量

    constructor(address _vault, address _myToken) {
        vault = SentinelVault(_vault);
        myToken = MyTokens(_myToken);
    }

    /**
     * @dev 模拟用户存款动作
     * @param amount 模糊测试生成的随机金额
     * @param duration 模糊测试生成的随机锁定时间
     */
    function deposit(uint256 amount, uint256 duration) public {
        // 1. 【边界限制】使用 bound 确保随机数在业务逻辑范围内 (1~100 Tokens, 1~365天)
        amount = bound(amount, 1 * 10**18, 100 * 10**18);
        duration = bound(duration, 1 days, 365 days);
        // 2. 【准备资金】切换到 Owner 权限，给用户铸造代币
        vm.prank(owner);
        myToken.mint(user, amount);
        // 3. 【授权】切换到用户权限，授权金库可以扣除这笔代币
        vm.prank(user);
        myToken.approve(address(vault), amount);
        // 4. 【执行存入】调用金库的锁定逻辑，此时会触发转账
        vm.prank(user);
        vault.lockTokens(amount, duration);
        // 5. 【更新临时状态】保存本次参数，若报错则方便查看具体的错误数值
        depositAmount = amount;
        lockDuration = duration;
        // 影子对账
        uint256 tax = amount / 100;
        ghost_expectedTotalBalance += (amount - tax);
    }

    function tryRelease() public {
        // 只有存过钱的用户才能取钱
        (uint256 lockedAmount,, bool isReleased,) = vault.getLockInfo(user);

        if (lockedAmount > 0 && !isReleased) {
            vm.warp(block.timestamp + lockDuration + 1);

            vm.prank(user);
            vault.releaseTokens();

            // 成功取出时更新影子变量
            ghost_expectedTotalBalance -= lockedAmount;
        }
    }
    /**
     * @dev 【负面测试】模拟陌生人恶意尝试提取他人的存款
     */
    function tryReleaseWithoutDeposit() public {
        address stranger = makeAddr("stranger");
        vm.prank(stranger);
        vault.releaseTokens();
    }
    // 快速查余额
    function getBalance(address account) public view returns (uint256) {
        return myToken.balanceOf(account);
    }
}
