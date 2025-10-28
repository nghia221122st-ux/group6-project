@echo off
echo ========================================
echo   STARTING FRONTEND SERVER
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting React app...
echo Frontend will open at: http://localhost:3001
echo.
call npm start

pause

