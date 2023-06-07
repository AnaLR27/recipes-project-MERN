const validator = require("validator");

const validarArticulo = (parametros) => {
  // da true si NO está vacío y si tiene una longitud mayor a 5
  let validarTitulo =
    !validator.isEmpty(parametros.titulo) &&
    validator.isLength(parametros.titulo, { min: 5, max: undefined });
  // da true si NO está vacío
  let validarContenido = !validator.isEmpty(parametros.contenido);

  if (!validarTitulo || !validarContenido) {
    throw new Error("No se ha validado la información");
  }
};

module.exports = {
  validarArticulo,
};
