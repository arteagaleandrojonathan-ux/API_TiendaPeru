//app = aplication
const express = requiere("express");
const routes = requiere("./routes");

const app = express(); //Inicializamos la App

app.use(express.json()); //Comunicacion es  JSON

//Mensaje predeterminado
//http://miaplicacion.com/
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API REST ejecutandose correctamente",
  });
});

//Habilitamos las rutas de todos los modulos (index.js)
app.use("/api", routes);
module.exports = app;
