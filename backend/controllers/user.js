'use strict';
// cargar el validator
var validator = require('validator');
// para borrar archivos de nuestra carpeta de imagenes y sacar el path
var fs = require('fs');
var path = require('path');
// cargar el modelo
var User = require('../models/user');
// módulo para encriptar
var bcrypt = require('bcrypt');

var controller = {
    // registro de usuario
    register: (req, res) => {
        // recoger los parámetros por post
        var params = req.body;
        // validar campos vacíos
        var validate_reg_nick = validator.isEmpty(params.nick);
        var validate_reg_email = validator.isEmpty(params.email);
        var validate_reg_password = validator.isEmpty(params.pass);
        var validate_reg_repeat_password = validator.isEmpty(params.pass2);
        if (validate_reg_nick || validate_reg_email || validate_reg_password || validate_reg_repeat_password) {
            //bad request response code (400)
            return res.status(200).send({
                status: 'fields_val_error',
                message: '⚠ Rellena todos los campos'
            });
            // validar condiciones de campos
        } else if (!validator.isEmail(params.email)) {
            return res.status(200).send({
                status: 'email_val_error',
                message: '⚠ Introduce un email correcto'
            });
        } else if (!validator.isLength(params.pass, { min: 6, max: 6 })) {
            return res.status(200).send({
                status: 'pass_val_error',
                message: '⚠ La contraseña tiene menos de 6 caracteres'
            });
        } else if (!validator.equals(params.pass, params.pass2)) {
            return res.status(200).send({
                status: 'pass_val_error',
                message: '⚠ Las contraseñas no coinciden'
            });
            // validación campos ok
        } else {
            // comprueba si existe email en DB antes de registrar
            User.findOne({ email: params.email }, function (err, user) {
                // error
                if (err) {
                    // 404 Not Found
                    return res.status(400).send({
                        status: 'connect_mongoDB_error',
                        message: '⚠ Error conexión a mongoDB'
                    });
                    // existe usuario con ese email
                } else if (user) {
                    return res.status(200).send({
                        status: 'email_val_error',
                        message: '⚠ El email introducido ya está registrado en la App'
                    });
                } else {
                    // crear el objeto a guardar
                    var user = new User();
                    // asignar valores
                    user.nick = params.nick;
                    user.email = params.email;
                    user.image = null;
                    // encriptar password
                    user.pass = bcrypt.hashSync(params.pass, 10);
                    // registrar el usuario
                    user.save((err, userRegister) => {
                        if (err || !userRegister) {
                            return res.status(404).send({
                                status: 'connect_mongoDB_error',
                                message: '⚠ Ha ocurrido un error con el registro'
                            });
                        }
                        // devolver respuesta de registro ok
                        return res.status(200).send({
                            status: 'register_success',
                            message: 'Registro con éxito en la App!',
                            user: userRegister
                        });
                    });
                }
            });
        }
    }, // end register

    // login de usuario
    auth: (req, res) => {
        // recoger los parámetros por post
        var params = req.body;
        // validar campos vacíos
        var validate_log_email = validator.isEmpty(params.email);
        var validate_log_password = validator.isEmpty(params.pass);

        if (validate_log_email || validate_log_password) {
            return res.status(200).send({ //bad request response code (400)
                status: 'fields_val_error',
                message: '⚠ Rellena todos los campos'
            });
            // validación campos ok
        } else {
            // leer email en mongoDB
            User.findOne({ email: params.email }, function (err, user) {
                if (err || !user) {
                    return res.status(200).send({
                        status: 'email_val_error',
                        message: '⚠ No existe usuario con ese email'
                    });
                    // existe usuario con el mail recibido
                } else {
                    // desencriptar y comparar pass
                    bcrypt.compare(params.pass, user.pass, function (err, res_pass) {
                        if (err || !res_pass) {
                            return res.status(200).send({
                                status: 'pass_val_error',
                                message: '⚠ Contraseña incorrecta'
                            });
                            // login ok
                        } else {
                            return res.status(200).send({
                                status: 'auth_success',
                                message: 'OK'
                            });
                        }
                    });
                }
            });
        }
    }, // end login

    uploadImage: (req, res) => {
        // Configurar el modulo connect multiparty en router/article.js
        // Recoger el fichero de la petición
        if (!req.files) {
            return res.status(200).send({
                status: 'error',
                message: 'No se ha recibido imagen...'
            });
        }
        // Conseguir nombre y la extensión de la imagen
        var image_path = req.files.image.path;
        // var image_split = image_path.split('\\'); // windows
        var image_split = image_path.split('/');  // linux o osx
        // Nombre de la imagen
        var image_name = image_split[2];
        // Extensión de la imagen
        var extension_split = image_name.split('\.');
        var image_ext = extension_split[1];
        // Comprobar la extension (acepta solo imagenes) si no es valida, borra el fichero
        if (image_ext != 'png' && image_ext != 'jpg' && image_ext != 'jpeg' && image_ext != 'gif') {
            // borrar la imagen subida
            fs.unlink(image_path, () => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                });
            });

        } else {
            // Si la imagen es válida, almacena la id de la url
            var userId = req.params.id;
            // Buscar el usuario, asignarle el nombre de la imagen y actualizarlo (por defecto es null)
            User.findOneAndUpdate({ _id: userId }, { image: image_name }, { new: true }, (err, userImageUpdated) => {
                if (err || !userImageUpdated) {
                    // borrar la imagen subida
                    fs.unlink(image_path, () => {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No existe usuario con esa id'
                        });
                    });
                } else {
                    return res.status(200).send({
                        status: 'success',
                        article: userImageUpdated
                    });
                }
            });
        }
    }, // end upload image

    getImage: (req, res) => {
        // Recoger id de la url
        var userId = req.params.id;
        // Comprobar que existe
        if (!userId || userId == null) {
            return res.status(200).send({
                status: 'error',
                message: 'Id de usuario no válida'
            });
        }
        // busca el usuario  por ID
        User.findById(userId, (err, user) => {
            if (err || !user) {
                return res.status(200).send({
                    status: 'error',
                    message: 'No existe el usuario'
                });
            }
            var file = user.image;
            var path_file = './upload/userImages/' + file;
            fs.exists(path_file, (exists) => {
                if (exists) {
                    // devuelve la imagen
                    return res.sendFile(path.resolve(path_file));
                } else {
                    return res.status(200).send({
                        status: 'error',
                        message: 'La imagen no existe'
                    });
                }
            });
        });
    } // end get image

}; // end controller

module.exports = controller;
