const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllKurs = async () => {
  return await prisma.mst_kurs.findMany();
};

const getKursById = async (id) => {
  return await prisma.mst_kurs.findUnique({
    where: { id_kurs: Number(id) },
  });
};

const createKurs = async (kursData) => {
  return await prisma.mst_kurs.create({
    data: kursData,
  });
};

const updateKurs = async (id, kursData) => {
  return await prisma.mst_kurs.update({
    where: { id_kurs: Number(id) },
    data: kursData,
  });
};

const deleteKurs = async (id) => {
  return await prisma.mst_kurs.delete({
    where: { id_kurs: Number(id) },
  });
};

module.exports = {
  getAllKurs,
  getKursById,
  createKurs,
  updateKurs,
  deleteKurs,
};
