'use strict';

var express = require('express');
var UserController = require('../controllers/user');
// objeto dentro de la libreria
var router = express.Router();
// para la subida de archivos
var multipart = require('connect-multiparty');
// nos da una funcionabilidad que se ejecuta antes del método del controlador
var md_upload = multipart({ uploadDir: './upload/userImages' });
// rutas para el registro
router.post('/register', UserController.register);
router.post('/login', UserController.auth);
router.post('/upload-image/:id?', md_upload, UserController.uploadImage);
router.get('/get-image/:id?', UserController.getImage);

module.exports = router;
