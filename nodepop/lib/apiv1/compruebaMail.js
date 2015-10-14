'use strict';

function compruebaMail(mail) {

  return new Promise(function(resolve, reject) {
    // Si la longitud del string es inferior a 6, mail inválido

    if (mail.length < 6) {
      console.log('compruebaMail.js - Longitud del mail es demasiado corta');
      return reject({msg: 'MAIL_LENGHT_TOO_SMALL'});

    } else {
      // Se divide el string en un array.
      // Se comprueba cuantos elementos contiene el array.

      var arr = mail.split('@');
      if (arr.length !== 2) {
        console.log('compruebaMail.js - El mail no contiene un caracter @');
        return reject({msg: 'BAD_EMAIL'});
      }

      // Se comprueba que existe un '.' en el segundo elemento del array
      if (arr[1].indexOf('.') === -1) {
        console.log('compruebaMail.js - El mail no contiene un caracter .');
        return reject({msg: 'BAD_EMAIL'});
      }
      // En otro caso se considera que el mail se encuentra bien formado
      console.log('compruebaMail.js - Está bien formado');
      return resolve(mail);
    }
  });
}

module.exports = compruebaMail;