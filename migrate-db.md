# Scripts para migrar datos de MongoDB local a Atlas

## 1. Exportar datos locales
mongodump --host 127.0.0.1:27017 --db property_db --out ./backup

## 2. Importar a Atlas (reemplaza <connection-string> con tu string de Atlas)
mongorestore --uri "<connection-string>" --db property_db ./backup/property_db

## 3. Verificar con mongosh
mongosh "<connection-string>"
