from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import json

from services.openai_client import run_openai_json_prompt

router = APIRouter()

PROMPT_PATH = Path("prompts/remove_all_bias.txt")


class RemoveAllBiasRequest(BaseModel):
    text: str


@router.post("/remove-all-bias")
async def remove_all_bias(payload: RemoveAllBiasRequest):
    if not payload.text or not payload.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text cannot be empty"
        )

    if not PROMPT_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail="Prompt file not found"
        )

    system_prompt = PROMPT_PATH.read_text(encoding="utf-8")

    raw_output = run_openai_json_prompt(
        system_prompt=system_prompt,
        resume_text=payload.text
    )

    try:
        parsed = json.loads(raw_output)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="LLM did not return valid JSON"
        )

    # Minimal schema validation
    required_keys = {
        "Education",
        "WorkExperience",
        "Skills",
        "Certifications",
        "YearsOfExperience",
    }

    if not required_keys.issubset(parsed.keys()):
        raise HTTPException(
            status_code=500,
            detail="Invalid bias-free summary schema"
        )

    return parsed
