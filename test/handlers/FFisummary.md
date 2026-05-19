ffi 核心逻辑 利用ffi调用python脚本获取复杂数学模型，在本脚本不复杂，展示使用方法  


// 3. FFI 审计：链下计算预期值
        bool isExcluded = token.isExcludedFromFees(from);
        string[] memory inputs = new string[](4);
        inputs[0] = "python3";
        inputs[1] = "FFiTest/FFipython.py";
        inputs[2] = vm.toString(amount);
        inputs[3] = isExcluded ? "1" : "0";

        bytes memory res = vm.ffi(inputs);
        // expectedTax 接收税费，expectedAfterTax接收税后得到的金额
        (uint256 expectedTax, uint256 expectedAfterTax) = abi.decode(res, (uint256, uint256));
