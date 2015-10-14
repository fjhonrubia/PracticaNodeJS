'use strict';

var jwt = require('jsonwebtoken');
var configJWT = require('../../local_config').jwt;

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

module.exports = function() {

  return function(req, res, next) {

    var token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];

    var idioma = req.params.idiom;

    // Decodifica el token
    if (token) {

      // Comprobación del secret
      jwt.verify(token, configJWT.secret, function(err, decoded) {
        if (err) {

          errores('FAILED_AUTH_TOKEN', idioma, err, res);
        } else {
          console.log('jwAuth - Token decofificado correctamente.');
          req.decoded = decoded;
          next();
        }
      });

    } else {

      errores('NO_TOKEN_PROVIDED', idioma, null, res);
    }
  };
};
