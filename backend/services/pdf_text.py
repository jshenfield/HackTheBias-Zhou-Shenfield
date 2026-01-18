# services/pdf_text.py

import io
import pdfplumber

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    text_chunks = []

    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_chunks.append(page_text)

    return "\n".join(text_chunks)
