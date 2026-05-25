// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../../src/MyTokens.sol";
import "../../test/holeContract.t.sol"; // 确认分号已补

contract AttackExploitTest is Test {
    MyTokens public token;
    VulnerableVault public vault; // 💡 1. 明确把目标合约挂载在全局变量上

    address owner;
    uint256 ownerPrivateKey;       // 💡 2. 在这里显式定义，让大模型能直接读取！
    address attacker = makeAddr("attacker");

    function setUp() public {
        // 使用明确的私钥生成 owner 地址
        ownerPrivateKey = 0xA11CE;
        owner = vm.addr(ownerPrivateKey);

        vm.prank(owner);
        token = new MyTokens(owner);

        // 💡 3. 实例化你的漏洞合约（确保类名和 holeContract.t.sol 保持一致）
        vault = new VulnerableVault();

        vm.deal(attacker, 1 ether);
    }

    // === AI_INJECTION_ZONE ===
}