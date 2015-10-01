'use strict';

var mongoose = require('mongoose');

// Definición del esquema
var pushTokenSchema = mongoose.Schema({
  plataforma: {type: String, enum: ['ios', 'android']},
  token: { type: String, index: true},
  usuario: String,
});

// Exportación
var PushToken = mongoose.model('PushToken', pushTokenSchema);

module.exports = PushToken;
