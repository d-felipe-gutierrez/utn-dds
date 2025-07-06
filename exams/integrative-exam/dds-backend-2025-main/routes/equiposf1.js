const express = require("express");
const router = express.Router();

const equiposf1 = require('../models/equiposf1Model');
const { Op, ValidationError } = require("sequelize");

// Obtener todos los equipos F1 con filtros y paginación
router.get("/api/equiposf1", async function (req, res) {
  let where = {};
  if (req.query.NombreEquipo != undefined && req.query.NombreEquipo !== "") {
    where.NombreEquipo = {
      [Op.like]: "%" + req.query.NombreEquipo + "%",
    };
  }
  if (req.query.NombreCorredor != undefined && req.query.NombreCorredor !== "") {
    where.NombreCorredor = {
      [Op.like]: "%" + req.query.NombreCorredor + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await equiposf1.findAndCountAll({
    attributes: [
      "IdEquipo",
      "NombreEquipo",
      "NombreCorredor",
      "Presupuesto",
      "FechaDeInicio",
      "CampeonatosGanados"
    ],
    order: [["NombreEquipo", "ASC"]],
    where,
//    offset: (Pagina - 1) * TamañoPagina,
//    limit: TamañoPagina,
  });
  //return res.json({ Items: rows, RegistrosTotal: count });
  return res.json(rows);
});

// Obtener un equipo F1 por ID
router.get("/api/equiposf1/:id", async function (req, res) {
  let item = await equiposf1.findOne({
    attributes: [
      "IdEquipo",
      "NombreEquipo",
      "NombreCorredor",
      "Presupuesto",
      "FechaDeInicio",
      "CampeonatosGanados"
    ],
    where: { IdEquipo: req.params.id },
  });
  res.json(item);
});

// Crear un nuevo equipo F1
router.post("/api/equiposf1/", async (req, res) => {
  try {
    let item = await equiposf1.create({
      IdEquipo: req.body.IdEquipo,
      NombreEquipo: req.body.NombreEquipo,
      NombreCorredor: req.body.NombreCorredor,
      Presupuesto: req.body.Presupuesto,
      FechaDeInicio: req.body.FechaDeInicio,
      CampeonatosGanados: req.body.CampeonatosGanados
    });
    res.status(200).json(item.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      throw err;
    }
  }
});

// Actualizar un equipo F1
router.put("/api/equiposf1/:id", async (req, res) => {
  try {
    let item = await equiposf1.findOne({
      attributes: [
        "IdEquipo",
        "NombreEquipo",
        "NombreCorredor",
        "Presupuesto",
        "FechaDeInicio",
        "CampeonatosGanados"
      ],
      where: { IdEquipo: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Equipo F1 no encontrado" });
      return;
    }
    item.NombreEquipo = req.body.NombreEquipo;
    item.NombreCorredor = req.body.NombreCorredor;
    item.Presupuesto = req.body.Presupuesto;
    item.FechaDeInicio = req.body.FechaDeInicio;
    item.CampeonatosGanados = req.body.CampeonatosGanados;
    await item.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      throw err;
    }
  }
});

// Eliminar (baja física) un equipo F1
router.delete("/api/equiposf1/:id", async (req, res) => {
  try {
    let filasBorradas = await equiposf1.destroy({
      where: { IdEquipo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (err) {
    if (err instanceof ValidationError) {
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      throw err;
    }
  }
});

module.exports = router;
