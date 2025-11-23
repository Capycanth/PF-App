@echo off
set CMD=%1

if "%CMD%"=="s" goto start
if "%CMD%"=="k" goto kill
if "%CMD%"=="load" goto load
if "%CMD%"=="drop" goto drop

echo Usage:
echo   f.bat s       ^> start Angular and DB server
echo   f.bat k       ^> kill Angular and DB server
echo   f.bat load    ^> load test data into SQLite
goto end

:start
echo Starting Angular and DB server...

:: Start Angular
start "" cmd /c "ng serve"

:: Start Database
start "" cmd /c "npx tsx srcDB/main.ts"

echo Both services started.
goto end

:kill
echo Killing Angular and DB processes...

REM Kill Angular (4200)
for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":4200"') do (
    taskkill /PID %%A /T /F >nul 2>&1
)

REM Kill Database (3000)
for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":3000"') do (
    taskkill /PID %%A /T /F >nul 2>&1
)

echo Processes killed.
goto end

:load
echo Running test data loader...
npx tsx srcDB/loadData.ts
echo Test data loading.
goto end

:drop
echo Dropping all data from database...
npx tsx srcDB/dropData.ts
echo All data dropped.
goto end

:end
