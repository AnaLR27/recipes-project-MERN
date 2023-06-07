import { useState } from "react";
import { Articulos } from "./components/pages/Articulos";
import { Rutas } from "./routing/Rutas";

function App() {
  return (
    <div className="layout">
      {/* <h1>Proyecto 3</h1> */}
      <Rutas />
    </div>
  );
}

export default App;
