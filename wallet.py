from web3 import Web3

# 用 RPC 连接以太坊
rpc_url = "https://eth-sepolia.g.alchemy.com/v2/wQcxLuwlwYoHM7MyR-Eir"
w3 = Web3(Web3.HTTPProvider(rpc_url))

# 测试是否连上
print(w3.is_connected())  # True = 成功

# 1. 查区块高度
print(w3.eth.block_number)

# 2. 查钱包余额
address = "0x9d3F5476b556F1b5c9C052f95d23176A3EACf868"
balance_wei = w3.eth.get_balance(address)
balance_eth = w3.from_wei(balance_wei, "ether")
print(balance_eth)

# 3. 查交易详情
# 3. 查交易详情
tx = w3.eth.get_transaction("0x4c8d83c78c018c1ee82989b000d37cdcd3868f69feb69d7cda16b14d4def6790")
print(tx)