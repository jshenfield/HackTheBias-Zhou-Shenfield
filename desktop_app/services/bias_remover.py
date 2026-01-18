import json
from pathlib import Path
from services.openai_client import run_openai_json_prompt

PROMPTS = {
    "partial": "prompts/remove_name_and_geo.txt",
    "full": "prompts/remove_all_bias.txt",
}

def remove_bias(text: str, mode: str) -> dict:
    prompt = Path(PROMPTS[mode]).read_text(encoding="utf-8")

    raw_output = run_openai_json_prompt(prompt, text)

    try:
        return json.loads(raw_output)
    except json.JSONDecodeError:
        raise RuntimeError("LLM did not return valid JSON")
