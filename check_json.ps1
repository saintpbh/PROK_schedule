
$f = "secretary_posts_raw.json"
if (Test-Path $f) {
    $raw = Get-Content $f -Raw -Encoding UTF8
    try {
        $c = $raw | ConvertFrom-Json
        Write-Host "Items: $($c.Count)"
        # Show last 3 items
        $c | Select-Object -Last 3 | ForEach-Object { Write-Host "  $($_.id): $($_.date) $($_.title)" }
    } catch {
        Write-Host "Parse error: $_"
        Write-Host "File size: $($raw.Length)"
    }
} else {
    Write-Host "File not found"
}
