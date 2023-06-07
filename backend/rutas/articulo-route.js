//* Importamos express para poder crear rutas
const express = require("express");
const router = express.Router();

//* Importamos el controlador de artículos
const articuloController = require("../controladores/articuloController");

//* Importamos el middleware multer para subir imágenes
const multer = require("multer");

//*  Creamos y configuramos el storage de multer (almacenamiento).
// Dentro de diskStorage, tenemos dos metodos: destination y filename. Destination es la función que se ejecuta cuando multer recibe una imagen, y filename es la función que se ejecuta cuando multer va a guardar la imagen. En destination, configuramos donde se guardan las imagenes, y en filename, configuramos el nombre de estas.

const almacenamiento = multer.diskStorage({
  // el primer método recibe una request, un file que es el archivo que se está subiendo, y el método cb, que es el que nos permite indicar el destino de subida de archivo. Dentro el primer parámetro siempre va aser null, y el segundo parámetro es el destino/carpeta.
  destination: function (req, file, cb) {
    cb(null, "./imagenes/articulos/");
  },
  filename: function (req, file, cb) {
    // cb es como si fuera un hook, que se ejecuta y hace la funcionalidad por detrás. Como primer parámetro va null, y como segundo parámetro, el nombre del archivo.
    // En este caso, comienza con la palabra articulo, luego le añadimos la fecha actual (formato timestamp), y luego el nombre original del archivo.
    cb(null, "articulo-" + Date.now() + "-" + file.originalname);
  },
});

//* Le decimos a multer que use el almacenamiento que acabamos de crear
const subidas = multer({ storage: almacenamiento });

//* rutas
router.post("/crear", articuloController.crear); //* crea un nuevo artículo
router.get("/articulos/:ultimos?", articuloController.listar); //* añadimos un parámetro opcional con el signo de interrogación //* lista todos los artículos
router.get("/articulo/:id", articuloController.buscarPorId); //* busca un artículo por su id
router.delete("/articulo/:id", articuloController.borrar); //* borra un artículo por su id
router.put("/articulo/:id", articuloController.editar); //* edita un artículo por su id
router.post(
  "/subir-imagen/:id",
  [subidas.single("file0")],
  articuloController.subir
); //* sube una imagen. En el array aplicamos el middleware.El método single es para subir un solo archivo. El parámetro que recibe es el nombre del campo que se va a enviar desde el formulario (es el campo que usamos en postman).
router.get("/imagen/:fichero", articuloController.imagen); //* busca una imagen por su fichero
router.get("/buscar/:busqueda", articuloController.buscador); //* buscador de artículos

module.exports = router;
