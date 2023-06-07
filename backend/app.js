// Importar el conector de la base de datos
const { conexion } = require("./basedatos/conexion");
// Importar express
const express = require("express");
// Importar cors
const cors = require("cors");

// Iniciar la App
console.log("App de node iniciada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 8000;

// Configurar cors
app.use(cors());

// Convertir el body de las peticiones http a json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear rutas
const articuloRoute = require("./rutas/articulo-route");

// cargo las rutas
app.use("/api", articuloRoute);

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
