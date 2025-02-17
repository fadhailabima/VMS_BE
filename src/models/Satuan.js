const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllsatuan = async () => {
  return await prisma.mst_satuan.findMany();
};

const getSatuanById = async (id) => {
  return await prisma.mst_satuan.findUnique({
    where: { id_satuan: Number(id) },
  });
};

const createSatuan = async (satuanData) => {
  return await prisma.mst_satuan.create({
    data: satuanData,
  });
};

const updateSatuan = async (id, satuanData) => {
  return await prisma.mst_satuan.update({
    where: { id_satuan: Number(id) },
    data: satuanData,
  });
};

const deleteSatuan = async (id) => {
  return await prisma.mst_satuan.delete({
    where: { id_satuan: Number(id) },
  });
};

module.exports = {
  getAllsatuan,
  getSatuanById,
  createSatuan,
  updateSatuan,
  deleteSatuan,
};
