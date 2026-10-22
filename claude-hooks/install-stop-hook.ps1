# Adds a Stop hook to ~/.claude/settings.json that plays tada.wav when Claude finishes.
# Existing settings are preserved; a backup is written next to the file.

$settingsPath = Join-Path $env:USERPROFILE '.claude\settings.json'
$command = "powershell.exe -NoProfile -Command `"(New-Object Media.SoundPlayer 'C:\Windows\Media\tada.wav').PlaySync()`""

if (Test-Path $settingsPath) {
    Copy-Item $settingsPath "$settingsPath.bak" -Force
    $raw = Get-Content $settingsPath -Raw
    $settings = if ($raw.Trim()) { $raw | ConvertFrom-Json } else { [pscustomobject]@{} }
} else {
    New-Item -ItemType Directory -Path (Split-Path $settingsPath) -Force | Out-Null
    $settings = [pscustomobject]@{}
}

if (-not $settings.PSObject.Properties['hooks']) {
    $settings | Add-Member -NotePropertyName hooks -NotePropertyValue ([pscustomobject]@{})
}
if (-not $settings.hooks.PSObject.Properties['Stop']) {
    $settings.hooks | Add-Member -NotePropertyName Stop -NotePropertyValue @()
}

$already = @($settings.hooks.Stop | ForEach-Object { $_.hooks } | Where-Object { $_.command -eq $command })
if ($already.Count -gt 0) {
    Write-Host 'Stop hook already present, nothing to do.'
    return
}

$entry = [pscustomobject]@{
    hooks = @([pscustomobject]@{ type = 'command'; command = $command })
}
$settings.hooks.Stop = @($settings.hooks.Stop) + $entry

$json = $settings | ConvertTo-Json -Depth 32
[IO.File]::WriteAllText($settingsPath, $json, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Stop hook added to $settingsPath (backup: $settingsPath.bak)"
