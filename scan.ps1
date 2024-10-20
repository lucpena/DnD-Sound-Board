# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Caminho para a pasta raiz onde estão as pastas background, music e sfx
$rootDir = $PSScriptRoot

# Função para listar arquivos de uma pasta específica
function Get-MusicFiles($folderName) {
    $files = Get-ChildItem -Path "$rootDir\$folderName" -Filter *.mp3 -ErrorAction SilentlyContinue
    if ($files) {
        return $files | Select-Object -ExpandProperty Name
    } else {
        return @()  # Retorna um array vazio se não houver arquivos
    }
}

# Listar arquivos de cada pasta
$backgroundFiles = Get-MusicFiles "background"
$musicFiles = Get-MusicFiles "music"
$sfxFiles = Get-MusicFiles "sfx"

# Estrutura de dados para o JSON
$musicData = @{
    background = $backgroundFiles
    music = $musicFiles
    sfx = $sfxFiles
}

# Converte para JSON
$musicJson = $musicData | ConvertTo-Json -Depth 2

# Caminho para salvar o JSON
$jsonFilePath = "$rootDir\data.json"

# Escreve o JSON no arquivo
$musicJson | Out-File -FilePath $jsonFilePath -Encoding UTF8

Write-Host "Arquivo data.json gerado com sucesso."
