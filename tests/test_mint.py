import pytest
from eth_tester.exceptions import TransactionFailed



def test_mint_by_owner(token_contract, owner, user):
    """测试管理员铸造功能"""
    mint_amount = 10 ** 18  # 1个代币
    token_contract.functions.mint(user, mint_amount).transact({'from': owner})

    assert token_contract.functions.balanceOf(user).call() == mint_amount

# |`118cdaa7`| `OwnableUnauthorizedAccount(address)` | 权限不足：非 Owner 地址调用了 `onlyOwner` 函数。 |
# |`d38e3e4a`| `OwnableInvalidOwner(address)` | 无效主人：设置了一个零地址（0x0）作为新 Owner。 |
# |`e1f3a46e`| `ERC20InsufficientBalance(...)` | 余额不足：转账金额超过了账户持有的代币数量。 |
# |`8baa579f`| `ERC20InsufficientAllowance(...)` | 授权不足：代理转账金额超过了 `approve` 的额度。 |
# |`97135010`| `EnforcedPause()` | **已暂停**：在合约暂停期间调用了被禁止的函数。 |
ERRORS = {
    "OWNABLE_UNAUTHORIZED": "118cdaa7",  # OwnableUnauthorizedAccount
    "TRANSFER_EXCEEDS_BALANCE": "e1f3a46e", # ERC20InsufficientBalance
    "PAUSED": "97135010"                 # EnforcedPause
}
def test_mint_by_non_owner(token_contract, user):
    """测试非白名单篡权铸造（安全性测试）"""
    with pytest.raises(TransactionFailed) as excinfo:
        token_contract.functions.mint(user, 501).transact({'from': user})
    error_string = str(excinfo.value)
    clean_error = error_string.replace("\\x", "")
    assert ERRORS["OWNABLE_UNAUTHORIZED"] in clean_error







