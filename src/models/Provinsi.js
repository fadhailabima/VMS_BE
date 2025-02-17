const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllprovinsi = async () => {
  return await prisma.mst_provinsi.findMany();
};

const getprovinsiById = async (id) => {
  return await prisma.mst_provinsi.findUnique({
    where: { id_provinsi: Number(id) },
  });
};

const createprovinsi = async (provinsiData) => {
  return await prisma.mst_provinsi.create({
    data: provinsiData,
  });
};

const updateprovinsi = async (id, provinsiData) => {
  return await prisma.mst_provinsi.update({
    where: { id_provinsi: Number(id) },
    data: provinsiData,
  });
};

const deleteprovinsi = async (id) => {
  return await prisma.mst_provinsi.delete({
    where: { id_provinsi: Number(id) },
  });
};

module.exports = {
  getAllprovinsi,
  getprovinsiById,
  createprovinsi,
  updateprovinsi,
  deleteprovinsi,
};
