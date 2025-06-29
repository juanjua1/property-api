# Property API

API de NestJS para gestión de usuarios, autenticación y propiedades favoritas con MongoDB.

## ✅ Estado del Proyecto

✅ **Configuración MongoDB**: Conectado a `mongodb://localhost:27018/property_db`  
✅ **Módulos configurados**: Users, Auth, Products, Seed  
✅ **Validación de datos**: DTOs con class-validator  
✅ **Autenticación JWT**: Implementada con Passport  
✅ **Endpoints funcionales**: Registro, login, favoritos, productos  

## 🚀 Instrucciones para Iniciar

### 1. Conectar a MongoDB

**Primero asegúrate de que MongoDB esté ejecutándose en el puerto 27018:**

- Desde MongoDB Compass: conecta a `mongodb://localhost:27018`
- Desde línea de comandos: `mongod --port 27018`

### 2. Iniciar la API

1. Instalar dependencias:
```bash
cd property-api
npm install
```

2. Iniciar el servidor:
```bash
npm run start:dev
```

O usando VS Code: `Ctrl+Shift+P` > "Tasks: Run Task" > "Start Property API"

La API estará disponible en **`http://localhost:3000`**

## 📚 Endpoints Disponibles

### 🔐 Autenticación

#### Registrar usuario
- **POST** `http://localhost:3000/auth/register`
- Body:
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```

#### Iniciar sesión
- **POST** `http://localhost:3000/auth/login`
- Body:
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```
- **Respuesta**: `{ "access_token": "jwt_token_here" }`

#### Obtener perfil (requiere token)
- **GET** `http://localhost:3000/auth/profile`
- Headers: `Authorization: Bearer <jwt_token>`

### 👤 Usuarios

#### Obtener perfil de usuario (requiere token)
- **GET** `http://localhost:3000/users/profile`
- Headers: `Authorization: Bearer <jwt_token>`

#### Obtener favoritos (requiere token)
- **GET** `http://localhost:3000/users/favorites`
- Headers: `Authorization: Bearer <jwt_token>`

#### Agregar producto a favoritos (requiere token)
- **POST** `http://localhost:3000/users/favorites/:productId`
- Headers: `Authorization: Bearer <jwt_token>`

#### Quitar producto de favoritos (requiere token)
- **DELETE** `http://localhost:3000/users/favorites/:productId`
- Headers: `Authorization: Bearer <jwt_token>`

### 🏠 Productos

#### Obtener todos los productos
- **GET** `http://localhost:3000/products`

#### Obtener producto por ID
- **GET** `http://localhost:3000/products/:id`

#### Crear producto
- **POST** `http://localhost:3000/products`
- Body:
```json
{
  "name": "Casa en venta",
  "description": "Hermosa casa de 3 habitaciones",
  "price": 150000,
  "location": "Madrid, España",
  "area": 120,
  "imageUrl": "https://example.com/image.jpg",
  "bedrooms": 3,
  "bathrooms": 2,
  "type": "sale",
  "propertyType": "house"
}
```

### 🌱 Seed (Datos de ejemplo)

#### Poblar base de datos con productos de ejemplo
- **POST** `http://localhost:3000/seed/products`

## 🧪 Flujo de Prueba con Postman

1. **Poblar datos de ejemplo**: POST `http://localhost:3000/seed/products`
2. **Registrar un usuario**: POST `http://localhost:3000/auth/register`
3. **Iniciar sesión**: POST `http://localhost:3000/auth/login` → Copiar el `access_token`
4. **Ver productos**: GET `http://localhost:3000/products`
5. **Agregar favorito**: POST `http://localhost:3000/users/favorites/{productId}` con token
6. **Ver favoritos**: GET `http://localhost:3000/users/favorites` con token

## 🔗 Conectar a MongoDB Compass

1. Abrir MongoDB Compass
2. Conectar a: `mongodb://localhost:27018`
3. Navegar a la base de datos `property_db`
4. Verás las colecciones `users` y `products`

## 🗄️ Estructura de la Base de Datos

### Colección `users`
```javascript
{
  "_id": ObjectId,
  "email": "string",
  "password": "string (hash bcrypt)",
  "favoriteProducts": [ObjectId] // Referencias a products
}
```

### Colección `products`
```javascript
{
  "_id": ObjectId,
  "name": "string",
  "description": "string",
  "price": Number,
  "location": "string",
  "area": Number,
  "imageUrl": "string",
  "bedrooms": Number,
  "bathrooms": Number,
  "type": "sale" | "rent",
  "propertyType": "house" | "apartment" | "land" | "commercial",
  "createdAt": Date,
  "updatedAt": Date
}
```

## 📋 Scripts NPM

- `npm run start` - Iniciar en modo producción
- `npm run start:dev` - Iniciar en modo desarrollo con recarga automática
- `npm run build` - Compilar el proyecto
- `npm run test` - Ejecutar tests

---

## ✅ Listo para usar

La API está configurada y lista para:
- ✅ Conectarse a MongoDB local (puerto 27018)
- ✅ Ser probada con Postman
- ✅ Visualizar datos en MongoDB Compass

**URL Base**: `http://localhost:3000`  
**MongoDB**: `mongodb://localhost:27018/property_db`
