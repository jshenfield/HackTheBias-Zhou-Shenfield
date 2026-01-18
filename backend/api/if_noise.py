# api/if_noise.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from services.pdf_text import extract_text_from_pdf
from services.resume_classifier import classifier

router = APIRouter()

@router.post("/if-noise")
async def if_noise(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    pdf_bytes = await file.read()

    # 1️⃣ Extract text
    text = extract_text_from_pdf(pdf_bytes)

    # 2️⃣ Classify
    is_resume = classifier.predict(text)

    return {
        "isResume": is_resume,
        "text": text
    }
