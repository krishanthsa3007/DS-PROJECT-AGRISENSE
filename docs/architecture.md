# Architecture

React/Vite client → JSON HTTP → FastAPI routes → prediction service → serialized scikit-learn model.

The frontend reads `VITE_API_URL`; the backend exposes CORS for local development. Model artifacts are kept in `backend/models/` and the original dataset remains untouched under `backend/data/`.
