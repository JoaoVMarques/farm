$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

$frontEndPath = Join-Path $scriptPath "front-end"
$backEndPath  = Join-Path $scriptPath "back-end"
$venvPython   = Join-Path $backEndPath ".venv\Scripts\python.exe"

# Front-end
Start-Process `
  -NoNewWindow `
  -WorkingDirectory $frontEndPath `
  -FilePath "powershell" `
  -ArgumentList "-NoExit", "-Command npm run dev"

Start-Sleep -Seconds 2

# Back-end
Start-Process `
  -NoNewWindow `
  -WorkingDirectory $backEndPath `
  -FilePath "powershell" `
  -ArgumentList "-NoExit", "-Command `"$venvPython -m server`""
