'use strict';

var mongoose = require('mongoose');

var db = mongoose.connection;

// Handler para controlar el error en la conexión
db.on('error', function(err) {
  console.error('Se ha producido un error en la conexión: ', err);
  process.exit(1);
});

// Handler para controlar la conexión
db.once('open', function() {
  console.log('Conectado a MongoDB ');

});

mongoose.connect('mongodb://localhost/nodepop');

