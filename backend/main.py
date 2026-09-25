import os
from backend.routers import health
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import challenge, detective

app = FastAPI(
    title="Spark School Backend",
    description="API for Spark School Prompt Challenge and Detective",
    version="1.0.0"
)

cors_origins_str = os.getenv("CORS_ORIGINS")
if cors_origins_str:
    origins = [origin.strip() for origin in cors_origins_str.split(",")]
else:
    origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health Check"])
app.include_router(challenge.router)
app.include_router(detective.router)
