@echo off
SETLOCAL

REM --- Configuration ---
SET APP_NAME=Cloud_Capstone_Frontend
SET IMAGE_NAME=bsavanth/cloud-capstone-frontend-image
SET CONTAINER_NAME=cloud-capstone-frontend-container-local
SET HOST_PORT=4200
SET CONTAINER_PORT=80

REM --- Stage 1: Angular Build ---
echo [1/3] Building Angular project...
call ng build --configuration production

IF ERRORLEVEL 1 (
    echo Angular build failed. Exiting.
    exit /b 1
)

REM --- Stage 2: Build Docker Image ---
echo [2/3] Building Docker image...
docker build -t %IMAGE_NAME% .

IF ERRORLEVEL 1 (
    echo Docker build failed. Exiting.
    exit /b 1
)

REM --- Stage 3: Run Docker Container ---
echo [3/3] Running Docker container...

REM Stop and remove any existing container with the same name
docker stop %CONTAINER_NAME% >nul 2>&1
docker rm %CONTAINER_NAME% >nul 2>&1

@REM docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%

@REM IF ERRORLEVEL 1 (
@REM     echo Failed to run Docker container.
@REM     exit /b 1
@REM )

@REM echo Container is running. Access it at http://localhost:%HOST_PORT%

ENDLOCAL
pause
