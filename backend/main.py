from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.if_noise import router as if_noise_router
from api.remove_name_and_geo import router as remove_name_geo_router
from api.remove_all_bias import router as remove_all_bias_router

app = FastAPI(title="HushHire API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(if_noise_router, prefix="/api")
app.include_router(remove_name_geo_router, prefix="/api")
app.include_router(remove_all_bias_router, prefix="/api")