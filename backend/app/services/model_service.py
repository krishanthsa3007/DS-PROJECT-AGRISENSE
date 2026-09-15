import json
from pathlib import Path
import joblib
BASE = Path(__file__).resolve().parents[2]
MODELS = BASE / "models"
def ensure_artifacts():
    if not (MODELS / "crop_model.joblib").exists(): raise RuntimeError("Model is not trained. Run `python train_model.py` from backend first.")
def model(): ensure_artifacts(); return joblib.load(MODELS / "crop_model.joblib")
def metadata(): ensure_artifacts(); return json.loads((MODELS / "model_metadata.json").read_text(encoding="utf-8"))
def comparison(): ensure_artifacts(); return json.loads((MODELS / "model_metrics.json").read_text(encoding="utf-8"))
