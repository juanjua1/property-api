# 🚀 INSTRUCCIONES PARA EJECUTAR LA API

## ⚠️ IMPORTANTE: Ejecuta estos comandos UNO POR UNO en tu terminal de PowerShell

### 1. Navegar al directorio del proyecto
```powershell
cd "c:\Users\rodri\Documents\dev-proyects\alt94D\property-api"
```

### 2. Limpiar instalación anterior (opcional pero recomendado)
```powershell
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
```

### 3. Instalar dependencias
```powershell
npm install
```

### 4. Compilar el proyecto
```powershell
npm run build
```

### 5. Ejecutar en modo desarrollo
```powershell
npm run start:dev
```

## 🎯 Si sigue dando error, ejecuta esto:

### Instalar dependencias específicas:
```powershell
npm install @nestjs/config@3.0.0 @types/passport-jwt@4.0.1 @types/passport-local@1.0.38 @types/bcrypt@5.0.2
```

### Luego compilar y ejecutar:
```powershell
npm run build
npm run start:dev
```

## ✅ Cuando funcione, deberías ver:
```
🚀 Property API is running on port 3000
📚 Available endpoints:
  POST /auth/register - Registrar usuario
  POST /auth/login - Iniciar sesión
  ...
```

## 🐛 Si persiste el error:
1. Verifica que tienes Node.js v16 o superior
2. Verifica que MongoDB esté corriendo
3. Asegúrate de estar en el directorio correcto
