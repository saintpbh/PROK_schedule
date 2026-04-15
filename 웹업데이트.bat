@echo off
chcp 65001 >nul
setlocal

echo ══════════════════════════════════════
echo   총회일정 웹 업데이트 (커밋 + 배포)
echo ══════════════════════════════════════
echo.

:: 현재 시각 생성 (커밋 메시지용)
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set D=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set T=%%a:%%b
set MSG=웹 업데이트 %D% %T%

:: 1단계: Git 커밋
echo [1/2] Git 커밋 중...
git add -A
git commit -m "%MSG%"
if errorlevel 1 (
    echo     ※ 변경사항 없음 (커밋 건너뜀)
) else (
    echo     ✔ 커밋 완료: %MSG%
)

:: 2단계: Git Push
echo.
echo [1.5/2] Git Push 중...
git push
if errorlevel 1 (
    echo     ✖ Push 실패. 네트워크를 확인하세요.
) else (
    echo     ✔ Push 완료
)

:: 3단계: Firebase 배포
echo.
echo [2/2] Firebase 배포 중...
call firebase deploy --only hosting
if errorlevel 1 (
    echo     ✖ 배포 실패. firebase login 상태를 확인하세요.
) else (
    echo     ✔ 배포 완료!
)

echo.
echo ══════════════════════════════════════
echo   모든 작업 완료!
echo ══════════════════════════════════════
pause
