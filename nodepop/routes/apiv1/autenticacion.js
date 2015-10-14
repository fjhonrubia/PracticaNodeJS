'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var jwt = require('jsonwebtoken');
var config = require('../../local_config');
var sha256 = require('sha256');

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

router.post('/:idiom(es|en)/autenticacion', function(req, res) {

  // Recuperación del parámetro de idioma
  var idioma = req.params.idiom;

  // Pasar el password por el método para encriptarlo
  var passEncriptado = sha256(req.query.password);

  console.log('Autenticacion.js - Mail: ',req.query.mail);
  console.log('Autenticacion.js - Pass: ',passEncriptado);

  Usuario.autenticacion(req.query.mail, passEncriptado).then(function(usr) {

    // Creación del token
    var token = jwt.sign(usr, config.jwt.secret, {
      expiresInMinutes: config.jwt.expiresInMinutes,
    });

    // Retorno del token para el usuario
    console.log('Autenticacion.js - El token enviado es: ',token);
    res.json({ ok: true, token: token });

  }).catch(function(err) {
    errores('USER_NOT_FOUND', idioma, err, res);
  });
});

module.exports = router;
