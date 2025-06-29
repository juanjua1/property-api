# 📮 GUÍA COMPLETA DE POSTMAN PARA PROPERTY API

## 🎯 URL Base
```
http://localhost:3000
```

## 🔧 CONFIGURACIÓN INICIAL EN POSTMAN

### 1. Crear una nueva Collection
- Abrir Postman
- Click en "New" → "Collection"
- Nombre: "Property API"

### 2. Configurar variables de entorno
- Click en el ⚙️ (Settings) arriba a la derecha
- "Add" → "Environment"
- Nombre: "Property API - Local"
- Variables:
  - `baseUrl`: `http://localhost:3000`
  - `token`: (déjalo vacío por ahora)

---

## 📝 PASO A PASO: TESTING DE LA API

### 🔐 PASO 1: REGISTRAR USUARIO

**Método:** `POST`
**URL:** `{{baseUrl}}/auth/register`
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a8b8c8d8e8f8g8h8i8j8",
    "email": "test@example.com"
  }
}
```

**🎯 IMPORTANTE:** Copia el `access_token` de la respuesta!

---

### 🔑 PASO 2: CONFIGURAR TOKEN EN POSTMAN

**Opción A - Variable de entorno:**
1. Ve a tu Environment "Property API - Local"
2. En la variable `token`, pega el access_token (SIN "Bearer ")
3. Guarda

**Opción B - Header manual:**
En cada request que requiera autenticación, agrega:
```
Authorization: Bearer tu_access_token_aqui
```

---

### 🏠 PASO 3: VER PROPIEDADES DISPONIBLES

**Método:** `GET`
**URL:** `{{baseUrl}}/products`
**Headers:** (ninguno necesario)

**Respuesta esperada:**
```json
[
  {
    "_id": "64f8a8b8c8d8e8f8g8h8i8j8",
    "name": "Casa moderna en Las Condes",
    "description": "Hermosa casa de 3 pisos...",
    "price": 350000000,
    "location": "Las Condes, Santiago",
    "area": 250,
    "bedrooms": 4,
    "bathrooms": 3,
    "type": "sale",
    "propertyType": "house"
  }
  // ... más propiedades
]
```

**🎯 IMPORTANTE:** Copia el `_id` de una propiedad que te guste!

---

### ❤️ PASO 4: AGREGAR PROPIEDAD A FAVORITOS

**Método:** `POST`
**URL:** `{{baseUrl}}/users/favorites/PROPERTY_ID_AQUI`
**Headers:**
```
Authorization: Bearer {{token}}
```
**Body:** (vacío)

**Ejemplo de URL completa:**
```
http://localhost:3000/users/favorites/64f8a8b8c8d8e8f8g8h8i8j8
```

**Respuesta esperada:**
```json
{
  "_id": "64f8a8b8c8d8e8f8g8h8i8j8",
  "email": "test@example.com",
  "favoriteProducts": [
    {
      "_id": "64f8a8b8c8d8e8f8g8h8i8j8",
      "name": "Casa moderna en Las Condes",
      // ... datos completos de la propiedad
    }
  ]
}
```

---

### 📋 PASO 5: VER MIS FAVORITOS

**Método:** `GET`
**URL:** `{{baseUrl}}/users/favorites`
**Headers:**
```
Authorization: Bearer {{token}}
```

**Respuesta esperada:**
```json
[
  {
    "_id": "64f8a8b8c8d8e8f8g8h8i8j8",
    "name": "Casa moderna en Las Condes",
    "description": "Hermosa casa de 3 pisos...",
    "price": 350000000,
    // ... datos completos
  }
]
```

---

### 🗑️ PASO 6: QUITAR DE FAVORITOS

**Método:** `DELETE`
**URL:** `{{baseUrl}}/users/favorites/PROPERTY_ID_AQUI`
**Headers:**
```
Authorization: Bearer {{token}}
```

---

### 🔐 PASO 7: LOGIN (SI YA TIENES USUARIO)

**Método:** `POST`
**URL:** `{{baseUrl}}/auth/login`
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 👤 PASO 8: VER MI PERFIL

**Método:** `GET`
**URL:** `{{baseUrl}}/auth/profile`
**Headers:**
```
Authorization: Bearer {{token}}
```

---

## 🏗️ PASO 9: CREAR NUEVA PROPIEDAD

**Método:** `POST`
**URL:** `{{baseUrl}}/products`
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "name": "Departamento nuevo",
  "description": "Hermoso departamento con vista al mar",
  "price": 250000000,
  "location": "Viña del Mar",
  "area": 120,
  "bedrooms": 2,
  "bathrooms": 2,
  "type": "sale",
  "propertyType": "apartment",
  "imageUrl": "https://example.com/depto.jpg"
}
```

---

## 🎯 COLLECTION COMPLETA PARA IMPORTAR EN POSTMAN

Crea un archivo llamado `Property-API.postman_collection.json` con este contenido:

```json
{
  "info": {
    "name": "Property API",
    "description": "API de propiedades inmobiliarias"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Properties",
      "item": [
        {
          "name": "Get All Properties",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/products",
              "host": ["{{baseUrl}}"],
              "path": ["products"]
            }
          }
        }
      ]
    },
    {
      "name": "Favorites",
      "item": [
        {
          "name": "Get My Favorites",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/users/favorites",
              "host": ["{{baseUrl}}"],
              "path": ["users", "favorites"]
            }
          }
        },
        {
          "name": "Add to Favorites",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/users/favorites/PROPERTY_ID_HERE",
              "host": ["{{baseUrl}}"],
              "path": ["users", "favorites", "PROPERTY_ID_HERE"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error 401 Unauthorized
- Verifica que tengas el token en el header Authorization
- Asegúrate de usar "Bearer " antes del token

### Error 404 Not Found  
- Verifica la URL
- Asegúrate de que la API esté corriendo en puerto 3000

### Error 400 Bad Request
- Revisa el formato del JSON en el body
- Verifica que todos los campos requeridos estén presentes

### Error de conexión
- Asegúrate de que la API esté corriendo (`npm run start:dev`)
- Verifica que MongoDB esté funcionando
