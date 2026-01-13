$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

$frontEndPath = Join-Path $scriptPath "front-end"
$backEndPath  = Join-Path $scriptPath "back-end"
$venvPath     = Join-Path $backEndPath ".venv"
$venvPython   = Join-Path $venvPath "Scripts\python.exe"

Write-Host "Instalando dependencias do front-end (npm install)..."
Start-Process -NoNewWindow -Wait -WorkingDirectory $frontEndPath -FilePath "powershell" -ArgumentList "-Command npm install"

if (-not (Test-Path $venvPath)) {
    Write-Host ".venv nao encontrado. Criando ambiente virtual..."
    Start-Process -NoNewWindow -Wait -WorkingDirectory $backEndPath -FilePath "powershell" -ArgumentList "-Command python -m venv .venv"
} else {
    Write-Host ".venv ja existe. Pulando criacao."
}

if (Test-Path $venvPython) {
    Write-Host "Instalando dependencias do back-end com o Python do venv..."
    Start-Process -NoNewWindow -Wait -WorkingDirectory $backEndPath -FilePath $venvPython -ArgumentList "-m pip install -r ./requirements.txt"
} else {
    Write-Host "Nao foi possivel encontrar o Python do venv. Tentando usar o Python global..."
    Start-Process -NoNewWindow -Wait -WorkingDirectory $backEndPath -FilePath "powershell" -ArgumentList "-Command python -m pip install -r ./requirements.txt"
}

Write-Host "Instalacao concluida. Para iniciar os servidores, use: ./script.ps1"
