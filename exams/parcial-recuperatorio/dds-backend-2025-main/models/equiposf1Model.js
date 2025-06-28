const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const equiposf1 = sequelize.define(
    "equiposf1",
    {
        IdEquipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreEquipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        NombreCorredor: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre Corredor es requerido",
                },
                len: {
                    args: [7, 50],
                    msg: "Nombre Corredor debe tener entre 7 y 50 caracteres",
                },
            },
        },
        Presupuesto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        FechaDeInicio: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        CampeonatosGanados: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'equiposf1',
        timestamps: false
    }
);

module.exports = equiposf1;
