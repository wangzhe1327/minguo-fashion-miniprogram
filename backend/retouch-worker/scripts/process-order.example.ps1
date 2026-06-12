param(
  [Parameter(Mandatory = $true)]
  [string]$OrderId,
  [Parameter(Mandatory = $true)]
  [string]$AdminToken,
  [string]$WorkerUrl = "",
  [string]$WorkerToken = ""
)

$ErrorActionPreference = "Stop"

Write-Host "Call the WeChat cloud function processRetouchOrder with this payload:"
@{
  orderId = $OrderId
  adminToken = $AdminToken
  workerUrl = $WorkerUrl
  workerToken = $WorkerToken
} | ConvertTo-Json -Depth 4
