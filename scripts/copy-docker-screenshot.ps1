# Copy latest firefox-launch-parameters screenshot from cypress screenshots to docs
param()
try {
    $screens = Get-ChildItem -Path (Join-Path $PSScriptRoot "..\cypress\screenshots") -Recurse -Filter "*firefox-launch-parameters*.png" -ErrorAction SilentlyContinue
    if (-not $screens) {
        Write-Error "No firefox-launch-parameters screenshot found under cypress/screenshots"
        exit 1
    }
    $latest = $screens | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    $destDir = Join-Path $PSScriptRoot "..\docs"
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
    $dest = Join-Path $destDir "firefox-launch-parameters.png"
    Copy-Item -Path $latest.FullName -Destination $dest -Force
    Write-Output "Copied $($latest.FullName) -> $dest"
    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 2
}
