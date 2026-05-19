from web3 import Web3

# 输入你在文档里看到的错误名字和参数类型
error_definition = "ERC20InsufficientBalance(...)"

# 计算 Keccak-256 哈希并取前 4 字节
selector = Web3.keccak(text=error_definition)[:4].hex()
print(f"该错误的指纹是: {selector}")
