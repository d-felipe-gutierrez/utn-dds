const express = require('express');

// Crear servidor
const app = express();

// Invocar BD inicializada
require('./models/inicializarBase');

// Leer json en el body
app.use(express.json());

// Controlar ruta raiz
app.get('/', (req, res) => {
    res.send('Backend inicial dds-backend');
});

const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);

// Levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Sistema conectado al puerto ${port}.`);
})

// Cargar modulo de ruta
const categoriasmockRouter = require('./routes/categoriasmock');
app.use(categoriasmockRouter);