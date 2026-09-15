from fastapi import FastAPI  # type: ignore[import-not-found]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import-not-found]
from .routes import health, model, prediction
app = FastAPI(title="AgriSense AI")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5175", "http://127.0.0.1:5175", "http://192.168.1.7:5173", "http://192.168.1.7:5175","http://192.168.1.5:5175"], allow_methods=["*"], allow_headers=["*"])
app.include_router(health.router, prefix="/api")
app.include_router(model.router, prefix="/api")
app.include_router(prediction.router, prefix="/api")
