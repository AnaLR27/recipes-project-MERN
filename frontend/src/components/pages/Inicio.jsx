import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <>
      <div className="jumbo">
        <h1>Bienvenido al recetario con React</h1>
        <p>
          Blog de recetas desarrollado con el MERN Stack (MongoDB, Express,
          React y NodeJS)
        </p>
        <Link to={"/articulos"}>
          <button className="button">Ver recetas</button>
        </Link>
      </div>
    </>
  );
};
