const { DataTypes } = require("sequelize");
const sequelize = require("./configurarSequelize");

const Contrato = sequelize.define(
  "Contrato",
  {
    IdContrato: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NombreContrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    FechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ImporteMensual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TelefonoContacto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    tableName: "contratos",
    timestamps: false,
  }
);

module.exports = Contrato;
