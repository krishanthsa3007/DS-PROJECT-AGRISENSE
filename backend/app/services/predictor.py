import pandas as pd
from .model_service import metadata, model
def predict(payload):
    info = metadata(); names = info["feature_names"]; classifier = model()
    frame = pd.DataFrame([[payload[n] for n in names]], columns=names)
    ranked = sorted(zip(classifier.classes_, classifier.predict_proba(frame)[0]), key=lambda x: x[1], reverse=True)[:3]
    return {"recommended_crop": str(ranked[0][0]), "confidence": float(ranked[0][1]), "top_predictions": [{"crop": str(c), "probability": float(p)} for c,p in ranked], "feature_importance": info.get("feature_importance", {}), "input": payload}
