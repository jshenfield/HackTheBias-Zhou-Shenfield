import json
from utils.path_helper import resource_path
from services.openai_client import run_openai_json_prompt

PROMPTS = {
    "partial": "prompts/remove_name_and_geo.txt",
    "full": "prompts/remove_all_bias.txt",
}

def remove_bias(text: str, mode: str) -> dict:
    prompt_path = resource_path(PROMPTS[mode])
    raw_output = run_openai_json_prompt(
        prompt_path.read_text(encoding="utf-8"),
        text,
    )

    return json.loads(raw_output)
