// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MyTokens.sol";
import "../src/Vault.sol";
//forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
contract DeployScript is Script {
    function run() external {
        uint256 sk = vm.envUint("Anvil_private_key");
        vm.startBroadcast(sk);
        address deployer = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        // 1. 部署 Token
        MyTokens token = new MyTokens(deployer);


        // 2. 部署 Vault，并传入 token 地址
        SentinelVault vault = new SentinelVault(address(token));
        token.transfer(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 1000 * 10**18);
        vm.stopBroadcast();

        // 输出地址（前端用）
        console.log("MyTokens:", address(token));
        console.log("SentinelVault:", address(vault));
    }
}