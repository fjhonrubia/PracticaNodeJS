# Nodepop APIv1 Instrucciones de uso

## Instalación

Para llevar a cabo la instalación de Nodepop hace falta ejecutar el siguiente comando:

*npm install nodepop*

## Comprobación del código con JSHIT

Se ha creado un script dentro de Nodepop para poder ejecutar jshit dentro del proyecto excluyendo el directorio ./node_modules. Para pasarlo, se deberá ejecutar el siguiente comando:

*npm run jshint*

Esto llevará a cabo al instalación del API junto con todos los módulos que necesita

## Comprobación del código con JSCS

Se ha creado un script dentro de Nodepop para poder ejecutar jscs. Las excepciones se han incluido en el fichero .jscsignore. Para pasar estas validaciones hay que ejecutar el siguiente comando:

*npm run jscs*

## Creación de la base de datos y publicación de datos de ejemplo

Una vez que se ha instalado nodepop, es posible crear la base de datos MongoDB junto con sus colecciones y documentos mediante el siguiente comando:

*npm run installDB*

Esto creará, o eliminará y volverá a crear nuevamente la siguiente estructura de colecciones y documentos en MongoDB:

nodepop (colección)  
|   
|--anuncios (documento)  
|--usuarios (documento)  
|--pushtokens (documento)  

## Ejecución de nodepop (Producción y Desarrollo)

Para poner en ejecución nodepop en producción, hay que ejecutar el siguiente comando:

*npm start*

Es posible ejecutar nodepop en modo desarrollo de la siguiente forma:

*npm run dev*

## Llamadas al API

A continuación se indicará las distintas operaciones y resultados que pueden realizarse y obtenerse en nodepop.

### Registro de usuarios

Para poder registrar un nuevo usuario, se debe ejecutar la siguiente llamada de tipo POST como en el siguiente ejemplo:

*http://localhost:3001/apiv1/usuarios/es/registrarUsuario?nombre=usr1&mail=mail@usr1.com&pass=passUsr1*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**nombre-->** Indica el nombre con el que se registra el usuario.

**mail-->** Indica la dirección de correo con la que se registra el usuario. Se comprueba que se trata de un mail correcto y bien formado.

**pass-->** Indica el password para el usuario. Se almacenará encriptado en base de datos.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{usuario: {
	nombre: <Nombre del usuario dado de alta>,
	mail: <Mail del usuario dado de alta>,
	pass: <Password del usuario encriptado y almacenado en BD>
	}
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Autenticación de usuarios

Para poder realizar una autenticación de un usuario, hay que hacer una llamada de tipo POST como en el siguiente ejemplo:

*http://localhost:3001/apiv1/es/autenticacion?mail=mail@usr1.com&pass=passUsr1*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**mail-->** Indica la dirección de correo con la que se ha registrado el usuario. 

**pass-->** Indica el password para el usuario.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{ok: true,
token: <token para las peticiones que necesitan autenticación>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Almacenamiento de tokens push

Para poder llevar a cabo un almacenamiento de tokens push, hay que hacer una llamada de tipo PUT como en el siguiente ejemplo:

*http://localhost:3001/apiv1/tokens/es/registrarToken?token=pushtoken&usuario=usr1*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**token-->** Indica el token push que se desea almacenar en la base de datos.

**pass-->** Indica el usuario que asociado al token a almacenar.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
token: <token push almacenado en la base de datos>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Listado de anuncios

Para poder listar los anuncios almacenados, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3001/apiv1/anuncios/es/listaAnuncios?nombre=articulo1&venta=true&precio=10-50&tag=work&start=1&limit=2&sort=nombre&token=tokenusuario*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**nombre-->** Indica la cadena de texto por la que debe comenzar el nombre del artículo.

**venta-->** Puede tener los valores TRUE (se trata de un artículo de venta) o FALSE (se trata de un artículo de compra).

**precio-->** Indica el rango de precios del artículo que se está buscando. Los posibles usos que puede tener son:

				<Número1>-<Número2> : Busca los artículos cuyo precio es mayor que Número1 y menor que Número2.
				-<Número2> : Busca los artículos cuyo precio máximo es Número2
				<Número1>- : Busca los artículos cuyo precio mínimo es Número1
				
**tag-->** Indica el tag que tiene que contener el artículo.
**token-->** Indica el valor del token del usuario que realiza la petición.

*Opciones de paginación*

**star-->** Indica en que artículo comienza el listado devuelto.

**limit-->** Indica el número máximo de artículos que se tiene que retornar.

**sort-->** Indica el campo por el que tienen que ordenarse los resultados obtenidos.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
anuncios: <lista de anuncios devueltas como resultado>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Listado de tags

Para poder listar los tags almacenados, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3001/apiv1/anuncios/es/listaTags?token=tokenusuario*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**token-->** Indica el valor del token del usuario que realiza la petición.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
tags: <lista de tags devueltos como resultado>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Recuperación de imágenes

Para poder recuperar una imagen, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3000/apiv1/anuncios/es/images/iphone.jpeg?token=tokenusuario*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**imagen-->**  Indica el nombre de la imagen que se quiere recuperar.

**token-->** Indica el valor del token del usuario que realiza la petición.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna la imagen que se ha solicitado. Estas, deben estar ubicadas en el directorio **/public/images**.

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}