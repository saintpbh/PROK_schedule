
# Node.js로 JS 파일의 문법 유효성 검사
$content = [System.IO.File]::ReadAllText("history_data.js", [System.Text.Encoding]::UTF8)

# Extract the JSON array part (strip "window.HISTORY_DATA = " prefix and trailing ";")
$jsonPart = $content.TrimStart()
if ($jsonPart.StartsWith("window.HISTORY_DATA = ")) {
    $jsonPart = $jsonPart.Substring("window.HISTORY_DATA = ".Length)
}
$jsonPart = $jsonPart.TrimEnd("`r", "`n", " ", ";")

# Try to parse as JSON
try {
    $data = $jsonPart | ConvertFrom-Json
    Write-Host "JSON is VALID. Total items: $($data.Count)"
    
    # Show first 3 and last 3
    Write-Host "`nFirst 3:"
    $data | Select-Object -First 3 | ForEach-Object {
        Write-Host "  [$($_.id)] $($_.date) $($_.title.Substring(0, [Math]::Min($_.title.Length, 50)))"
    }
    Write-Host "`nLast 3:"
    $data | Select-Object -Last 3 | ForEach-Object {
        Write-Host "  [$($_.id)] $($_.date) $($_.title.Substring(0, [Math]::Min($_.title.Length, 50)))"
    }
    
    # Check for dept values
    $depts = $data | Group-Object dept | Select-Object Name, Count
    Write-Host "`nCategories:"
    $depts | ForEach-Object { Write-Host "  $($_.Name): $($_.Count)" }
    
} catch {
    Write-Host "JSON PARSE ERROR: $_"
    # Show where the error is
    $errMsg = $_.Exception.Message
    Write-Host $errMsg
}
