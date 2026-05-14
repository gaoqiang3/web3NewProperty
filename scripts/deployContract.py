import json
import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# Configuration
rpc_url = os.getenv("ALCHEMY_SEPOLIA_URL")
wallet_address = os.getenv("sepolia_address")
private_key = os.getenv("PRIVATE_KEY")
contract_path = r"E:\learn\projectNewENV\AgnoAi\build\MyToken.json"
print(rpc_url)

def deploy_contract():
    # 1. Connect to Network
    w3 = Web3(Web3.HTTPProvider(rpc_url))
    if not w3.is_connected():
        print("❌ Failed to connect to the node.")
        return

    # 2. Load Contract Data
    with open(contract_path, "r", encoding="utf-8") as f:
        contract_json = json.load(f)

    abi = contract_json["abi"]
    bytecode = contract_json["bytecode"]

    # 3. Prepare Contract and Fees
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    nonce = w3.eth.get_transaction_count(wallet_address)

    # Calculate EIP-1559 Fees
    latest_block = w3.eth.get_block('latest')
    base_fee = latest_block['baseFeePerGas']
    max_priority_fee = w3.eth.max_priority_fee
    max_fee = (base_fee * 2) + max_priority_fee

    # 4. Build Transaction
    # Note: We use 'maxFeePerGas' and 'maxPriorityFeePerGas' instead of 'gasPrice'
    tx_params = {
        'from': wallet_address,
        'nonce': nonce,
        'gas': 3000000,  # Increased slightly to be safe
        'maxFeePerGas': max_fee,
        'maxPriorityFeePerGas': max_priority_fee,
        'chainId': w3.eth.chain_id
    }

    print("✍️ Building and signing transaction...")
    transaction = contract.constructor(wallet_address).build_transaction(tx_params)
    signed_tx = w3.eth.account.sign_transaction(transaction, private_key)

    # 5. Send and Wait
    print("🚀 Sending deployment transaction...")
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"📦 Transaction Hash: {tx_hash.hex()}")

    print("⏳ Waiting for confirmation...")
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    print(f"✅ Deployment Successful!")
    print(f"📍 Contract Address: {tx_receipt.contractAddress}")

    return tx_receipt.contractAddress


if __name__ == "__main__":
    deploy_contract()