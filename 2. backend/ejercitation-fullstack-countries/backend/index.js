const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize'); // Importamos Sequelize y DataTypes
const app = express();
const port = 3000; // Puerto donde correra nuestro backend

// Middlewares
app.use(cors()); // Habilita CORS pata todas las rutas
app.use(express.json()); // Permite que Express lea JSON en las peticiones

// ---Configuracion de Sequelize---
// Creamos una instancia de Sequelize conectando a un archivo SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // El archivo de la base de datos se llamara database.sqlite
});

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        uniquie: true // Aseguramos que el nombre del pais sea unico
    },
    flag: {
        type: DataTypes.STRING, // Guardaremos la URL de la bandera
        allowNull: true // Podria ser que no tengamos la URL para todos
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    currency: {
        type: DataTypes.STRING, // Podriamos guardar el codigo o el nombre de la moneda
        allowNull: true
    }
});

// Sincronizar el modelo con la base de datos
sequelize.sync({ force: true })
    .then(() => {
        console.log('Base de datos sincronizada. Tablas creadas/actualizadas.');
        seedDatabase(); // LLamamos a la funcion seeding
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });

// ---Funcion para cargar datos iniciales (Seeding)---
async function seedDatabase() {
    try {
        const count = await Country.count();
        
        if (count === 0) {
            console.log('Base de datos vacía. Insertando datos iniciales...');
            const latinAmericanCountries = [
                {name: 'Argentina', flag: 'https://flagcdn.com/ar.svg', population: 45376763, currency: 'ARS'},
                { name: 'Bolivia', flag: 'https://flagcdn.com/bo.svg', population: 11693337, currency: 'BOB' },
                { name: 'Brasil', flag: 'https://flagcdn.com/br.svg', population: 212559417, currency: 'BRL' },
                { name: 'Chile', flag: 'https://flagcdn.com/cl.svg', population: 19116209, currency: 'CLP' },
                { name: 'Colombia', flag: 'https://flagcdn.com/co.svg', population: 50882884, currency: 'COP' },
                { name: 'Ecuador', flag: 'https://flagcdn.com/ec.svg', population: 17643060, currency: 'USD' },
                { name: 'México', flag: 'https://flagcdn.com/mx.svg', population: 128932753, currency: 'MXN' }, 
                { name: 'Paraguay', flag: 'https://flagcdn.com/py.svg', population: 7132530, currency: 'PYG' }, 
                { name: 'Perú', flag: 'https://flagcdn.com/pe.svg', population: 32971846, currency: 'PEN' }, 
                { name: 'Uruguay', flag: 'https://flagcdn.com/uy.svg', population: 3473727, currency: 'UYU' } 
            ];
            
            await Country.bulkCreate(latinAmericanCountries);
            console.log('Datos iniciales insertados correctamente.');
        } else {
            console.log('La base de datos ya contiene datos. Saltando inserción inicial.');
        }
    } catch (error) {
        console.error('Error al insertar datos iniciales:', error);
    }
}

// ---Rutas---
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend de Países Funcional!');
});

// Ruta para obtener todos los paises
app.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.findAll(); // Busca todos los registros en la tabla Country
        res.json(countries); // Eniva la lista de paises como JSON
    } catch (error) {
        console.error('Error al obtener paises:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener paises.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});