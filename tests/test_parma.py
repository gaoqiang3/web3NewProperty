import pytest

# 假设你已有这些fixture
# token_contract, owner, user3, user2, w3

@pytest.mark.parametrize(
    "is_whitelist, mint_amount, should_pass", #should_pass是把用例结果也参数化
    [
        (False, 500 * 10**18, True),
        (False, 501 * 10**18, False),
        (True, 1000 * 10**18, True),
        (True, 1001 * 10**18, False),
    ],
)
def test_mint_limit(token_contract, owner, user3, is_whitelist, mint_amount, should_pass, w3):

    # 1️⃣ 设置白名单
    tx = token_contract.functions.setWhiteList(user3, is_whitelist).transact({"from": owner})
    w3.eth.wait_for_transaction_receipt(tx)

    # 2️⃣ 执行 mint
    if should_pass:
        tx = token_contract.functions.mint(user3, mint_amount).transact({"from": owner})
        receipt = w3.eth.wait_for_transaction_receipt(tx)

        # ✅ 校验成功
        assert receipt.status == 1

        balance = token_contract.functions.balanceOf(user3).call()
        assert balance == mint_amount

    else:
        # ❌ 期望失败
        with pytest.raises(Exception):
            token_contract.functions.mint(user3, mint_amount).transact({"from": owner})