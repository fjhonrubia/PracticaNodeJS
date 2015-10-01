'use strict';

var mongoose = require('mongoose');

// Definición del esquema
var usuarioSchema = mongoose.Schema({
  nombre: String,
  mail: { type: String, index: true},
  pass: { type: String, index: true},
});

// Métodos de instancia
usuarioSchema.statics.autenticacion = function(nombre, passEncriptado) {

  return new Promise((resolve, reject)=> {
    // Creación de consulta con los criterios que se han pasado como parámetro
    var criterios = {
      mail: nombre,
      pass: passEncriptado,
    };
    Usuario.findOne(criterios, (err, usr)=> {
      if (err) {
        console.error('Usuario.js - Error en la búsqueda del usuario:', err);
        return reject({msg: 'ERROR_SEARCHING_USER', error: err});
      }
      if (!usr) {
        console.error('Usuario.js - Error al buscar el usuario :', err);
        return reject({msg: 'USER_NOT_FOUND', error: err});
      }
      console.log('Usuario.js - usuario: ', usr);
      return resolve(usr);
    });

  });
};

usuarioSchema.statics.compruebaUsuario = function(mail) {

  return new Promise((resolve, reject)=> {

    // Creación de consulta con los criterios que se han pasado como parámetro
    var criterios = {
      mail: mail,
    };

    Usuario.findOne(criterios, (err, usr)=> {
      if (err) {
        console.error('Usuario.js - Error en la búsqueda del usuario:', err);
        return reject({msg: 'ERROR_SEARCHING_USER', error: err});
      }
      if (!usr) {
        console.error('Usuario.js - Nuevo usuario :', err);
        return resolve();
      }
      console.log('Usuario.js - Usuario existente: ', usr);
      return reject();
    });

  });
};

// Exportación
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
