param(
  [string]$TaskName = "MinguoRetouchWorker",
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Script = Join-Path $Root "scripts\start-worker.ps1"
$Argument = "-NoProfile -ExecutionPolicy Bypass -File `"$Script`" -Port $Port -Background"

$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $Argument
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Local AI retouch worker for Minguo Fashion mini program" -Force
Write-Host "Registered startup task: $TaskName"
