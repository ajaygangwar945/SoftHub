@echo off
echo Creating .env file...
echo.

if exist .env (
    echo .env file already exists!
    echo.
    echo Current contents:
    type .env
    echo.
    set /p overwrite="Do you want to overwrite it? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo Cancelled.
        pause
        exit /b
    )
)

(
echo # MongoDB Connection String
echo # For local MongoDB on your laptop
echo MONGODB_URI=mongodb://localhost:27017/softhub
echo.
echo # Server Port
echo PORT=5000
echo.
echo # Email Configuration ^(Gmail^)
echo # For Gmail, you need to use an App Password: https://support.google.com/accounts/answer/185833
echo # Leave these empty if you don't want to test email functionality yet
echo EMAIL_USER=
echo EMAIL_PASS=
) > .env

echo.
echo ✅ .env file created successfully!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Run: node test-connection.js
echo 3. Run: npm start
echo.
pause

