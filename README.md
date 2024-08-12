
# API REST con Autenticación JWT en Express

Esta es una API RESTful construida con **Express** y **Prisma ORM** que proporciona autenticación mediante **JSON Web Tokens (JWT)**. La API permite la gestión de usuarios y notas, con rutas para registro, inicio de sesión y operaciones CRUD para notas.

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Rutas](#rutas)
- [Documentación](#documentación)
- [Pruebas](#pruebas)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- Registro de usuarios
- Inicio de sesión con JWT
- CRUD de notas
- Validaciones de entrada
- Seguridad mediante cifrado de contraseñas

## Tecnologías

- **Express**: Framework para construir la API.
- **Prisma ORM**: ORM para la gestión de base de datos.
- **JWT**: Para autenticación y autorización.
- **bcryptjs**: Para cifrado de contraseñas.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura tu base de datos:

   - Asegúrate de tener una base de datos configurada y actualiza el archivo `.env` con las credenciales de tu base de datos.

4. Ejecuta las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
DATABASE_URL="tu_url_de_base_de_datos"
SECRET="tu_clave_secreta_para_jwt"
```

## Uso

1. Inicia el servidor:

   ```bash
   npm start
   ```

2. La API estará disponible en `http://localhost:3000`.

## Rutas

### Registro

- **POST /api/auth/register**
  - Crea un nuevo usuario.
  - **Body**: `{"username": "string", "password": "string"}`

### Inicio de sesión

- **POST /api/auth/login**
  - Inicia sesión y devuelve un token JWT.
  - **Body**: `{"username": "string", "password": "string"}`

### Obtener notas

- **GET /api/notes**
  - Devuelve todas las notas del usuario autenticado.

### Crear nota

- **POST /api/notes**
  - Crea una nueva nota para el usuario autenticado.
  - **Body**: `{"title": "string", "content": "string"}`

### Actualizar nota

- **PUT /api/notes/:id**
  - Actualiza una nota específica del usuario autenticado.
  - **Body**: `{"title": "string", "content": "string"}`

### Eliminar nota

- **DELETE /api/notes/:id**
  - Elimina una nota específica del usuario autenticado.

## Documentación

La documentación interactiva de la API está disponible en `http://localhost:3000/api/docs/`. Esta ruta proporciona una vista detallada de los endpoints de la API, los parámetros requeridos, y ejemplos de solicitudes y respuestas.

## Pruebas

Las pruebas están implementadas usando [Jest](https://jestjs.io/). Puedes ejecutar las pruebas con:

```bash
npm test
```

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un "issue" o envía un "pull request" con tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
