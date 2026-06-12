param(
  [switch]$Gpu,
  [string]$PythonCommand = "py -3.11",
  [string]$TorchIndexUrl = "https://download.pytorch.org/whl/cu128"
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Root

function Invoke-Python {
  param([string[]]$Arguments)
  $parts = $PythonCommand.Split(" ", 2)
  $exe = $parts[0]
  $prefixArgs = @()
  if ($parts.Count -gt 1) {
    $prefixArgs = $parts[1].Split(" ")
  }
  & $exe @prefixArgs @Arguments
}

if (!(Test-Path ".venv")) {
  Invoke-Python @("-m", "venv", ".venv")
}

$Python = Join-Path $Root ".venv\Scripts\python.exe"
& $Python -m pip install --upgrade pip wheel setuptools

if ($Gpu) {
  & $Python -m pip install torch torchvision --index-url $TorchIndexUrl
  & $Python -m pip install -r requirements-gpu.txt
} else {
  & $Python -m pip install -r requirements.txt
}

if (!(Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env. Please edit RETOUCH_WORKER_TOKEN before production use."
}

Write-Host "Setup completed."
Write-Host "Start server: powershell -ExecutionPolicy Bypass -File scripts\start-worker.ps1"
