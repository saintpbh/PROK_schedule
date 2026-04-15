
# ============================================================
# PROK 총무 동정 전체 게시물 크롤러
# board_id=1681, 112 pages
# ============================================================

$boardId = 1681
$totalPages = 112
$outputFile = "secretary_posts_raw.json"
$logFile = "crawl_log.txt"
$delay = 600  # ms between requests

$allPosts = @()
$existingIds = @{}

# Load existing posts if any (resume capability)
if (Test-Path $outputFile) {
    $existing = Get-Content $outputFile -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($p in $existing) { $existingIds[$p.id] = $true }
    $allPosts = [System.Collections.ArrayList]($existing)
    Write-Host "Resuming: $($allPosts.Count) posts already collected"
} else {
    $allPosts = [System.Collections.ArrayList]@()
}

function Get-PostIds($pageNum) {
    $url = "https://www.prok.org/Board/Index/$boardId`?page=$pageNum"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
        $html = $resp.Content
        # Extract post IDs from links like /Board/Detail/1681/123456
        $pattern = '/Board/Detail/' + $boardId + '/(\d+)'
        $matches = [regex]::Matches($html, $pattern)
        $ids = ($matches | ForEach-Object { $_.Groups[1].Value }) | Select-Object -Unique
        return $ids
    } catch {
        Add-Content $logFile "PAGE $pageNum ERROR: $_"
        return @()
    }
}

function Get-PostData($postId) {
    $url = "https://www.prok.org/Board/Detail/$boardId/$postId"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
        $html = $resp.Content

        # Extract title
        $titleMatch = [regex]::Match($html, '<h2[^>]*class="[^"]*subject[^"]*"[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if (-not $titleMatch.Success) {
            $titleMatch = [regex]::Match($html, '<h2[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        }
        $title = if ($titleMatch.Success) { [regex]::Replace($titleMatch.Groups[1].Value.Trim(), '<[^>]+>', '') } else { "제목없음" }

        # Extract date
        $dateMatch = [regex]::Match($html, '(\d{4}-\d{2}-\d{2})')
        $date = if ($dateMatch.Success) { $dateMatch.Groups[1].Value } else { "2000-01-01" }

        # Extract author from board info area
        $authorMatch = [regex]::Match($html, '작성자[^>]*>[^<]*<[^>]+>([^<]+)<', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if (-not $authorMatch.Success) {
            $authorMatch = [regex]::Match($html, '김창주')
        }
        $author = if ($authorMatch.Success -and $authorMatch.Groups.Count -gt 1) { $authorMatch.Groups[1].Value.Trim() } else { "김창주" }

        # Extract content images (dimode CDN only)
        $imgPattern = 'src="([^"]+(?:dimode|UserData/prok)[^"]+\.(?:jpg|jpeg|png|gif))"'
        $imgMatches = [regex]::Matches($html, $imgPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        $imgs = ($imgMatches | ForEach-Object { $_.Groups[1].Value }) | Where-Object { $_ -notmatch 'Layout|gnb_sub|youtube|family_site' } | Select-Object -Unique

        # Extract main text content from detail-content div
        $contentMatch = [regex]::Match($html, '<div[^>]*class="[^"]*detail[^"]*content[^"]*"[^>]*>(.*?)</div>\s*(?:</div>|<div class="board)', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $rawContent = if ($contentMatch.Success) { $contentMatch.Groups[1].Value } else { "" }

        # Strip hwp json noise
        $cleanContent = [regex]::Replace($rawContent, '<!--\[data-hwpjson\].*?-->', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $cleanContent = [regex]::Replace($cleanContent, '<div class="hwp_editor_board_content"[^>]*>.*?</div>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)

        # Build final content HTML
        $imgHtml = ""
        foreach ($img in $imgs) {
            $imgHtml += '<p class="each-img"><img src="' + $img + '" style="max-width:100%" /></p>'
        }

        # Extract plain text paragraphs from content
        $textParas = [regex]::Matches($cleanContent, '<p[^>]*>(.*?)</p>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $textContent = ""
        foreach ($para in $textParas) {
            $paraText = [regex]::Replace($para.Groups[1].Value, '<[^>]+>', '').Trim()
            if ($paraText.Length -gt 3) {
                $textContent += '<p>' + [System.Net.WebUtility]::HtmlEncode($paraText).Replace('&amp;', '&') + '</p>'
            }
        }
        if ($textContent -eq "" -and $rawContent.Length -gt 10) {
            $rawText = [regex]::Replace($rawContent, '<[^>]+>', ' ').Trim()
            $rawText = [regex]::Replace($rawText, '\s+', ' ').Trim()
            if ($rawText.Length -gt 10) {
                $textContent = '<p>' + $rawText.Substring(0, [Math]::Min($rawText.Length, 500)) + '</p>'
            }
        }

        $finalContent = '<div class="detail-content">' + $textContent + $imgHtml + '</div>'

        return @{
            id = "1681_$postId"
            board_id = "1681"
            dept = "총무 동정"
            title = $title
            author = $author
            date = $date
            url = $url
            content = $finalContent
        }
    } catch {
        Add-Content $logFile "POST $postId ERROR: $_"
        return $null
    }
}

# ── Main Loop ──────────────────────────────────────────────
$processedIds = [System.Collections.Generic.HashSet[string]]@()
foreach ($p in $allPosts) { $processedIds.Add($p.id) | Out-Null }

for ($page = 1; $page -le $totalPages; $page++) {
    Write-Host "── Page $page / $totalPages ──────────────────"
    $ids = Get-PostIds $page

    if ($ids.Count -eq 0) {
        Write-Host "  No posts found on page $page, skipping"
        Start-Sleep -Milliseconds $delay
        continue
    }

    foreach ($postId in $ids) {
        $key = "1681_$postId"
        if ($processedIds.Contains($key)) {
            Write-Host "  SKIP $postId (already collected)"
            continue
        }

        Write-Host "  Fetching post $postId..."
        $post = Get-PostData $postId

        if ($post -ne $null) {
            $allPosts.Add([PSCustomObject]$post) | Out-Null
            $processedIds.Add($key) | Out-Null
            Write-Host "    OK: $($post.title.Substring(0, [Math]::Min(40, $post.title.Length)))"
        }

        Start-Sleep -Milliseconds $delay
    }

    # Save checkpoint after each page
    $allPosts | ConvertTo-Json -Depth 5 | Set-Content $outputFile -Encoding UTF8
    Write-Host "  Checkpoint: $($allPosts.Count) posts saved"
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "========================================"
Write-Host "DONE. Total posts collected: $($allPosts.Count)"
Write-Host "Saved to: $outputFile"
Write-Host "========================================"
