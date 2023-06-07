import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no-enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const url = Global.url + "articulo/" + params.id;
    const { datos } = await Peticion(url, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    } else {
      console.log(error);
    }
    console.log(datos);
  };

  const editarArticulo = async (e) => {
    e.preventDefault();
    const nuevoArticulo = formulario;
    console.log(nuevoArticulo);

    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    //subir imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articulo._id,
        "POST",
        formData,
        true
      );

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Editar receta</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong className="form-group">
        {resultado === "guardado" ? "Articulo guardado con éxito" : ""}
        {resultado === "error"
          ? "Los datos proporcionados son incorrectos"
          : ""}
      </strong>

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen != "default.png" && (
              <img
                src={Global.url + "imagen/" + articulo.imagen}
                alt="Imagen no encontrada"
              />
            )}
            {articulo.imagen == "default.png" && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
                alt="Imagen no encontrada"
              />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};
