'use strict';

var mongoose = require('mongoose');

// Definición del esquema
var anuncioSchema = mongoose.Schema({
  nombre: {type: String, index: true},
  venta: {type: Boolean, index: true},
  precio: {type: Number, index: true},
  foto: String,
  tags: {type: [String], index: true},
});

// Métodos estáticos
anuncioSchema.statics.lista = function(criterios, skip, limit, sort) {

  return new Promise((resolve, reject)=> {
    // Se crea una nueva consulta con los criterios pasados como parámetro
    var query = Anuncio.find(criterios);

    // Configuración de paginación y ordenación
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);

    // Se ejecuta la consulta y se evalúa el resultado obtenido
    query.exec((err,rows)=> {
      if (err) {
        console.error('Anuncio.js - Error listando los anuncios:', err);
        return reject(err);
      }
      console.log('rows: ', rows);
      return resolve(rows);
    });

  });
};

anuncioSchema.statics.listaTags = function() {

  return new Promise((resolve, reject)=> {
    // Se crea una nueva consulta con los criterios que se han pasados
    var query = Anuncio.find();

    query.select('tags');

    // Se ejecuta la consulta y se evalúa el resultado obtenido
    query.exec((err,results)=> {
      if (err) {
        console.error('Aunucio.js - Ha ocurrido un error listando tags:', err);
        return reject(err);
      }

      var tags = [];

      results.forEach((item1)=> {

        item1.tags.forEach((item2)=> {

          if (tags.indexOf(item2) === -1) {
            tags.push(item2);
          }

        });

      });

      return resolve(tags);

    });

  });
};

// Exportación
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
