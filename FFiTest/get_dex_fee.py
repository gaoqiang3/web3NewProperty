import sys
import os
from web3 import Web3
from dotenv import load_dotenv

# 加载 .env
load_dotenv()

POOL_ABI = [
    {
        "inputs": [],
        "name": "fee",
        "outputs": [{"internalType": "uint24", "name": "", "type": "uint24"}],
        "stateMutability": "view",
        "type": "function"
    }
]
def fetch_onchain_fee(pool_address):

    # 1. 从环境变量获取 URL
    rpc_url = os.getenv("ALCHEMY_SEPOLIA_URL")
    w3 = Web3(Web3.HTTPProvider(rpc_url))

    if not w3.is_connected():
        return 0

    try:
        target_addr = Web3.to_checksum_address(pool_address)
        contract = w3.eth.contract(address=target_addr, abi=POOL_ABI)
        fee = contract.functions.fee().call()
        return fee
    except Exception as e:
        return 0


if __name__ == "__main__":
    # 接收 Foundry 参数
    target_pool = sys.argv[1] if len(sys.argv) > 1 else "0x6Ce0896eAE6D4BD668fDe41BB784548fb8F59b50" # 手动去sepolia上获取

    real_fee = fetch_onchain_fee(target_pool)

    # 最终输出：这是 Foundry 唯一想看到的东西
    sys.stdout.write(f"0x{real_fee:064x}")