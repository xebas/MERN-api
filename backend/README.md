# CREAR BACKEND NODEJS (REG/AUTH)

#### 0-Instalar NodeJS (viene con el gestor de paquetes npm)

#### 1-Crear proyecto:
```sh
$ npm init
```

#### 2-Instalar dependencias:
- express: crear rutas y protocolos http
```sh
$ npm install --save express
```
- body-parser: convierte datos de los forms a json
```sh
$ npm install --save body-parser
```
- mongoose: ORM para utilizar con mongoDB
```sh
$ npm install --save mongoose
```
- connect-multiparty: subir archivos tipo FILE
```sh
$ npm install --save connect-multiparty
```
- validator: valida datos de forms
```sh
$ npm install --save validator
```
- nodemon: con 'npm start', se actualiza el proyecto cada vez que salvamos el proyecto. Añadir: "scripts": "start": "nodemon index.js", en 'package.json'
```sh
$ npm install --save-dev nodemon
```
- bcrypt: encriptación de datos
```sh
$ npm install --save bcrypt
```

#### 3-Conectar con mongoDB
- instalar y arrancar mongoDB (instrucciones en su web)
- crear una 'collection' en mongoDB llamada 'app'
```sh
$ db.createCollection('app');
```
- crear "index.js" en raiz

#### 4-Crear el servidor:
- crear app.js

#### 5-Crear modelo:
- crear carpeta 'models' y crear archivo 'user.js' dentro. (clase para conectar con las colecciones de mongodb, en este caso para un AUTH)

#### 6-Crear controlador:
- crear carpeta 'controllers' y crear archivo 'user.js' dentro. (clase para definir los métodos y rutas para el AUTH)

#### 7-Crear rutas:
- crear carpeta 'routes' y crear archivo 'user.js' dentro. (rutas de la app)

#### 8-Añadir métodos de AUTH en el controlador
