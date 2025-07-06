const express = require('express');
const { Op } = require('sequelize');
const Contrato = require('../models/contratosModel');

const router = express.Router();

router.get('/api/contratos', async (req, res) => {
  try {
    const { NombreContrato } = req.query;
    let where = {};

    if (NombreContrato) {
      where.NombreContrato = {
        [Op.like]: `%${NombreContrato}%`
      };
    }

    const contratos = await Contrato.findAll({
      where,
      order: [['NombreContrato', 'ASC']]
    });

    res.json(contratos);
  } catch (error) {
    console.error('Error en GET /api/contratos:', error);
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
});

router.post('/api/contratos', async (req, res) => {
  try {
    const nuevoContrato = await Contrato.create(req.body);
    res.status(201).json(nuevoContrato);
  } catch (error) {
    console.error('Error en POST /api/contratos:', error);
    res.status(500).json({ error: 'Error al crear contrato' });
  }
});

module.exports = router;