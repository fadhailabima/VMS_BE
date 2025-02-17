const provinsiModel = require("../models/Provinsi");

const getAllprovinsi = async (req, res) => {
  try {
    const provinsi = await provinsiModel.getAllprovinsi();
    res.status(200).json(provinsi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getprovinsiById = async (req, res) => {
  const { id } = req.params;

  try {
    const provinsi = await provinsiModel.getprovinsiById(id);
    if (provinsi) {
      res.status(200).json(provinsi);
    } else {
      res.status(404).json({ error: "provinsi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createprovinsi = async (req, res) => {
  const provinsiData = req.body;

  try {
    const provinsi = await provinsiModel.createprovinsi(provinsiData);
    res.status(201).json(provinsi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateprovinsi = async (req, res) => {
  const { id } = req.params;
  const provinsiData = req.body;

  try {
    const provinsi = await provinsiModel.updateprovinsi(id, provinsiData);
    res.status(200).json(provinsi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteprovinsi = async (req, res) => {
  const { id } = req.params;

  try {
    await provinsiModel.deleteprovinsi(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllprovinsi,
  getprovinsiById,
  createprovinsi,
  updateprovinsi,
  deleteprovinsi,
};
