# API PRODUCTOS - tiendaperu

## INFO

### Gestiona informacion de la tienda que vende productos tecnologicos, permite administras cleintes, productos y proveedores mediante los procedimientos CRUD 

## TECNOLOGIAS USADAS

### Nodejs
### Mysql
### github
### Postman
### Express

## ESTRUCTURA DEL PROYECTO

### CARPETA GENERAL: 
#### api-productos

### ARCHIVOS GENERALES: 
#### api-productos/.gitignore | api-productos/package.json | api-productos/README.md

# -----------------------------------------------------------------------------

### CARPETAS PRINCIPALES:
#### api-productos/database | api-productos/src

### ARCHIVOS PRINCIPALES: 
#### database/db.sql | src/app.js | src/server.js

# -----------------------------------------------------------------------------

### CARPETAS SECUNDARIAS: 
#### src/config, src/controllers, src/routes,

### ARCHIVOS SECUNDARIOS: 
#### config/database.js | config/env.js  
#### controllers/producto.controller.js | controllers/cliente.controller.js | controllers/proveedorcontroller.js 
#### routes/index.js | routes/producto.routes.js | routes/cliente.routes.js | routes/proveedor.routes.js

## VALIDACIONES 

#### Productos: marca y descripción obligatorias; precio y stock válidos.
#### Clientes: nombres, apellidos, dirección y email obligatorios; el teléfono no debe superar los 9 caracteres.
#### Proveedores: razón social, contacto y dirección obligatorios; el RUC debe tener exactamente 11 dígitos numéricos.
#### En todos los casos, el ID debe ser mayor que 0 y existir en la base de datos.

### INSTALACION Y EJECUCIÓN
#### 1. Clonar repositorio: git clone <enlace-del-repositorio>
#### 2. Instalar las dependencias: npm install
#### 3. Crear manualmente el archivo .env 

#### Servidor
PORT=3000

#### Base de datos MySQL
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_CONNECTION_LIMIT=10

#### 4. Ejecutar el servidor: node src/server.js
#### Si todo está bien, la consola mostrará: 'Conexion a MySQL exitosa'

#### 5. Pruebas en el navegador (chrome o google): http://localhost:3000/api/productos

###DERCARGAR EL POSMAN
[descargar]('https://www.postman.com/product/api-client/')
