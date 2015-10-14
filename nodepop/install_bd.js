'use strict';

//var db = require('./lib/apiv1/dbMongo');
var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');
var fs = require('fs');
var sha256 = require('sha256');

var db = mongoose.connection;


mongoose.connect('mongodb://localhost/nodepop');

db.once('open', function() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

});

function runInstallScript() {

    async.series([
        initAnuncios,
        initUsuarios
    ], function(err) {
        if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
}
);

}

function initAnuncios(cb) {
    //var Anuncio = mongoose.model('Anuncio');
    var Anuncio = require('./models/apiv1/Anuncio');

    // elimino todos
    Anuncio.remove({}, function() {

        var anunciosObj;
        // aqui cargaríamos el json de anuncios (readFile, JSON.parse, iterar con Anuncio.save...)
        fs.readFile('./anuncios.json', function(err,data) {
            if (err) {
                console.error('Error en la lectura del fichero: ', err);
                return process.exit(1);
             }

            //Se incluye un bloque try/catch porque la operación es síncrona
            try {

                //se parsea el fichero a un objecto
                anunciosObj = JSON.parse(data);

            }
            catch(e) {
                console.error('Error en el parseo del fichero: ', e);
                return process.exit(1);
            }

            console.log('anunciosObj: ', anunciosObj);

			//Se itera añadiendo un registro en cada caso
			anunciosObj.anuncios.forEach(function(item) {
                //Se crea un nuevo anuncio 
                let anuncio = new Anuncio(item);

                //se guarda el objeto en base de datos
                anuncio.save(function(err){
                    if (err) {
                        console.error('Error en el guardado del objeto: ', err);
                        return cb(err);
                    }

                });
			
			});
			
            return cb(null, anunciosObj.anuncios);
        });
    });
}

function initUsuarios(cb) {
    //var Usuario = mongoose.model('Usuario');
    var Usuario = require('./models/apiv1/Usuario');

    // elimino todos
    Usuario.remove({}, function() {
        // aqui cargaríamos al menos un usuario (Usuario.save)
                let usuario = new Usuario({
                    'nombre': 'usr1',
                    'mail': 'email@usr1.com',
                    'pass': sha256('usr1')
                });

            console.log('Usuario: ', usuario);

            usuario.save(function(err, result){
                if (err) {
                console.error('Error en la creación del usuario: ', err);
                return cb(err);
            }
            return cb(null, result);
        });

    });
}
