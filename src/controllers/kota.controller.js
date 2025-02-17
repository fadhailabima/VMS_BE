const kotaModel = require("../models/Kota");

const getAllkota = async (req, res) => {
  try {
    const kota = await kotaModel.getAllkota();
    res.status(200).json(kota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKotaById = async (req, res) => {
  const { id } = req.params;

  try {
    const kota = await kotaModel.getKotaById(id);
    if (kota) {
      res.status(200).json(kota);
    } else {
      res.status(404).json({ error: "Kota not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKotaByProvinsiId = async (req, res) => {
  const { provinsiId } = req.params;

  try {
    const kota = await kotaModel.getKotaByProvinsiId(provinsiId);
    res.status(200).json(kota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createKota = async (req, res) => {
  const kotaData = req.body;

  try {
    const kota = await kotaModel.createKota(kotaData);
    res.status(201).json(kota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateKota = async (req, res) => {
  const { id } = req.params;
  const kotaData = req.body;

  try {
    const kota = await kotaModel.updateKota(id, kotaData);
    res.status(200).json(kota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteKota = async (req, res) => {
  const { id } = req.params;

  try {
    await kotaModel.deleteKota(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllkota,
  getKotaById,
  getKotaByProvinsiId,
  createKota,
  updateKota,
  deleteKota,
};
