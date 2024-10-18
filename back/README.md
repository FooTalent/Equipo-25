# ContaCol | Backend

ContaCol es una aplicación diseñada para simplificar la gestión de facturas electrónicas en Colombia mediante la automatización de estas. Con esta aplicación la empresa **_Inversiones Agroambientales H&R_** podrá administrar de manera eficiente su proceso de recolección de FEs (facturas electrónicas), garantizando que esta extracte los datos correctamente y sin error humano. El sistema permite la creación, almacenamiento y validación de pago de las FEs emitidas a la empresa, integrando servicios en la nube como Cloudinary para la gestión de estas en PDF, y MongoDB como base de datos principal. Con funcionalidades como la autenticación segura mediante JWT y la protección de datos sensibles con bcryptjs, ContaCol es una solución robusta para optimizar el flujo de trabajo contable y tesorería.

Acá veremos la parte del backend del proyecto. Está desarrollado con Node.js utilizando diversas tecnologías y librerías para la gestión de usuarios, almacenamiento de datos y manejo de archivos.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de desarrollo para construir el backend.
- **Express**: Framework para el manejo de rutas y middlewares.
- **MongoDB**: Base de datos NoSQL para el almacenamiento de la información.
- **Cloudinary**: Servicio en la nube para la gestión y almacenamiento de archivos PDF.
- **Multer**: Middleware para el manejo de archivos subidos a través de formularios.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, utilizado para modelar los datos.
- **bcryptjs**: Para la encriptación de contraseñas.
- **jsonwebtoken**: Para la autenticación y autorización con tokens JWT.
- **pdf-parse**: Para la extracción y manipulación de contenido de archivos PDF.
- **dotenv**: Gestión de variables de entorno.
- **cors**: Manejo de políticas de intercambio de recursos de origen cruzado.
<!-- - **date-fns**: Librería para el manejo de fechas. -->

## Instalación

1. [Instala GIT](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalación-de-Git)

2. Clona el repositorio (back y front):
   ```bash
   git clone https://github.com/FooTalent/Equipo-25.git
   ```
3. Instala las dependencias:

   ```bash
   npm i
   ```

4. Crea un archivo `.env` en la raíz del backend y configura las variables de entorno necesarias:

   ```env
   MONGO_URI=<tu-conexion-mongodb>
   CLOUDINARY_URL=<tu-url-cloudinary>
   JWT_SECRET=<tu-clave-secreta-jwt>
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   #### ¡Y listo! Ya estarás corriendo el BACKEND en tu equipo

## Estructura del Proyecto

/controllers # Controladores con la lógica de programación

/helpers # Funciones auxiliares

/middlewares # Middleware como Multer para manejo de archivos

/models # Modelos para guardar los datos ordenadamente en MongoDB usando Mongoose

/routes # Definición de las rutas de la API

## Características

- **Autenticación**: Implementada con JSON Web Tokens (JWT) para la protección de rutas.
- **Gestión de Usuarios**: Cifrado de contraseñas con bcryptjs.
- **Subida de Archivos**: Gestión de archivos mediante Multer y Cloudinary.
- **Extracción de PDFs**: Procesamiento de contenido de archivos PDF con pdf-parse.
<!-- - **Manejo de Fechas**: Utilización de date-fns para operaciones con fechas. -->

## Endpoints Principales

- `POST /suppliers`: Registro de nuevos proveedores.
- `POST /login`: Autenticación de usuarios y generación de tokens.
- `POST /invoices`: Subida de archivos multimedia a Cloudinary.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un pull request.

## Licencia

Este proyecto a sido creado por y está bajo la autoridad del grupo No. <span style="font-size: 18px;">**25 Noche</span> de Foo Talent Group**, 2do semestre 2024.
