$posts = @(166852, 166849, 166847, 166845, 166842, 166838, 166836, 166835, 166831, 166829, 166828, 166827, 166826, 166824, 166815)

foreach ($postId in $posts) {
    $url = "https://www.prok.org/Board/Detail/1681/$postId"
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
        $html = $response.Content
        
        # Find img srcs with data.dimode pattern
        $pattern = 'src="([^"]+(?:jpg|jpeg|png|gif)[^"]*)"'
        $matches = [regex]::Matches($html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        $filtered = $matches | Where-Object { $_.Groups[1].Value -match 'dimode|UserData|prok/files' }
        
        if ($filtered.Count -gt 0) {
            $imgs = ($filtered | ForEach-Object { $_.Groups[1].Value.Trim() }) | Select-Object -Unique
            $imgStr = $imgs -join "`n  "
            Write-Host "POST $postId IMAGES:"
            Write-Host "  $imgStr"
        } else {
            Write-Host "POST $postId : no dimode images found"
        }
    } catch {
        Write-Host "POST $postId : ERROR - $($_.Exception.Message)"
    }
    Start-Sleep -Milliseconds 800
}
