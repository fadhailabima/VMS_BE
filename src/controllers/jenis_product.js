const jenisProductModel = require("../models/JenisProduct");

const getAllJenisProducts = async (req, res) => {
  try {
    const jenisProducts = await jenisProductModel.getAllJenisProducts();
    res.status(200).json(jenisProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJenisProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const jenisProduct = await jenisProductModel.getJenisProductById(id);
    if (jenisProduct) {
      res.status(200).json(jenisProduct);
    } else {
      res.status(404).json({ error: "Jenis product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createJenisProduct = async (req, res) => {
  const jenisProductData = req.body;

  try {
    const jenisProduct = await jenisProductModel.createJenisProduct(
      jenisProductData
    );
    res.status(201).json(jenisProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJenisProduct = async (req, res) => {
  const { id } = req.params;
  const jenisProductData = req.body;

  try {
    const jenisProduct = await jenisProductModel.updateJenisProduct(
      id,
      jenisProductData
    );
    res.status(200).json(jenisProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJenisProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await jenisProductModel.deleteJenisProduct(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllJenisProducts,
  getJenisProductById,
  createJenisProduct,
  updateJenisProduct,
  deleteJenisProduct,
};
