import os
import json
from solcx import install_solc, compile_standard


def compile_my_token():
    # 1. 环境准备
    solc_version = "0.8.27"
    print(f"⏳ 正在检查 solc {solc_version}...")
    install_solc(solc_version)

    # 2. 路径设置
    # 当前脚本在 scripts 目录下
    script_dir = os.path.abspath(os.path.dirname(__file__))
    # 向上跳一级，到达项目根目录 PythonProject1
    project_root = os.path.dirname(script_dir)

    # 指向 contract 文件夹
    source_path = os.path.join(project_root, "contract", "MyTokens.sol.sol")
    # 指向根目录下的 node_modules
    oz_root = os.path.join(project_root, "node_modules")
    # 设置编译产物保存路径
    build_dir = os.path.join(project_root, "build")

    # print(f"📂 项目根目录: {project_root}")
    # print(f"📄 合约路径: {source_path}")
    # print(f"📦 依赖库路径: {oz_root}")

    if not os.path.exists(source_path):
        print(f"❌ 错误：找不到合约文件 {source_path}")
        return

    with open(source_path, "r", encoding="utf-8") as f:
        source_code = f.read()

    # 3. 构造标准编译 JSON
    input_json = {
        "language": "Solidity",
        "sources": {
            "MyTokens.sol": {"content": source_code}
        },
        "settings": {
            "optimizer": {"enabled": True, "runs": 200},
            "outputSelection": {
                "*": {
                    "*": ["abi", "evm.bytecode.object"]
                }
            },
            # 将代码中的 @openzeppelin 映射到项目根目录下的 node_modules
            "remappings": [
                f"@openzeppelin/={os.path.join(oz_root, '@openzeppelin/')}"
            ]
        }
    }

    print("⚙️  执行自动化编译...")
    compiled_sol = compile_standard(
        input_json,
        solc_version=solc_version,
        # 允许编译器访问整个项目根目录，这样它才能找到 remappings 里的路径
        allow_paths=[project_root]
    )

    # 提取合约数据
    contract_data = compiled_sol['contracts']['MyTokens.sol']['MyTokens.sol']
    abi = contract_data['abi']
    bytecode = contract_data['evm']['bytecode']['object']

    # 4. 保存结果
    os.makedirs(build_dir, exist_ok=True)
    save_path = os.path.join(build_dir, "MyTokens.sol.json")
    with open(save_path, "w") as f:
        json.dump({"abi": abi, "bytecode": bytecode}, f)

    print(f"✅ 编译成功！数据已保存至: {save_path}")
    return abi, bytecode


if __name__ == "__main__":
    compile_my_token()