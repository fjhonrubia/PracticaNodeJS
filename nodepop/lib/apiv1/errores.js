'use strict';

var fs = require('fs');

function enviaError(msg, idiom, err, res) {

  // Return new Promise((resolve)=>{

  var mensajesError;

  fs.readFile(__dirname + '/../../mensajes.json', function(err,data) {
    if (err) {
      console.error('errores.js - Error en la lectura del fichero: ', err);
      if (idiom === 'es') {
        return res.status(500).json({
          ok: false,
          error: {
            code: 500,
            msg: 'Error en la lectura del fichero de mensajes.',
          },
        });
      }
      if (idiom === 'en') {
        return res.status(500).json({
          ok: false,
          error: {
            code: 500,
            msg: 'Error loading file messages.',
          },
        });
      }
    }

    // Se incluye un bloque try/catch porque la operación es síncrona
    try {

      // Se parsea el fichero a un objeto
      mensajesError = JSON.parse(data);

    }
    catch (e) {
      console.error('errores.js - Error en el parseo del fichero: ', e);
      if (idiom === 'es') {
        return res.status(500).json({
          ok: false,
          error: {
            code: 500,
            msg: 'Error en el parseo del fichero.',
          },
        });
      }
      if (idiom === 'en') {
        return res.status(500).json({
          ok: false,
          error: {
            code: 500,
            msg: 'Error parsing file.',
          },
        });
      }
    }

    for (var idx in mensajesError.mensajes) {
      if (mensajesError.mensajes[idx].clave.toString() === msg) {
        if (idiom === 'es') {
          return res.status(mensajesError.mensajes[idx].codigo).json({
            ok: false,
            error: {
              code: mensajesError.mensajes[idx].codigo,
              msg: mensajesError.mensajes[idx].es,
            },
          });
        }
        if (idiom === 'en') {
          return res.status(mensajesError.mensajes[idx].codigo).json({
            ok: false,
            error: {
              code: mensajesError.mensajes[idx].codigo,
              msg: mensajesError.mensajes[idx].en,
            },
          });
        }
      }
    }

    // Se retorna un error genérico en función del idioma
    if (idiom === 'es') {
      console.log('errores.js - No existen códigos de error en el fichero.');
      return res.status(500).json({
        ok: false,
        error: {
          code: 500,
          msg: 'Código de error no encontrado.',
        },
      });
    }
    if (idiom === 'en') {
      return res.status(500).json({
        ok: false,
        error: {
          code: 500,
          msg: 'Error code not found.',
        },
      });
    }
  });
  // });
}

module.exports = enviaError;