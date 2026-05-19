import pytest
def test_add_white(token_contract, owner, user, user2):
    """给用户加上白名单后，由 Owner 铸造 1000 个代币给 user2 并断言"""

    # 给 user2 加上白名单
    token_contract.functions.setWhiteList(user2, True).transact({'from': owner})
    amount = 1000 * 10 ** 18
    limit_amount = 1001 * 10 ** 18

    token_contract.functions.mint(user2, amount).transact({"from": owner})
    # 断言 user2 余额
    assert token_contract.functions.balanceOf(user2).call() == amount

    # 验证限额：Owner 尝试给 user2 铸造 1001 个（超过白名单 1000 的上限）
    with pytest.raises(Exception) as excinfo:
        token_contract.functions.mint(user2, limit_amount).transact({"from": owner})

    # 断言报错信息
    assert "Exceeds mint limit 500" in str(excinfo.value)

