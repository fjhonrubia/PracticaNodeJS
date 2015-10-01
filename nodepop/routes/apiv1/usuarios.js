'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var sha256 = require('sha256');

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

// Módulo para comprobar la validez de un mail
var compruebaMail = require('../../lib/apiv1/compruebaMail.js');

router.post('/:idiom(es|en)/registrarUsuario', (req, res)=> {

  // Recuperación de los parámetros de registro del usuario
  console.log('usuarios.js - Nombre: ', req.query.nombre);
  console.log('usuarios.js - E-Mail: ', req.query.mail);
  console.log('usuarios.js - Password: ', req.query.password);

  var idioma = req.params.idiom;

  // Pasar el password por el método para encriptarlo
  var passEncriptado = sha256(req.query.password);

  // Se crea un nuevo usuario
  var usuario = new Usuario({
    nombre: req.query.nombre,
    mail: req.query.mail,
    pass: passEncriptado,
  });

  compruebaMail(usuario.mail).then((mail)=> {
    // Se almacena en la base de datos
    console.log('El mail es: ', mail);

    Usuario.compruebaUsuario(mail).then(()=> {
      usuario.save((err,data)=> {
        if (err) {
          errores('ERROR_SAVING_USER', idioma, err, res);
        }
        console.log('usuarios.js - Usuario dado de alta: ', data);
        res.json({usuario: data});
      });
    }).catch(()=> {
      errores('MAIL_EXISTS', idioma, null, res);
    });


  }).catch((msg)=> {
    console.log('msg', msg);
    errores(msg.msg, idioma, msg, res);
  });
});

module.exports = router;