from fastapi import APIRouter, HTTPException
from ..services.model_service import comparison, metadata
router = APIRouter()
@router.get("/model-info")
def model_info():
    try: return metadata()
    except RuntimeError as e: raise HTTPException(503, str(e))
@router.get("/model-comparison")
def model_comparison():
    try: return comparison()
    except RuntimeError as e: raise HTTPException(503, str(e))
