param(
  [int]$Port = 8080,
  [switch]$Background
)

$ErrorActionPreference = "Stop"

$Cloudflared = (Get-Command cloudflared -ErrorAction SilentlyContinue).Source
if (!$Cloudflared) {
  $Cloudflared = Get-ChildItem -Path $env:LOCALAPPDATA -Recurse -Filter cloudflared.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}
if (!$Cloudflared) {
  throw "cloudflared not found. Install it from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/ or via winget install Cloudflare.cloudflared"
}

if ($Background) {
  $Root = Resolve-Path (Join-Path $PSScriptRoot "..")
  Set-Location $Root
  New-Item -ItemType Directory -Force "logs" | Out-Null
  $OutLog = Join-Path $Root "logs\tunnel.log"
  $ErrLog = Join-Path $Root "logs\tunnel.err.log"
  $Arguments = @("tunnel", "--url", "http://localhost:$Port")
  $Process = Start-Process -FilePath $Cloudflared -ArgumentList $Arguments -WorkingDirectory $Root -WindowStyle Hidden -RedirectStandardOutput $OutLog -RedirectStandardError $ErrLog -PassThru
  Write-Host "Tunnel started. PID=$($Process.Id)"
  Write-Host "Logs: $ErrLog"
  exit 0
}

& $Cloudflared tunnel --url "http://localhost:$Port"
