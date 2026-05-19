// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title SentinelVault
 * @dev 代币锁仓合约，支持利息功能
 * 用户存入代币后，每月获得 0.5% 的利息
 */
contract SentinelVault {
    // 代币接口实例
    IERC20 public immutable token;

    // ========== 利息配置 ==========
    uint256 public constant INTEREST_RATE = 50;          // 月利率 0.5% (50/10000 = 0.5%)
    uint256 public constant INTEREST_DENOMINATOR = 10000; // 利率分母
    uint256 public constant SECONDS_PER_MONTH = 30 days;  // 每月秒数（按30天计算）

    // 锁定信息结构体
    struct LockInfo {
        uint256 amount;      // 锁定的代币数量（本金）
        uint256 releaseTime; // 解锁时间戳（Unix时间）
        bool isReleased;     // 是否已取出
        uint256 depositTime; // 存入时间戳（用于计算利息）
    }

    // 用户地址 => 锁定信息
    mapping(address => LockInfo) public locks;

    // 总锁定金额（用于不变性测试）
    uint256 public lockedAmount;

    // 事件
    event TokensLocked(address indexed user, uint256 amount, uint256 releaseTime);
    event TokensReleased(address indexed user, uint256 principal, uint256 interest);

    // 构造函数：部署时传入代币合约地址
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    /**
     * @notice 存入代币并锁定
     * @dev 用户需要先调用代币合约的 approve 授权给本合约
     * @param amount 要锁定的代币数量（带18位小数）
     * @param lockDuration 锁定时长（秒）
     */
    function lockTokens(uint256 amount, uint256 lockDuration) external {
        require(amount > 0, "Amount must be greater than 0");
        require(lockDuration > 0, "Lock duration must be greater than 0");

        // 检查用户是否已有未解锁的代币
        LockInfo storage existingLock = locks[msg.sender];
        require(existingLock.amount == 0 || existingLock.isReleased, "Already have active locked tokens");

        // 记录转账前 Vault 的余额（考虑代币可能有税费）
        uint256 balanceBefore = token.balanceOf(address(this));

        // 从用户钱包转移代币到合约
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");

        // 计算实际收到的金额（考虑税费等可能的扣除）
        uint256 actualAmount = token.balanceOf(address(this)) - balanceBefore;

        // 计算解锁时间 = 当前时间 + 锁定时长
        uint256 releaseTime = block.timestamp + lockDuration;

        // 存储锁定信息（使用实际收到的金额，并记录存入时间）
        locks[msg.sender] = LockInfo({
            amount: actualAmount,
            releaseTime: releaseTime,
            isReleased: false,
            depositTime: block.timestamp // 记录存入时间，用于计算利息
        });

        // 更新总锁定金额getLockInfo
        lockedAmount += actualAmount;

        emit TokensLocked(msg.sender, actualAmount, releaseTime);
    }

    /**
     * @notice 计算利息
     * @dev 根据存入时间和当前时间计算应得利息
     * @param principal 本金
     * @param depositTime 存入时间戳
     * @return 应得利息
     */
    function calculateInterest(uint256 principal, uint256 depositTime) internal view returns (uint256) {
        // 计算锁定时长（秒）
        uint256 duration = block.timestamp - depositTime;

        // 计算完整的月份数（不满一个月不计利息）
        uint256 months = duration / SECONDS_PER_MONTH;

        // 利息 = 本金 * 月利率 * 月份数
        // 公式: interest = principal * (INTEREST_RATE / INTEREST_DENOMINATOR) * months
        return (principal * INTEREST_RATE * months) / INTEREST_DENOMINATOR;
    }

    /**
     * @notice 取出已解锁的代币（包含利息）
     * @dev 只能在解锁时间之后调用，取出本金 + 利息
     */
    function releaseTokens() external {
        LockInfo storage lock = locks[msg.sender];

        // 检查是否有锁定的代币
        require(lock.amount > 0, "No locked tokens found");

        // 检查是否已取出
        require(!lock.isReleased, "Tokens already released");

        // 检查是否到达解锁时间
        require(block.timestamp >= lock.releaseTime, "Tokens still locked");

        // 记录已取出
        lock.isReleased = true;
        uint256 principal = lock.amount;
        lock.amount = 0;

        // 计算利息
        uint256 interest = calculateInterest(principal, lock.depositTime);

        // 计算应发放的总金额（本金 + 利息）
        uint256 totalAmount = principal + interest;

        // 转移代币给用户（本金 + 利息）
        bool success = token.transfer(msg.sender, totalAmount);
        require(success, "Token transfer failed");

        // 更新总锁定金额（只减少本金，利息来自储备金）
        lockedAmount -= principal;

        emit TokensReleased(msg.sender, principal, interest);
    }

    /**
     * @notice 查看用户是否可以取出代币
     * @param user 用户地址
     * @return true 可以取出, false 不能取出
     */
    function canRelease(address user) external view returns (bool) {
        LockInfo storage lock = locks[user];
        return lock.amount > 0 && !lock.isReleased && block.timestamp >= lock.releaseTime;
    }

    /**
     * @notice 查看用户的锁定详情（包含预估利息）
     * @param user 用户地址
     * @return amount 本金, releaseTime 解锁时间, isReleased 是否已取出, estimatedInterest 预估利息
     */
    function getLockInfo(address user) external view returns (uint256, uint256, bool, uint256) {
        LockInfo storage lock = locks[user];
        uint256 estimatedInterest = calculateInterest(lock.amount, lock.depositTime);
        return (lock.amount, lock.releaseTime, lock.isReleased, estimatedInterest);
    }
}