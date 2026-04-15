# 총회일정 웹 업데이트 (커밋 + 배포)
$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  총회일정 웹 업데이트 (커밋 + 배포)" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "web update $timestamp"

# 1. Git Commit
Write-Host "[1/3] Git 커밋..." -ForegroundColor Yellow
git add -A
$commitResult = git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  - 변경사항 없음 (커밋 건너뜀)" -ForegroundColor Gray
} else {
    Write-Host "  OK 커밋 완료: $commitMsg" -ForegroundColor Green
}

# 2. Git Push
Write-Host ""
Write-Host "[2/3] Git Push..." -ForegroundColor Yellow
git push 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  X Push 실패" -ForegroundColor Red
} else {
    Write-Host "  OK Push 완료" -ForegroundColor Green
}

# 3. Firebase Deploy
Write-Host ""
Write-Host "[3/3] Firebase 배포..." -ForegroundColor Yellow
firebase deploy --only hosting 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  X 배포 실패" -ForegroundColor Red
} else {
    Write-Host "  OK 배포 완료!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  모든 작업 완료!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
