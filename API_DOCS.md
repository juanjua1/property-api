# Property API

API REST para gestión de propiedades inmobiliarias con sistema de autenticación y favoritos.

## 🚀 Características

- **Autenticación JWT**: Registro y login de usuarios
- **Gestión de propiedades**: CRUD completo de propiedades
- **Sistema de favoritos**: Los usuarios pueden marcar propiedades como favoritas
- **Validación de datos**: Validación automática con class-validator
- **Base de datos MongoDB**: Almacenamiento con Mongoose

## 🛠️ Tecnologías

- **NestJS**: Framework de Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación
- **bcrypt**: Encriptación de contraseñas
- **class-validator**: Validación de DTOs

## 📋 Requisitos

- Node.js >= 16
- MongoDB >= 4.4
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd property-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Iniciar MongoDB**
Asegúrate de que MongoDB esté ejecutándose en `mongodb://localhost:27017`

5. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Autenticación

#### Registrar usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "mi_password"
}
```

#### Iniciar sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "mi_password"
}
```

#### Obtener perfil (requiere autenticación)
```http
GET /auth/profile
Authorization: Bearer <tu_jwt_token>
```

### Propiedades

#### Listar todas las propiedades
```http
GET /products
```

#### Obtener una propiedad
```http
GET /products/:id
```

#### Crear propiedad
```http
POST /products
Content-Type: application/json

{
  "name": "Casa moderna",
  "description": "Hermosa casa con jardín",
  "price": 350000000,
  "location": "Las Condes, Santiago",
  "area": 250,
  "bedrooms": 4,
  "bathrooms": 3,
  "type": "sale",
  "propertyType": "house",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Favoritos (requieren autenticación)

#### Obtener favoritos del usuario
```http
GET /users/favorites
Authorization: Bearer <tu_jwt_token>
```

#### Agregar propiedad a favoritos
```http
POST /users/favorites/:productId
Authorization: Bearer <tu_jwt_token>
```

#### Quitar propiedad de favoritos
```http
DELETE /users/favorites/:productId
Authorization: Bearer <tu_jwt_token>
```

## 🗂️ Estructura del proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── dto/             # DTOs de autenticación
│   ├── guards/          # Guards JWT y Local
│   ├── strategies/      # Estrategias de Passport
│   └── ...
├── products/            # Módulo de productos/propiedades
│   ├── dto/             # DTOs de productos
│   ├── schemas/         # Schema de Mongoose
│   └── ...
├── users/               # Módulo de usuarios
│   ├── schemas/         # Schema de Mongoose
│   └── ...
├── seed/                # Seeder de datos de ejemplo
├── data/                # Datos de ejemplo
└── main.ts              # Punto de entrada
```

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación. Después del login o registro, recibirás un token que debes incluir en el header `Authorization` como `Bearer <token>` para las rutas protegidas.

## 📝 Validaciones

Los DTOs incluyen validaciones automáticas:

- **Email**: Debe ser un email válido
- **Password**: Mínimo 6 caracteres
- **Precio**: Debe ser un número mayor a 0
- **Área**: Debe ser un número mayor a 0
- **Tipo**: Debe ser "sale" o "rent"
- **Tipo de propiedad**: Debe ser "house", "apartment", "land" o "commercial"

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🚀 Deployment

Para producción, asegúrate de:

1. Configurar variables de entorno seguras
2. Usar un JWT secret fuerte
3. Configurar MongoDB Atlas o un servidor MongoDB seguro
4. Configurar CORS apropiadamente

## 📄 Licencia

Este proyecto es privado.
