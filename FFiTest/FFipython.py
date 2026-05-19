import sys
#该项目写的单个代币转账的税率 发给铸造者

def calculate_tax(value, is_excluded):
    """
    计算税费（复刻合约逻辑）

    Args:
        value: 转账金额
        is_excluded: 是否免税（0=不免, 1=免税）

    Returns:
        (tax_amount, amount_after_tax)
    """
    tax_fee = 100
    fee_denominator = 10000

    if is_excluded == 1:
        # 免税地址：税费为0，全额到账
        return 0, value
    else:
        # 普通地址：扣除1%税费
        tax_amount = (value * tax_fee) // fee_denominator
        amount_after_tax = value - tax_amount
        return tax_amount, amount_after_tax


if __name__ == "__main__":
    try:
        # 获取输入参数
        amount = int(sys.argv[1])
        is_excluded = int(sys.argv[2])  # 新增：是否免税

        # 计算税费
        tax, after_tax = calculate_tax(amount, is_excluded)

        # 输出格式：0x + 64位tax + 64位after_tax
        print(f"0x{tax:064x}{after_tax:064x}")
    except Exception as e:
        sys.exit(1)
