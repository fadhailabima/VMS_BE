const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllstatus = async () => {
  return await prisma.mst_status.findMany();
};

const getStatusById = async (id) => {
  return await prisma.mst_status.findUnique({
    where: { id_status: Number(id) },
  });
};

const createStatus = async (statusData) => {
  return await prisma.mst_status.create({
    data: statusData,
  });
};

const updateStatus = async (id, statusData) => {
  return await prisma.mst_status.update({
    where: { id_status: Number(id) },
    data: statusData,
  });
};

const deleteStatus = async (id) => {
  return await prisma.mst_status.delete({
    where: { id_status: Number(id) },
  });
};

module.exports = {
  getAllstatus,
  getStatusById,
  createStatus,
  updateStatus,
  deleteStatus,
};
