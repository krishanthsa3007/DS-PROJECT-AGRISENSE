@echo off
cd /d "%~dp0backend"
python train_model.py
uvicorn app.main:app --host 0.0.0.0 --port 8000
