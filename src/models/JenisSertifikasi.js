const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSertifikasi = async () => {
  return await prisma.mst_jenis_sertifikasi.findMany();
};

const getSertifikasiById = async (id) => {
  return await prisma.mst_jenis_sertifikasi.findUnique({
    where: { id_jenis_sertifikasi: Number(id) },
  });
};

const createSertifikasi = async (sertifikasiData) => {
  return await prisma.mst_jenis_sertifikasi.create({
    data: sertifikasiData,
  });
};

const updateSertifikasi = async (id, sertifikasiData) => {
  return await prisma.mst_jenis_sertifikasi.update({
    where: { id_jenis_sertifikasi: Number(id) },
    data: sertifikasiData,
  });
};

const deleteSertifikasi = async (id) => {
  return await prisma.mst_jenis_sertifikasi.delete({
    where: { id_jenis_sertifikasi: Number(id) },
  });
};

module.exports = {
  getAllSertifikasi,
  getSertifikasiById,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
};
