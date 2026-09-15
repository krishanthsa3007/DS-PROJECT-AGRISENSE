@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0frontend"
npm install
npm run dev -- --host 0.0.0.0
