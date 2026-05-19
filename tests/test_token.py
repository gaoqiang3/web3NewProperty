import pytest

# --- 开始编写用例 ---

def test_metadata(token_contract):
    """测试代币基础信息"""
    assert token_contract.functions.name().call() == "MySuperBoomToken"
    assert token_contract.functions.symbol().call() == "MTBK"






def test_pause_mechanism(token_contract, owner, user):
    """测试熔断机制"""
    # 1. 管理员暂停
    token_contract.functions.pause().transact({'from': owner})

    # 2. 尝试转账应失败
    with pytest.raises(Exception):
        token_contract.functions.transfer(user, 100).transact({'from': owner})

    # 3. 管理员恢复
    token_contract.functions.unpause().transact({'from': owner})
    token_contract.functions.transfer(user, 100).transact({'from': owner})
    assert token_contract.functions.balanceOf(user).call() == 100


"""
{
    "abi": [
        {"inputs": [], "name": "name", "outputs": [{"type": "string"}], "type": "function"},
        {"inputs": [], "name": "pause", "outputs": [], "type": "function"}
    ],
    "bytecode": "0x60806040..."
}
"""