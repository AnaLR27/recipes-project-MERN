import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const url = Global.url + "articulo/" + params.id;
    const { datos, cargando } = await Peticion(url, "GET");

    if (datos.status === "success") {
      console.log(articulo);
      setArticulo(datos.articulo);
      setCargando(cargando);
    } else {
      setCargando(cargando);
    }
  };

  return (
    <div className="jumbo">
      {cargando ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <div className="mascara">
            {articulo.imagen != "default.png" && (
              <img
                src={Global.url + "imagen/" + articulo.imagen}
                alt="Curso de React"
              />
            )}
            {articulo.imagen == "default.png" && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
                alt="Curso de React"
              />
            )}
          </div>
          <h1>{articulo.titulo}</h1>
          <p>{articulo.contenido}</p>
        </>
      )}
    </div>
  );
};
