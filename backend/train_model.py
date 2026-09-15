"""Train, evaluate, and serialize AgriSense AI crop classifiers."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "Crop_recommendation.csv"
MODEL_DIR = BASE_DIR / "models"
FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
TARGET = "label"
RANDOM_STATE = 42


def load_and_validate() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError("Place the crop recommendation CSV inside backend/data/")
    df = pd.read_csv(DATA_PATH)
    missing_columns = set(FEATURES + [TARGET]) - set(df.columns)
    if missing_columns:
        raise ValueError(f"Dataset is missing required columns: {sorted(missing_columns)}")
    df = df[FEATURES + [TARGET]].copy()
    for column in FEATURES:
        df[column] = pd.to_numeric(df[column], errors="coerce")
    missing = int(df.isna().sum().sum())
    duplicates = int(df.duplicated().sum())
    if missing:
        df = df.dropna()
    if duplicates:
        df = df.drop_duplicates()
    if (df[FEATURES] < 0).any().any() or not df["ph"].between(0, 14).all():
        raise ValueError("Dataset contains invalid feature values.")
    if df[TARGET].nunique() < 2:
        raise ValueError("Dataset must contain at least two crop classes.")
    print("Dataset loaded successfully")
    print(f"Samples: {len(df)} | Features: {len(FEATURES)} | Classes: {df[TARGET].nunique()}")
    print(f"Missing values removed: {missing} | Duplicate rows removed: {duplicates}")
    print("Class distribution:\n", df[TARGET].value_counts().to_string())
    print("Feature ranges:\n", df[FEATURES].agg(["min", "max"]).to_string())
    return df


def metrics(y_true, y_pred) -> dict[str, float]:
    precision, recall, f1, _ = precision_recall_fscore_support(
        y_true, y_pred, average="weighted", zero_division=0
    )
    return {"accuracy": round(float(accuracy_score(y_true, y_pred)), 4), "precision": round(float(precision), 4), "recall": round(float(recall), 4), "f1_score": round(float(f1), 4)}


def main() -> None:
    df = load_and_validate()
    X, y = df[FEATURES], df[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE)
    models = {
        "Logistic Regression": Pipeline([("scaler", StandardScaler()), ("model", LogisticRegression(max_iter=3000, random_state=RANDOM_STATE))]),
        "Decision Tree": DecisionTreeClassifier(random_state=RANDOM_STATE),
        "Random Forest": RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE, n_jobs=-1),
        "K-Nearest Neighbors": Pipeline([("scaler", StandardScaler()), ("model", KNeighborsClassifier(n_neighbors=5))]),
    }
    trained, comparison = {}, {}
    for name, classifier in models.items():
        classifier.fit(X_train, y_train)
        trained[name] = classifier
        comparison[name] = metrics(y_test, classifier.predict(X_test))
    best_name = max(comparison, key=lambda key: comparison[key]["f1_score"])
    best_model = trained[best_name]
    estimator = best_model.named_steps["model"] if isinstance(best_model, Pipeline) else best_model
    importance = {}
    if hasattr(estimator, "feature_importances_"):
        importance = {feature: round(float(value), 6) for feature, value in zip(FEATURES, estimator.feature_importances_)}
    MODEL_DIR.mkdir(exist_ok=True)
    joblib.dump(best_model, MODEL_DIR / "crop_model.joblib")
    metadata = {
        "selected_model": best_name, **comparison[best_name], "feature_names": FEATURES,
        "crop_classes": sorted(y.unique().tolist()), "dataset_size": len(df), "training_samples": len(X_train),
        "testing_samples": len(X_test), "number_of_classes": int(y.nunique()), "random_state": RANDOM_STATE,
        "training_date": datetime.now(timezone.utc).isoformat(), "feature_importance": importance,
    }
    (MODEL_DIR / "model_metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    (MODEL_DIR / "model_metrics.json").write_text(json.dumps(comparison, indent=2), encoding="utf-8")
    print(f"Best model: {best_name} | F1: {comparison[best_name]['f1_score']}")


if __name__ == "__main__":
    main()
