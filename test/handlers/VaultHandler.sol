//模糊测试的中间合约
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../../src/MyTokens.sol";
import "../../src/Vault.sol";

contract VaultHandler is Test {
    SentinelVault public vault;
    MyTokens public myToken;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    uint256 public depositAmount;
    uint256 public lockDuration;

    // ✅ Ghost Variable 声明在合约级别
    uint256 public ghost_expectedTotalBalance; //影子变量

    constructor(address _vault, address _myToken) {
        vault = SentinelVault(_vault);
        myToken = MyTokens(_myToken);
    }

    function deposit(uint256 amount, uint256 duration) public {
        amount = bound(amount, 1 * 10**18, 100 * 10**18);
        duration = bound(duration, 1 days, 365 days);

        vm.prank(owner);
        myToken.mint(user, amount);

        vm.prank(user);
        myToken.approve(address(vault), amount);

        vm.prank(user);
        vault.lockTokens(amount, duration);

        depositAmount = amount;
        lockDuration = duration;
        ghost_expectedTotalBalance += amount;
    }

    function tryRelease() public {
        // 只有存过钱的用户才能取钱
        (uint256 lockedAmount,, bool isReleased,) = vault.getLockInfo(user);

        if (lockedAmount > 0 && !isReleased) {
            vm.warp(block.timestamp + lockDuration + 1);

            vm.prank(user);
            vault.releaseTokens();

            // ✅ 只在成功取出时更新
            ghost_expectedTotalBalance -= lockedAmount;
        }
    }

    function tryReleaseWithoutDeposit() public {
        address stranger = makeAddr("stranger");
        vm.prank(stranger);
        vault.releaseTokens();
    }

    function getBalance(address account) public view returns (uint256) {
        return myToken.balanceOf(account);
    }
}
