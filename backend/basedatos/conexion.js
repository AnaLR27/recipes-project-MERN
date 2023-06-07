const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const conexion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi-blog");
    console.log("Base de datos mi-blog conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  conexion,
};
