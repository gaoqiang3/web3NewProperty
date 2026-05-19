import os
import json
import subprocess
from dotenv import load_dotenv
from dashscope import Generation

load_dotenv()

API_KEY = os.getenv("DASHSCOPE_API_KEY")


# =====================
# 📂 Utils
# =====================

def load_contract(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def load_prompt(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def save_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def write_file(path, content):
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
# 🧠 Analyzer
# =====================

def analyze_contract(contract_code):

    prompt = load_prompt("./AgnoAi/analyzer_prompt.txt")

    result = call_llm(prompt, contract_code)

    if not result:
        return None

    try:
        return json.loads(result)
    except:
        return None


# =====================
# 💥 Attack Agent
# =====================

def attack_agent(analyzer_result, vault_code, token_code):

    prompt = load_prompt("./AgnoAi/Attack_Agent_Prompt.txt")

    user_content = f"""
Security Analysis:
{json.dumps(analyzer_result, ensure_ascii=False)}

Vault:
{vault_code}

Token:
{token_code}
"""

    return call_llm(prompt, user_content)


# =====================
# 🚀 MAIN
# =====================

if __name__ == "__main__":

    print("🚀 Running pipeline...\n")

    vault_code = load_contract("./src/Vault.sol")
    token_code = load_contract("./src/MyTokens.sol")

    # 1. analyze
    analysis = analyze_contract(vault_code)

    if not analysis:
        print("❌ analyze failed")
        exit(1)

    print("✅ analysis done")

    # 2. attack logic
    attack_logic = attack_agent(analysis, vault_code, token_code)

    if not attack_logic:
        print("❌ attack generation failed")
        exit(1)

    print("\n===== ATTACK LOGIC =====\n")
    print(attack_logic)

    # 3. save only (optional)
    save_file("./reports/attack_logic.txt", attack_logic)

    print("\n✅ DONE")