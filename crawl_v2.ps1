
# ============================================================
# PROK 총무 동정 전체 크롤러 v2 - NDJSON 스트리밍 방식
# board_id=1681, 페이지마다 즉시 파일에 저장
# ============================================================

$boardId = 1681
$totalPages = 112
$outputFile = "secretary_posts_ndjson.txt"
$logFile = "crawl_log_v2.txt"
$delay = 600  # ms

# Load already-collected IDs
$processedIds = [System.Collections.Generic.HashSet[string]]::new()
if (Test-Path $outputFile) {
    Get-Content $outputFile -Encoding UTF8 | ForEach-Object {
        try {
            $obj = $_ | ConvertFrom-Json
            if ($obj.id) { $processedIds.Add($obj.id) | Out-Null }
        } catch {}
    }
    Write-Host "Resuming: $($processedIds.Count) posts already saved"
} else {
    Write-Host "Starting fresh crawl"
}

function Get-CleanText($html) {
    $text = [regex]::Replace($html, '<[^>]+>', ' ')
    $text = [System.Net.WebUtility]::HtmlDecode($text)
    $text = [regex]::Replace($text, '\s+', ' ').Trim()
    return $text
}

function Get-PostIds($pageNum) {
    $url = "https://www.prok.org/Board/Index/$boardId`?page=$pageNum"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
        $html = $resp.Content
        $pattern = '/Board/Detail/' + $boardId + '/(\d+)'
        $m = [regex]::Matches($html, $pattern)
        return ($m | ForEach-Object { $_.Groups[1].Value }) | Select-Object -Unique
    } catch {
        "$([DateTime]::Now) PAGE $pageNum ERROR: $_" | Add-Content $logFile
        return @()
    }
}

function Get-PostData($postId) {
    $url = "https://www.prok.org/Board/Detail/$boardId/$postId"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
        $html = $resp.Content

        # Title: get page <title> tag, remove site name
        $pageTitleMatch = [regex]::Match($html, '<title>([^<]+)</title>')
        $siteTitle = if ($pageTitleMatch.Success) {
            $pageTitleMatch.Groups[1].Value -replace '\s*-\s*한국기독교장로회총회.*$', '' -replace '\s*-\s*PROK.*$', ''
        } else { "제목없음" }
        $title = $siteTitle.Trim()

        # Date: first date-like pattern
        $dateMatch = [regex]::Match($html, '(\d{4}-\d{2}-\d{2})')
        $date = if ($dateMatch.Success) { $dateMatch.Groups[1].Value } else { "2000-01-01" }

        # Images from CDN
        $imgPattern = 'src="([^"]+(?:dimode|UserData/prok)[^"]+\.(?:jpg|jpeg|png|gif))"'
        $imgMatches = [regex]::Matches($html, $imgPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        $imgs = ($imgMatches | ForEach-Object { $_.Groups[1].Value }) |
                Where-Object { $_ -notmatch 'Layout|gnb_sub|youtube|family_site|10\.youtube' } |
                Select-Object -Unique

        # Content: extract text from paragraphs in main area
        $contentAreaMatch = [regex]::Match($html, '(?s)<div[^>]+class="[^"]*detail[^"]*"[^>]*>(.*?)(?=<div[^>]+class="[^"]*(?:board-view-btn|comment|reply)[^"]*")', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $rawArea = if ($contentAreaMatch.Success) { $contentAreaMatch.Groups[1].Value } else { "" }

        # Remove HWP json blocks
        $rawArea = [regex]::Replace($rawArea, '(?s)<!--\[data-hwpjson\].*?-->', '')
        $rawArea = [regex]::Replace($rawArea, '(?s)<div[^>]+hwp_editor[^>]*>.*?</div>', '')

        # Extract paragraphs
        $paraMatches = [regex]::Matches($rawArea, '(?s)<p[^>]*>(.*?)</p>')
        $textParts = @()
        foreach ($pm in $paraMatches) {
            $t = Get-CleanText($pm.Groups[1].Value)
            if ($t.Length -gt 3) { $textParts += '<p>' + [System.Net.WebUtility]::HtmlEncode($t).Replace('&amp;', '&').Replace('&lt;', '<').Replace('&gt;', '>') + '</p>' }
        }
        $textHtml = $textParts -join ''

        # Image HTML
        $imgHtml = ($imgs | ForEach-Object { '<p class="each-img"><img src="' + $_ + '" style="max-width:100%" /></p>' }) -join ''

        $finalContent = '<div class=\"detail-content\">' + ($textHtml -replace '"', '\"') + $imgHtml + '</div>'

        # Build compact JSON line
        $safeTitle = $title -replace '\\', '\\\\' -replace '"', '\"' -replace '[\r\n]', ' '
        $obj = '{"id":"1681_' + $postId + '","board_id":"1681","dept":"총무 동정","title":"' + $safeTitle + '","author":"김창주","date":"' + $date + '","url":"' + $url + '","content":"' + $finalContent + '"}'
        return $obj
    } catch {
        "$([DateTime]::Now) POST $postId ERROR: $_" | Add-Content $logFile
        return $null
    }
}

# ── Main ──────────────────────────────────────────────────
for ($page = 1; $page -le $totalPages; $page++) {
    Write-Host "Page $page / $totalPages (collected: $($processedIds.Count))"
    $ids = Get-PostIds $page

    if ($ids.Count -eq 0) {
        Write-Host "  No IDs found, skipping page $page"
        Start-Sleep -Milliseconds $delay
        continue
    }

    foreach ($postId in $ids) {
        $key = "1681_$postId"
        if ($processedIds.Contains($key)) {
            Write-Host "  SKIP $postId"
            continue
        }

        Write-Host "  → $postId"
        $line = Get-PostData $postId

        if ($line -ne $null) {
            # Append single JSON line to file
            Add-Content -Path $outputFile -Value $line -Encoding UTF8
            $processedIds.Add($key) | Out-Null
        }

        Start-Sleep -Milliseconds $delay
    }
}

Write-Host ""
Write-Host "========================================"
Write-Host "DONE. Total posts: $($processedIds.Count)"
Write-Host "========================================"
