'use strict';

function procesaQueryString(tag, venta, nombre, precio) {
  return new Promise(function(resolve, reject) {

    // Se declara un objeto vacío
    var criterio = new Object({});

    // Se comprueba si existe tag y se añade al criterio
    if (tag) {
      console.log('El parámetro Tag es: ', tag);
      criterio.tags = { $in:  [tag]};
    }

    // Se comprueba el texto de la venta y se convierte a String
    // Si el texto es distinto a 'true' o 'false' se responde con un error
    if ((venta) && (venta.toString().toUpperCase() === 'TRUE')) {
      console.log('procesaQueryString - El parámetro venta es: ', venta);
      criterio.venta = true;
    } else if ((venta) && (venta.toString().toUpperCase() === 'FALSE')) {
      criterio.venta = false;
    } else if (venta) {
      console.error('procesaQueryString - Parámetro venta no válido');
      reject({msg: 'VENTA_PARAMETER_NOT_VALID'});
    }

    // Se comprueba que existe el nombre y se crea una expresión regular
    if (nombre) {
      console.log('procesaQueryString - El parámetro nombre es: ', nombre);
      criterio.nombre = new RegExp('^' + nombre, 'i');
    }

    // Se comprueba que existe el precio y se crea el criterio
    // también se comprueba si son números los parámetros
    if (precio) {
      console.log('procesaQueryString - El parámetro precio es: ', precio);
      var arr = precio.split('-');
      if ((arr[0] !== '') && (arr[1] !== '')) {
        if ((!isNaN(arr[0])) && (!isNaN(arr[1]))) {
          criterio.precio = { $gte: arr[0], $lte: arr[1]};
        } else {
          console.error('procesaQueryString - Parámetro precio no válido');
          reject({msg: 'PRECIO_PARAMETER_NOT_VALID'});
        }
      }
      if ((arr[0] === '') && (arr[1] !== '')) {
        if (!isNaN(arr[1])) {
          criterio.precio = { $lte: arr[1]};
        } else {
          console.error('procesaQueryString - Parámetro precio no válido');
          reject({msg: 'PRECIO_PARAMETER_NOT_VALID'});
        }
      }
      if ((arr[0] !== '') && (arr[1] === '')) {
        if (!isNaN(arr[0])) {
          criterio.precio = { $gte: arr[0]};
        } else {
          console.error('procesaQueryString - Parámetro precio no válido');
          reject({msg: 'PRECIO_PARAMETER_NOT_VALID'});
        }
      }
    }
    return resolve(criterio);
  });
}

module.exports = procesaQueryString;