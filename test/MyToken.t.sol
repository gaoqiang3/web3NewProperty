// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/MyTokens.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyTokenTest is Test {
    MyTokens public token;

    // 定义几个测试账户
    address owner = makeAddr("owner");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    // 相当于 pytest 的 setup，每个测试函数执行前都会跑一遍
    function setUp() public {
        // 1. 使用 vm.prank 模拟以 owner 身份部署合约
        vm.prank(owner);
        token = new MyTokens(owner);

        // 2. 给 alice 发点钱（Gas 费）
        vm.deal(alice, 1 ether);
    }

    // --- 基础逻辑测试 ---

    function test_InitialState() public {
        assertEq(token.owner(), owner);
        assertEq(token.balanceOf(owner), 0);
    }

    function test_MintAsOwner() public {
        uint256 mintAmount = 100 * 10**18;

        vm.prank(owner);
        token.mint(alice, mintAmount);

        assertEq(token.balanceOf(alice), mintAmount);
    }

    // --- 权限回滚测试 (这就是你之前在 py 里纠结的 e450d38c 报错) ---

    function test_RevertWhen_NonOwnerMints() public {
        uint256 mintAmount = 100 * 10**18;

        // 预期下一行会报错，并匹配 Ownable 的错误指纹
        vm.expectRevert();
        vm.prank(alice); // 切换到非 owner 身份
        token.mint(alice, mintAmount);
    }

    // --- 模糊测试 (Fuzz Testing) -> 找工作的大杀器 ---
    // Foundry 会自动给 amount 注入随机值跑几百次
    function testFuzz_MintAnyAmount(uint256 amount) public {
        // fuzz测试 限制随机数范围，避免超过合约里的逻辑限制（假设上限是 500）
        vm.assume(amount > 0 && amount <= 500);

        uint256 actualAmount = amount * 10**18;

        vm.prank(owner);
        token.mint(bob, actualAmount);

        assertEq(token.balanceOf(bob), actualAmount);
    }

    // --- 事件监听测试 ---
    function test_EmitTransferEvent() public {
        vm.prank(owner);
        token.mint(alice, 100); //给alice点钱方便测试

        // 期待接下来的操作抛出 Transfer 事件
        // 参数分别对应：topic1, topic2, topic3, data 无论几个判断都要写四个bool
        vm.expectEmit(true, true, false, true);
        emit IERC20.Transfer(alice, bob, 50);

        vm.prank(alice);
        token.transfer(bob, 50); //断言这里
    }

    // --- 白名单用户铸造测试 ---
    function test_MintAsWhitelistUser() public {
        // 将 alice 加入白名单
        vm.prank(owner);
        token.setWhiteList(alice, true);

        // 白名单用户可以铸造 1000 枚（WHITE_AMOUNT）
        uint256 whitelistAmount = 1000 * 10**18;

        vm.prank(owner);
        token.mint(alice, whitelistAmount);

        assertEq(token.balanceOf(alice), whitelistAmount);
    }

    // --- 白名单用户超过限额测试 ---
    function test_RevertWhen_WhitelistExceedsLimit() public {
        // 将 alice 加入白名单
        vm.prank(owner);
        token.setWhiteList(alice, true);

        // 尝试铸造超过白名单限额的数量
        uint256 excessAmount = 1001 * 10**18;

        vm.expectRevert("Exceeds mint limit");
        vm.prank(owner);
        token.mint(alice, excessAmount);
    }

}