import os
import uuid
import subprocess
from dotenv import load_dotenv
from dashscope import Generation

load_dotenv()

API_KEY = os.getenv("DASHSCOPE_API_KEY")


# =====================
# 📂 Utils
# =====================

def load_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def save_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


# =====================
# 🤖 LLM CALL
# =====================

def call_llm(system_prompt, user_content):

    response = Generation.call(
        api_key=API_KEY,
        model="qwen-max",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content}
        ],
        result_format="message"
    )

    if response.status_code != 200:
        print("❌ LLM failed")
        return None

    return response.output.choices[0].message.content


# =====================
# 🧠 Prompt
# =====================

GENERATOR_PROMPT = """
You are a senior Solidity security engineer.

Your task is to convert an attack plan into a fully working Foundry test file.

STRICT REQUIREMENTS:

- Output ONLY Solidity code
- Must be a complete .t.sol file
- Must compile in Foundry
- Must use forge-std/Test.sol
- Must include setUp()
- Must include at least one testAttack function
- Must use vm.prank / vm.startPrank / vm.stopPrank
- Must include assertions (assertEq / assertTrue)

PROJECT CONTEXT:

Main contract:
- SentinelVault (Vault.sol)

Token contract:
- MyTokens (MyTokens.sol)

IMPORT RULES (STRICT):

import "forge-std/Test.sol";
import "../../src/Vault.sol";
import "../../src/MyTokens.sol";

DO NOT:
- use Hardhat syntax
- use ethers.js syntax
- create fake contracts
- output explanations
- output markdown

You MUST follow the attack plan exactly.
"""


# =====================
# 🚀 Generator Agent
# =====================

def generate_attack_test(attack_logic, vault_code, token_code):

    user_content = f"""
ATTACK PLAN:
{attack_logic}

VAULT SOURCE:
{vault_code}

TOKEN SOURCE:
{token_code}
"""

    return call_llm(GENERATOR_PROMPT, user_content)


# =====================
# 🚀 MAIN
# =====================

if __name__ == "__main__":

    print("🚀 Attack Test Generator Running...\n")

    # 1. load inputs
    attack_logic = load_file("./reports/attack_logic.txt")
    vault_code = load_file("./src/Vault.sol")
    token_code = load_file("./src/MyTokens.sol")

    # 2. generate test
    test_code = generate_attack_test(attack_logic, vault_code, token_code)

    if not test_code:
        print("❌ generation failed")
        exit(1)

    print("\n===== GENERATED TEST =====\n")
    print(test_code)

    # 3. save file
    file_id = uuid.uuid4().hex[:8]
    test_path = f"./test/AtkContract/attack_generated_{file_id}.t.sol"

    save_file(test_path, test_code)

    print(f"\n✅ saved to {test_path}")

    # 4. run forge
    print("\n🚀 running forge test...\n")

    result = subprocess.run(
        ["forge", "test", "--match-path", test_path],
        capture_output=True,
        text=True
    )

    print("\n===== FORGE STDOUT =====\n")
    print(result.stdout)

    print("\n===== FORGE STDERR =====\n")
    print(result.stderr)

    if result.returncode != 0:
        print("\n❌ TEST FAILED")
    else:
        print("\n✅ TEST PASSED")