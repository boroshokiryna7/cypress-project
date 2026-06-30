$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$logPath = Join-Path $projectRoot 'docker-wsl-setup.log'

Start-Transcript -Path $logPath -Append

Write-Host 'Enabling Windows Subsystem for Linux...'
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -All -NoRestart

Write-Host 'Enabling Virtual Machine Platform...'
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart

Write-Host 'Setting WSL default version to 2...'
wsl --set-default-version 2

Write-Host ''
Write-Host 'WSL2 features were enabled. Restart Windows if any step reported RestartNeeded=True.'

Stop-Transcript
