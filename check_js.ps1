
$f = "history_data.js"
$size = (Get-Item $f).Length
$sizeMB = [math]::Round($size / 1MB, 2)
Write-Host "File size: $sizeMB MB"

$content = [System.IO.File]::ReadAllText((Resolve-Path $f).Path, [System.Text.Encoding]::UTF8)

$startStr = $content.Substring(0, 50)
Write-Host "Start: $startStr"

$endStr = $content.Substring([Math]::Max(0, $content.Length - 100))
Write-Host "End: $endStr"

# Count records
$recordMatches = [regex]::Matches($content, '"id":')
Write-Host "Total records: $($recordMatches.Count)"

# Check last bytes
$lastBracket = $content.LastIndexOf('];')
Write-Host "Last ]; at position: $lastBracket of $($content.Length)"

# Check for unmatched quotes or brackets near end
$last500 = $content.Substring([Math]::Max(0, $content.Length - 500))
Write-Host "Last 500 chars:"
Write-Host $last500
