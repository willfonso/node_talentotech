# Proyecto Final Integrador (PFI) - Backend Node.js

API REST desarrollada con Node.js, Express, Firebase Firestore y autenticación JWT para la gestión de catálogo de productos.

## 🚀 Requisitos e Instalación

1. Clona o extrae este repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus variables de entorno creando un archivo `.env` a partir del `.env.example`:
   - Coloca tus claves de Firebase Web App en `.env`.
   - Modifica `JWT_SECRET` si lo deseas.

4. Iniciar el servidor:
   ```bash
   npm run start
   ```

---

## 📌 Endpoints de la API

### Autenticación (`/auth`)
* `POST /auth/login`
  - Body (JSON):
    ```json
    {
      "email": "admin@tienda.com",
      "password": "password123"
    }
    ```
  - Respuesta: Retorna el Bearer Token JWT para usar en endpoints protegidos.

### Productos (`/api/products`)
* `GET /api/products`: Obtener todos los productos del catálogo.
* `GET /api/products/:id`: Obtener el detalle de un producto por su ID.
* `POST /api/products/create`: Guardar un nuevo producto en Firebase Firestore.
  - **Requiere Header**: `Authorization: Bearer <tu_token_jwt>`
  - Body (JSON):
    ```json
    {
      "name": "Remera Oversize",
      "price": 25000,
      "stock": 15,
      "category": "Indumentaria"
    }
    ```
* `DELETE /api/products/:id`: Eliminar un producto por ID.
  - **Requiere Header**: `Authorization: Bearer <tu_token_jwt>`
"# node_talentotech" 
