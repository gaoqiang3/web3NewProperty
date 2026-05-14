# tests/conftest.py
import pytest
import os
import json
from web3 import Web3
from eth_tester import PyEVMBackend
from web3.providers.eth_tester import EthereumTesterProvider


@pytest.fixture(scope="session") # session 代表整个测试过程中只启动一次 w3
def w3():
    return Web3(EthereumTesterProvider(PyEVMBackend()))

@pytest.fixture
def owner(w3):
    return w3.eth.accounts[0]


@pytest.fixture
def user(w3):
    return w3.eth.accounts[1]

@pytest.fixture
def user2(w3):
    return w3.eth.accounts[2]

@pytest.fixture
def user3(w3):
    return w3.eth.accounts[3]

@pytest.fixture #scope="module"无论运行多少次 让合约只部署一次
def token_contract(w3, owner):
    # 获取编译产物路径
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(base_dir, "build", "MyTokens.sol.json"), "r") as f:
        data = json.load(f)

    # 部署合约
    contract = w3.eth.contract(abi=data["abi"], bytecode=data["bytecode"])
    tx_hash = contract.constructor(owner).transact({'from': owner}) #transact 写入方法发送交易 测试环境只需要from一个参数
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash) #本地模拟等待区块打包
    return w3.eth.contract(address=tx_receipt.contractAddress, abi=data["abi"])


