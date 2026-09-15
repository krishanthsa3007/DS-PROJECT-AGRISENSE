# API

`POST /api/predict` accepts numeric `N`, `P`, `K`, `temperature`, `humidity`, `ph`, and `rainfall`. Pydantic rejects invalid ranges. The response contains the model’s recommended class, `predict_proba()` confidence, top three class probabilities, submitted input, and stored feature importance.
