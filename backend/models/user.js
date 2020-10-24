'use strict';
// cargar la libreria de mongoose
var mongoose = require('mongoose');
// diseño del esquema del modelo de mongoDB del User
var Schema = mongoose.Schema;
// propiedades del objecto para el registro en la app
var UserSchema = Schema({
    nick: String,
    email: String,
    pass: String,
    image: String,
    created: { type: Date, default: Date.now }
});
// exportar como módulo y poder utilizarlo en otros archivos
module.exports = mongoose.model('User', UserSchema); // nombre del modelo 'User'

