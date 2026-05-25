import time
from web3 import Web3
import  os
from dotenv import load_dotenv
import logging

load_dotenv()
ALCHEMY_SEPOLIA_URL = os.getenv("ALCHEMY_SEPOLIA_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
# logging.basicConfig(
#     level=logging.DEBUG,  # 👈 调成 DEBUG 级别，这样底层网络库请求的细节也能看到了
#     format='%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
# logger = logging.getLogger("NodeChecker")
w3 = Web3(Web3.HTTPProvider(ALCHEMY_SEPOLIA_URL))
if not w3.is_connected():
    # logger.critical("❌ 。")
    print("❌ 节点连接失败，请检查 RPC_URL")
    exit()
print("✅ 成功连接至以太坊网络")
def transfer():


    account = w3.eth.account.from_key(PRIVATE_KEY)
    SENDER_ADDRESS = account.address

    #接收账户余额
    RECEIVER_ADDRESS = w3.to_checksum_address("0x76C0dAA3E64265628944a70F2bbd747fC6fB179B")
    print(f"🦊 发送方钱包地址: {SENDER_ADDRESS}")
    balance = w3.eth.get_balance(SENDER_ADDRESS)
    print(f"💰 当前余额: {w3.from_wei(balance, 'ether')} ETH")


    nonce = w3.eth.get_transaction_count(SENDER_ADDRESS)

    tx_params = {
        'nonce': nonce,
        'to': RECEIVER_ADDRESS,
        'value': w3.to_wei(0.001, 'ether'),  # 转账金额：0.001 ETH
        'gas': 21000,                        # 原生 ETH 转账固定 gas 为 21000
        'maxFeePerGas': w3.to_wei(30, 'gwei'),
        'maxPriorityFeePerGas': w3.to_wei(1.5, 'gwei'),
        'chainId': 11155111                  # Sepolia 测试网的 Chain ID 必须固定
    }
    print("区块链构建打包发交易")
    signed_tx = w3.eth.account.sign_transaction(tx_params, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("交易完成")
    TARGET_BLOCK = tx_receipt['blockNumber']
    print(f"🎉 打包成功！该交易被收录在区块高度: {TARGET_BLOCK}")
    return TARGET_BLOCK
def scan_specific_block():
    # 🛠 填入你上一笔交易成功打包的区块高度
    TARGET_BLOCK = transfer()
    # 🛠 填入你的发送方钱包地址（用于精准匹配过滤）
    MY_ADDRESS = w3.to_checksum_address("0x9d3F5476b556F1b5c9C052f95d23176A3EACf868")
    print(f"🔍 开始扫描目标区块: {TARGET_BLOCK} ...")

    try:
        # 获取完整的区块信息，full_transactions=True 会把区块内所有交易的详情都拉下来
        block = w3.eth.get_block(TARGET_BLOCK, full_transactions=True)
        transactions = block['transactions']

        print(f"📦 该区块内共包含 {len(transactions)} 笔交易，正在逐笔匹配...")

        found = False
        for tx in transactions:
            # 匹配发送方或者接收方是否包含你的钱包地址
            if tx['from'].lower() == MY_ADDRESS.lower():
                found = True
                print("\n🎯 【成功捕获到你的专属交易！】")
                print(f"🔹 交易哈希: {tx['hash'].hex()}")
                print(f"🔹 发送方 (From): {tx['from']}")
                print(f"🔹 接收方 (To): {tx['to']}")
                print(f"🔹 转账金额: {w3.from_wei(tx['value'], 'ether')} ETH")
                print(f"🔹 交易流水号 (Nonce): {tx['nonce']}")
                print(f"🔹 消耗 Gas 上限: {tx['gas']}")
                break

        if not found:
            print("⚠️ 未在该区块中找到与你钱包相关的交易，请检查地址或块高是否正确。")

    except Exception as e:
        print(f"❌ 扫块失败: {e}")


if __name__ == "__main__":
    transfer()
    scan_specific_block()

















