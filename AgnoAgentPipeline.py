# AgnoAgentPipeline.py
import os
import subprocess
import uuid
from agno.agent import Agent
from dotenv import load_dotenv
from agno.models.openai import OpenAIChat
from AgnoAgent import save_file, load_contract,write_file

load_dotenv()
API_KEY = os.getenv("DASHSCOPE_API_KEY")


def assemble_test_file(ai_code):
    output_path = "./test/AtkContract/AttackExploit.t.sol"
    template = load_contract("./test/AtkContract/AttackTemplate.t.sol")
    marker = "// === AI_INJECTION_ZONE ==="

    final_content = template.replace(marker, f"{marker}\n{ai_code}")
    write_file("./test/AtkContract/AttackExploit.t.sol", final_content)
    print(f"✨ 最终攻击测试用例已组装至: {output_path}")

def run_forge_test():
    """💡 核心函数：利用 Python 动态执行命令并抓取报错"""
    print("🔨 正在调用 Foundry 编译并运行测试...")
    result = subprocess.run(
        ["forge", "test", "--match-path", "test/AtkContract/AttackExploit.t.sol", "-vvvv"],
        capture_output=True,
        text=True
    )
    # 合并输出
    output = result.stdout + "\n" + result.stderr
    # 判断是否完全通过：返回码为0且日志中不包含 FAIL
    is_success = (result.returncode == 0) and ("FAIL" not in output)
    return is_success, output


def run_contract_audit():
    qwen_model = OpenAIChat(
        id="qwen-max",
        api_key=API_KEY,
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
    )

    #  移除 instructions 和 use_developer_prompt 参数
    auditor_agent = Agent(
        name="Solidity Auditor",
        model=qwen_model
    )
    solidity_code = load_contract("./test/MyToken.t.sol")

    print("🚀 正在激活「Qwen 审计智能体」分析 Fuzz 边界...")

    # 3. 【核心绕过技巧】：将人设、任务和源码全部打包进一个纯文本 Prompt 中
    prompt = f"""
        你是一个顶级的智能合约安全审计师和 Foundry QA 工程师。

        任务：
        1. 请帮我编写一个逆向边界测试。故意传入不满足边界限制的越界参数，并使用 vm.expectRevert() 确保合约能够正确拦截这些非法操作。
        2. 为我的 AttackTemplate 测试脚手架编写一个符合该条件的完整测试函数（以 function test_Attack 开头）。

        【测试合约源码】
        {solidity_code}

        【返回格式严格要求】
        你的返回必须严格包含以下两个标记，用来方便 Python 解析：

        === SUMMARY_START ===
        (在这里写下你的中文边界条件分析报告)
        === SUMMARY_END ===

        === CODE_START ===
        (在这里「只写」纯粹的 Solidity 测试函数代码，严禁带有 ``` 符号和任何大白话)
        === CODE_END ===
        """
    max_retries = 5
    current_try = 1
    while current_try <= max_retries:
        print(f"\n🔄 [循环第 {current_try}/{max_retries} 次尝试] 正在让 AI 生成/修正测试用例...")

        res = auditor_agent.run(prompt)
        ai_code_fragment = res.content.strip()

        if "=== FIX_LOG_START ===" in ai_code_fragment and "=== FIX_LOG_END ===" in ai_code_fragment:
            fix_log = ai_code_fragment.split("=== FIX_LOG_START ===")[1].split("=== FIX_LOG_END ===")[0].strip()
            print(f"🔧 【AI 自我修复变更日志】:\n{fix_log}")
            print("-" * 30)



        # 清洗出核心代码
        if "=== CODE_START ===" in ai_code_fragment and "=== CODE_END ===" in ai_code_fragment:
            ai_code_fragment = ai_code_fragment.split("=== CODE_START ===")[1].split("=== CODE_END ===")[0].strip()
        else:
            ai_code_fragment = ai_code_fragment

        print("🎨 AI 输出了代码片段，正在注入到模板...")
        assemble_test_file(ai_code_fragment)

        #  跑测试并捕捉遇到的报错
        success, forge_log = run_forge_test()

        if success:
            print(f"🎉【自动化闭环成功！】AI 在第 {current_try} 次尝试时完美修正了所有编译/断言错误！")
            break
        else:
            print(f"❌ 遭遇 Foundry 错误！正在将错现场抛给 AI 强制自愈...")
            template_code=load_contract("./test/AtkContract/AttackTemplate.t.sol")
            # 3. 【自愈核心】：动态拼装错误日志，更新 prompt 开启下一次循环
            prompt = f"""
                        Your previous Solidity code fragment failed inside the Foundry compiler or test runner. Fix it.

                        【Crucial Environment Context】
                        1. This is the original target contract under test:
                        {solidity_code}

                        2. This is your AttackTemplate test scaffold. You MUST use the variables, contracts, and setups already defined here. Do NOT invent or shadow them:
                        {template_code}

                        【Your Failure Scene】
                        [Your Previous Code Fragment That Failed]
                        {ai_code_fragment}

                        [Foundry Error Log From Compiler/Runner]
                        {forge_log}

                        [Strict Output Rules]
                        Your return MUST follow this exact layout with markers:

                        === FIX_LOG_START ===
                        (在这里用中文清晰地写出：1. 读懂了什么报错；2. 你在这一轮里把哪一行代码做出了什么修改来修复它)
                        === FIX_LOG_END ===

                        === CODE_START ===
                        (Here 'ONLY' write the complete fixed Solidity function block starting with 'function test_'. No explanations, no markdown fences!)
                        === CODE_END ===
                        """
            current_try += 1
    else:
        print(f"😢 自愈失败：已达到最大尝试次数 {max_retries}，AI 仍未调通代码。")

if __name__ == '__main__':
    run_contract_audit()