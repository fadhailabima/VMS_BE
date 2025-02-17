const sertifikasiModel = require("../models/JenisSertifikasi");

const getAllSertifikasi = async (req, res) => {
  try {
    const sertifikasi = await sertifikasiModel.getAllSertifikasi();
    res.status(200).json(sertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSertifikasiById = async (req, res) => {
  const { id } = req.params;

  try {
    const sertifikasi = await sertifikasiModel.getSertifikasiById(id);
    if (sertifikasi) {
      res.status(200).json(sertifikasi);
    } else {
      res.status(404).json({ error: "Sertifikasi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSertifikasi = async (req, res) => {
  const sertifikasiData = req.body;

  try {
    const sertifikasi = await sertifikasiModel.createSertifikasi(
      sertifikasiData
    );
    res.status(201).json(sertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSertifikasi = async (req, res) => {
  const { id } = req.params;
  const sertifikasiData = req.body;

  try {
    const sertifikasi = await sertifikasiModel.updateSertifikasi(
      id,
      sertifikasiData
    );
    res.status(200).json(sertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSertifikasi = async (req, res) => {
  const { id } = req.params;

  try {
    await sertifikasiModel.deleteSertifikasi(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSertifikasi,
  getSertifikasiById,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
};
