const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllDocuments = async () => {
  return await prisma.mst_jenis_document.findMany();
};

const getDocumentById = async (id) => {
  return await prisma.mst_jenis_document.findUnique({
    where: { id_jenis_document: Number(id) },
  });
};

const createDocument = async (documentData) => {
  return await prisma.mst_jenis_document.create({
    data: documentData,
  });
};

const updateDocument = async (id, documentData) => {
  return await prisma.mst_jenis_document.update({
    where: { id_jenis_document: Number(id) },
    data: documentData,
  });
};

const deleteDocument = async (id) => {
  return await prisma.mst_jenis_document.delete({
    where: { id_jenis_document: Number(id) },
  });
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
