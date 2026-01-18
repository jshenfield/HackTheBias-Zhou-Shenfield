from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.if_noise import router as if_noise_router

app = FastAPI(title="HushHire API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(if_noise_router, prefix="/api")
