@echo off
echo ====================================
echo StudyFlow PWA Certificate Generator
echo ====================================
echo.

REM Check if OpenSSL is available
where openssl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo OpenSSL not found. Please install OpenSSL first.
    echo Download from: https://slproweb.com/products/Win32OpenSSL.html
    echo.
    pause
    exit /b 1
)

echo Generating private key...
openssl genrsa -out studyflow-key.pem 2048

echo Generating certificate signing request...
openssl req -new -key studyflow-key.pem -out studyflow-csr.pem -subj "/C=US/ST=CA/L=San Francisco/O=StudyFlow/OU=Development/CN=studyflow.app"

echo Generating self-signed certificate...
openssl x509 -req -days 365 -in studyflow-csr.pem -signkey studyflow-key.pem -out studyflow-cert.pem

echo Cleaning up temporary files...
del studyflow-csr.pem

echo.
echo ====================================
echo Certificates generated successfully!
echo ====================================
echo Files created:
echo - studyflow-cert.pem (Certificate)
echo - studyflow-key.pem (Private Key)
echo.
echo IMPORTANT SECURITY NOTES:
echo 1. Keep studyflow-key.pem PRIVATE and secure
echo 2. Add *.pem to .gitignore to avoid committing keys
echo 3. For production, use a proper CA-signed certificate
echo.
pause
