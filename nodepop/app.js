'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Uncomment after placing your favicon in /public
// App.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Se requiere la conexión a base de datos. En este caso MongoDB
require('./lib/apiv1/dbMongo');

require('./models/apiv1/Anuncio.js'); // no es necesario asignarlo a nada
require('./models/apiv1/Usuario.js'); // no es necesario asignarlo a nada
require('./models/apiv1/PushToken.js'); // no es necesario asignarlo a nada

app.use('/', routes);
app.use('/users', users);

app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/apiv1/tokens', require('./routes/apiv1/pushtokens'));
app.use('/apiv1', require('./routes/apiv1/autenticacion'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
      res.status(500).json({
          ok: false,
          error: {
              code: err.status,
              msg: 'ERROR:' + err.message.toString(),
          },
      });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
    res.status(500).json({
        ok: false,
        error: {
            code: err.status,
            msg: 'ERROR:' + err.message.toString(),
        },
    });
});


module.exports = app;
