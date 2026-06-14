param(
  [int]$Port = 8080,
  [string]$HostAddress = "0.0.0.0",
  [switch]$Background,
  [string]$VenvPath = ""
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Root

if (!$VenvPath) {
  $VenvPath = Join-Path $env:LOCALAPPDATA "MinguoRetouchWorker\.venv"
}
$VenvPath = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($VenvPath)
$Python = Join-Path $VenvPath "Scripts\python.exe"
if (!(Test-Path $Python)) {
  throw "Virtual environment not found. Run scripts\setup-windows.ps1 first."
}

if (!(Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
}

if ($Background) {
  New-Item -ItemType Directory -Force "logs" | Out-Null
  $OutLog = Join-Path $Root "logs\worker.log"
  $ErrLog = Join-Path $Root "logs\worker.err.log"
  $Arguments = @("-m", "uvicorn", "app.main:app", "--host", $HostAddress, "--port", "$Port")
  $Process = Start-Process -FilePath $Python -ArgumentList $Arguments -WorkingDirectory $Root -WindowStyle Hidden -RedirectStandardOutput $OutLog -RedirectStandardError $ErrLog -PassThru
  Write-Host "Worker started. PID=$($Process.Id), URL=http://127.0.0.1:$Port"
  Write-Host "Logs: $OutLog"
  exit 0
}

& $Python -m uvicorn app.main:app --host $HostAddress --port $Port
