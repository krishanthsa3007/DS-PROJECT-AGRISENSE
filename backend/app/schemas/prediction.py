from pydantic import BaseModel, Field


class PredictionInput(BaseModel):
    N: float = Field(ge=0, le=300, description="Nitrogen content")
    P: float = Field(ge=0, le=300, description="Phosphorus content")
    K: float = Field(ge=0, le=300, description="Potassium content")
    temperature: float = Field(ge=-20, le=70)
    humidity: float = Field(ge=0, le=100)
    ph: float = Field(ge=0, le=14)
    rainfall: float = Field(ge=0, le=1000)
