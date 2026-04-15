
# JSON → JS 변환 스크립트
# secretary_posts_raw.json을 읽어 history_data.js의 총무 동정 섹션을 생성

$inputFile = "secretary_posts_raw.json"
$outputFile = "secretary_data_new.js"

if (-not (Test-Path $inputFile)) {
    Write-Host "ERROR: $inputFile not found"
    exit 1
}

$posts = Get-Content $inputFile -Raw -Encoding UTF8 | ConvertFrom-Json

# Filter only valid posts (ArrayList adds integer indices too, filter by type)
$validPosts = $posts | Where-Object { $_ -is [PSCustomObject] -and $null -ne $_.id -and $_.id -match '1681_\d+' }

Write-Host "Valid posts: $($validPosts.Count)"

# Sort by date descending
$sorted = $validPosts | Sort-Object { $_.date } -Descending

# Build JS array entries
$jsEntries = @()
foreach ($post in $sorted) {
    # Escape content for JSON
    $safeContent = $post.content -replace '\\', '\\\\' -replace '"', '\"' -replace "`r`n", '\n' -replace "`n", '\n' -replace "`r", '\n'
    $safeTitle = $post.title -replace '\\', '\\\\' -replace '"', '\"'
    $safeAuthor = ($post.author ?? "김창주") -replace '\\', '\\\\' -replace '"', '\"'
    
    $entry = @"
  {
    "id": "$($post.id)",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "$safeTitle",
    "author": "$safeAuthor",
    "date": "$($post.date)",
    "url": "$($post.url)",
    "content": "$safeContent"
  }
"@
    $jsEntries += $entry
}

$jsContent = "[`n" + ($jsEntries -join ",`n") + "`n];"
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $outputFile), $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "Written $($sorted.Count) posts to $outputFile"
