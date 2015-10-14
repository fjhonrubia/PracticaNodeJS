'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('PushToken');

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

router.put('/:idiom(es|en)/registrarToken', function(req, res) {

  // Recuperación de los parámetros de registro del token
  console.log('PushTokens.js - Token: ', req.query.token);
  console.log('PushTokens.js - Usuario: ', req.query.usuario);
  console.log('PushTokens.js - Plataforma: ', req.query.plataforma);

  // Recuperación del parámetro de idioma
  var idioma = req.params.idiom;

  var token;

  // Se registra el token
  if (req.query.usuario) {
    token = new PushToken({plataforma: req.query.plataforma,
        token: req.query.token,
        usuario: req.query.usuario,
    });
  } else {
    token = new PushToken({plataforma: req.query.plataforma,
        token: req.query.token,
    });
  }

  // Se almacena en la base de datos
  token.save(function(err,data) {
    if (err) {
      errores('ERROR_SAVING_TOKEN', idioma, err, res);
    }
    console.log('PushTokens.js - Token: ', data);
    return res.json({token: data});
  });
});

module.exports = router;
