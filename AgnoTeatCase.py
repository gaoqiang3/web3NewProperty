import os
import json
from dotenv import load_dotenv
from dashscope import Generation

load_dotenv()

API_KEY = os.getenv("DASHSCOPE_API_KEY")

def load_contract(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def save_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    if isinstance(content, (dict, list)):
        content = json.dumps(content, indent=2, ensure_ascii=False)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


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
        print("❌ LLM request failed")
        return None

    try:
        return response.output.choices[0].message.content
    except:
        return None

def test_plan_agent(system_context):
    """
    system_context:
    {
        "contracts": {
            "Vault": "...",
            "MyTokens": "..."
        }
    }
    """

    prompt = """
You are a senior Web3 QA engineer.

Your task is to design SYSTEM-LEVEL test cases for a smart contract system.

STRICT RULES:
- Output ONLY JSON
- No Solidity code
- No markdown
- No explanations

FOCUS:
1. cross-contract interaction (Vault ↔ Token)
2. access control
3. token approval & transfer flow
4. edge cases & revert conditions
5. state consistency

OUTPUT FORMAT:
{
  "test_cases": [
    {
      "name": "test_xxx",
      "type": "positive | negative | edge",
      "description": "what to test",
      "contracts_involved": ["Vault", "MyTokens"],
      "steps": ["step1", "step2"]
    }
  ]
}
"""

    user_content = json.dumps(system_context, ensure_ascii=False)

    response = call_llm(prompt, user_content)

    if not response:
        return None

    try:
        return json.loads(response)
    except Exception as e:
        print("❌ JSON parse failed:", e)
        print(response)
        return None



if __name__ == "__main__":

    vault_code = load_contract("./src/Vault.sol")
    token_code = load_contract("./src/MyTokens.sol")

    system_context = {
        "contracts": {
            "Vault": vault_code,
            "MyTokens": token_code
        }
    }

    test_plan = test_plan_agent(system_context)

    if not test_plan:
        print("❌ Test plan generation failed")
        exit(1)


    save_file("./test/TestCase/system_test_plan.json", test_plan)

    print("\n===== TEST PLAN =====\n")
    print(json.dumps(test_plan, indent=2, ensure_ascii=False))