from fastapi import APIRouter, HTTPException
from ..schemas.prediction import PredictionInput
from ..services.predictor import predict
router = APIRouter()
@router.post("/predict")
def make_prediction(payload: PredictionInput):
    try: return predict(payload.model_dump())
    except RuntimeError as e: raise HTTPException(503, str(e))
