const express = require("express");

// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body
const inicializarBase = require("./models/inicializarBase"); // inicializar base de datos

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Ruta /_isalive (para el test)
app.get("/_isalive", (req, res) => {
  res.send(`Ejecutandose desde: ${app.locals.fechaInicio}`);
});

// Middleware para manejar rutas no existentes (404) - debe estar al final
app.use((req, res) => {
  res.status(404).send("No encontrada!");
});

const categoriasmockRouter = require("./routes/categoriasmock");
app.use(categoriasmockRouter);
const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);
const usuariosRouter = require("./routes/usuarios");
app.use(usuariosRouter);

// levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date(); // fecha y hora inicio de aplicacion
if (require.main === module) {
  // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  inicializarBase().then(() => {
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  });
}

module.exports = app; // para testing
