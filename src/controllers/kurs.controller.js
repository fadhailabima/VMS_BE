const kursModel = require("../models/Kurs");

const getAllKurs = async (req, res) => {
  try {
    const kurs = await kursModel.getAllKurs();
    res.status(200).json(kurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKursById = async (req, res) => {
  const { id } = req.params;

  try {
    const kurs = await kursModel.getKursById(id);
    if (kurs) {
      res.status(200).json(kurs);
    } else {
      res.status(404).json({ error: "Kurs not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createKurs = async (req, res) => {
  const kursData = req.body;

  try {
    const kurs = await kursModel.createKurs(kursData);
    res.status(201).json(kurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateKurs = async (req, res) => {
  const { id } = req.params;
  const kursData = req.body;

  try {
    const kurs = await kursModel.updateKurs(id, kursData);
    res.status(200).json(kurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteKurs = async (req, res) => {
  const { id } = req.params;

  try {
    await kursModel.deleteKurs(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllKurs,
  getKursById,
  createKurs,
  updateKurs,
  deleteKurs,
};
