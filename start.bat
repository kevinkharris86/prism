@echo off
cd /d "%~dp0"
start "" http://localhost:8100
node server.js
pause
