'use strict';
// cargamos la libreria de mongoose
var mongoose = require('mongoose');
// carga el fichero principal de la app (no hace falta poner .js)
var app = require('./app');
// puerto por defecto
var port = 3900;
// config
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
// conecta con mongodb
mongoose.connect('mongodb://localhost:27017/app', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Conexión a la DB correcta!');
        // crear servidor y poner a escuchar peticiones http
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });

    });
