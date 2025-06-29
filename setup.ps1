# Script para limpiar e instalar dependencias
Write-Host "🧹 Limpiando node_modules y package-lock.json..."
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "📦 Instalando dependencias..."
npm install

Write-Host "🔨 Compilando proyecto..."
npm run build

Write-Host "✅ ¡Listo! Ahora puedes ejecutar: npm run start:dev"
