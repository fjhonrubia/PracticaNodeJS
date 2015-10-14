'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

// Módulo para el procesamiento de queries
var procesaQS = require('../../lib/apiv1/procesaQueryString.js');

// Autenticación con JWT
var jwtAuth = require('../../lib/apiv1/jwtAuth');
router.use('/:idiom(es|en)', jwtAuth());

router.get('/:idiom(es|en)/images/:imagen', function(req, res) {

  // Recuperación del parámetro de idioma
  var idioma = req.params.idiom;

  var options = {
    root: __dirname + '/../../public/images',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  res.sendFile(req.params.imagen, options, function(err) {
    console.log('Anuncios.js - Imagen enviada con éxito');
    if (err) {
      errores('IMAGE_GET_ERROR', idioma, err, res);
    }
  });
});

router.get('/:idiom(es|en)/listaTags', function(req, res) {

  // Recuperación del parámetro de idioma
  var idioma = req.params.idiom;

  // Ejecución de la consulta
  Anuncio.listaTags().then(function(data) {
    console.log('Anuncios.js - Tags listados con éxito');
    res.json({tags: data});

  }).catch(function(err) {
    errores('TAGS_LIST_ERROR', idioma, err, res);
  });

});

router.get('/:idiom(es|en)/listaAnuncios', function(req, res) {

  // Recuperación del parámetro de idioma
  var idioma = req.params.idiom;

  // Recuperación de los parámetros del query string y procesamiento
  procesaQS(req.query.tag, req.query.venta, req.query.nombre, req.query.precio)
      .then((criterios)=> {

        // Configuración de los parámetros de paginación y ordenación
        let skip = 0;
        let limit = 0;
        let sort = '';
        if (req.query.start) {
          skip = req.query.start;
        }
        if (req.query.limit) {
          limit = req.query.limit;
        }
        if (req.query.sort) {
          sort = req.query.sort;
        }

        // Ejecución de la consulta
        Anuncio.lista(criterios, skip, limit, sort).then((data)=> {
          console.log('Anuncios.js - Lista de anuncios:', data);
          res.json({anuncios: data});

        }).catch((err)=> {
          errores('ANUNCIOS_LIST_ERROR', idioma, err, res);
        });
      }).catch((err)=> {
        errores(err.msg, idioma, err, res);
      });
});

module.exports = router;