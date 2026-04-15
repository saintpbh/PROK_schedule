
$lines = Get-Content "history_data.js" -Encoding UTF8
$total = $lines.Count
Write-Host "Total lines: $total"
$lines | Select-Object -First 5

$deptLines = $lines | Select-String -Pattern "dept"
$depts = @{}
foreach ($dl in $deptLines) {
    if ($dl.Line -match '"dept":\s*"([^"]+)"') {
        $depts[$Matches[1]] = ($depts[$Matches[1]] ?? 0) + 1
    }
}
Write-Host "Departments found:"
$depts.GetEnumerator() | ForEach-Object { Write-Host "  $($_.Key): $($_.Value)" }
