const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJenisProducts = async () => {
  return await prisma.mst_jenis_product.findMany();
};

const getJenisProductById = async (id) => {
  return await prisma.mst_jenis_product.findUnique({
    where: { id_jenis_product: Number(id) },
  });
};

const createJenisProduct = async (jenisProductData) => {
  return await prisma.mst_jenis_product.create({
    data: jenisProductData,
  });
};

const updateJenisProduct = async (id, jenisProductData) => {
  return await prisma.mst_jenis_product.update({
    where: { id_jenis_product: Number(id) },
    data: jenisProductData,
  });
};

const deleteJenisProduct = async (id) => {
  return await prisma.mst_jenis_product.delete({
    where: { id_jenis_product: Number(id) },
  });
};

module.exports = {
  getAllJenisProducts,
  getJenisProductById,
  createJenisProduct,
  updateJenisProduct,
  deleteJenisProduct,
};
