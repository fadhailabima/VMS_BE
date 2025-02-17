const documentModel = require("../models/JenisDocument");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentModel.getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await documentModel.getDocumentById(id);
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDocument = async (req, res) => {
  const documentData = req.body;

  try {
    const document = await documentModel.createDocument(documentData);
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDocument = async (req, res) => {
  const { id } = req.params;
  const documentData = req.body;

  try {
    const document = await documentModel.updateDocument(id, documentData);
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    await documentModel.deleteDocument(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
