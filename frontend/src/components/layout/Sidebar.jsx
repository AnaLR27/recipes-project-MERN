import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [buscar, setBuscar] = useState("");
  const navegar = useNavigate();

  const hacerBusqueda = (e) => {
    e.preventDefault();
    let miBusqueda = e.target.search_field.value;
    navegar("buscar/" + miBusqueda, { replace: true });
  };

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={hacerBusqueda}>
          <input type="text" id="search_field" />
          <button type="submit" id="search">
            Buscar
          </button>
        </form>
      </div>
    </aside>
  );
};
