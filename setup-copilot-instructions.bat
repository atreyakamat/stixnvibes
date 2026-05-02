@echo off
REM Setup Copilot Instructions Script
REM This script moves the copilot instructions to the correct location

echo Creating .github directory...
if not exist ".github" mkdir ".github"

echo Moving copilot instructions...
move ".github-copilot-instructions.md" ".github\copilot-instructions.md" > nul

if exist ".github\copilot-instructions.md" (
    echo.
    echo ✓ Successfully created .github\copilot-instructions.md
    echo ✓ File is ready for Copilot sessions
    echo.
) else (
    echo Error: File move failed
    exit /b 1
)

REM Optional: clean up this script after success
echo Cleaning up setup files...
del setup-copilot-instructions.js > nul 2>&1
del SETUP_INSTRUCTIONS.md > nul 2>&1

echo.
echo ✓ Setup complete!
pause
