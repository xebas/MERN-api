'use strict';
// Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
// Ejecutar express (http)
var app = express();
// Cargar ficheros rutas
var user_routes = require('./routes/user');
// Middlewares (se ejecuta ANTES de cargar la ruta)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CORS (permitir peticiones desde el Frontend)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Añadir prefijos a rutas
app.use('/', user_routes);

// Exportar módulo (fichero actual)
module.exports = app;
