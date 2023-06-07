const { validarArticulo } = require("../helpers/validarHelper");

const Articulo = require("../modelos/Articulo");

const fs = require("fs");

const path = require("path");

// Crear artículo. METODO POST
const crear = (req, res) => {
  let parametros = req.body;

  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  const articulo = new Articulo(parametros);

  articulo.save((error, articuloGuardado) => {
    if (error || !articuloGuardado) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el artículo",
      });
    }

    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Artículo guardado correctamente",
    });
  });
};

// Devuelve todos los artículos. METODO GET
const listar = (req, res) => {
  let consulta = Articulo.find({});
  if (req.params.ultimos) {
    consulta.limit(2);
  }
  consulta
    .sort({
      fecha: -1,
    })
    .exec((error, articulos) => {
      if (error || !articulos) {
        return res.status(404).json({
          status: "error",
          mensaje: "No se han encontrado artículos",
        });
      }
      return res.status(200).send({
        status: "success",
        contador: articulos.length,
        parametro_url: req.params.ultimos,
        articulos,
      });
    });
};

// Saca un artículo por su id. METODO GET
const buscarPorId = (req, res) => {
  let id = req.params.id;
  Articulo.findById(id, (error, articulo) => {
    if (error || !articulo) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }
    return res.status(200).json({
      status: "success",
      articulo,
    });
  });
};

// Borra un artículo por su id. METODO DELETE
const borrar = (req, res) => {
  let articuloId = req.params.id;
  Articulo.findByIdAndDelete({ _id: articuloId }, (error, articuloBorrado) => {
    if (error || !articuloBorrado) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al borrar el artículo",
      });
    }

    return res.status(200).json({
      status: "success",
      articulo: articuloBorrado,
      mensaje: "Artículo borrado correctamente",
    });
  });
};

// Actualiza/edita un artículo por su id. METODO PUT
const editar = (req, res) => {
  let articuloId = req.params.id;

  let parametros = req.body;

  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  Articulo.findOneAndUpdate(
    {
      _id: articuloId,
    },
    parametros,
    { new: true },
    (error, articuloActualizado) => {
      if (error || !articuloActualizado) {
        return res.status(500).json({
          status: "error",
          mensaje: "Error al actualizar el artículo",
        });
      }

      return res.status(200).json({
        status: "success",
        articulo: articuloActualizado,
        mensaje: "Artículo actualizado correctamente",
      });
    }
  );
};

// Subida de archivos. METODO POST
const subir = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha subido ningún archivo",
    });
  }

  let nombreaArchivo = req.file.filename;

  let extension = nombreaArchivo.split(".").pop();

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "La extensión de la imagen no es válida",
      });
    });
  } else {
    let articuloId = req.params.id;

    Articulo.findOneAndUpdate(
      {
        _id: articuloId,
      },
      { imagen: req.file.filename },
      { new: true },
      (error, articuloActualizado) => {
        if (error || !articuloActualizado) {
          return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar el artículo",
          });
        }
        return res.status(200).json({
          status: "success",
          articulo: articuloActualizado,
          mensaje: "Artículo actualizado correctamente",
          fichero: req.file,
        });
      }
    );
  }
};

// Sacar la imagen. METODO GET
const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta_fisica = "./imagenes/articulos/" + fichero;

  fs.stat(ruta_fisica, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta_fisica));
    } else {
      return res.status(404).json({
        status: "error",
        mensaje: "La imagen no existe",
      });
    }
  });
};

// Hacer un buscador. METODO GET
const buscador = (req, res) => {
  let busqueda = req.params.busqueda;
  Articulo.find({
    $or: [
      { titulo: { $regex: busqueda, $options: "i" } },
      { contenido: { $regex: busqueda, $options: "i" } },
    ],
  })
    .sort({ fecha: -1 })
    .exec((error, articulosEncontrados) => {
      if (error || !articulosEncontrados || articulosEncontrados.length <= 0) {
        return res.status(500).json({
          status: "error",
          mensaje: "Error al realizar la búsqueda",
        });
      }

      return res.status(200).json({
        status: "success",
        articulos: articulosEncontrados,
      });
    });
};

module.exports = {
  crear,
  listar,
  buscarPorId,
  borrar,
  editar,
  subir,
  imagen,
  buscador,
};
