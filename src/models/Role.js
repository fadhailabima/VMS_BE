const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRoles = async () => {
  return await prisma.mst_role.findMany();
};

const getRoleById = async (id) => {
  return await prisma.mst_role.findUnique({
    where: { id_role: Number(id) },
  });
};

const createRole = async (roleData) => {
  return await prisma.mst_role.create({
    data: roleData,
  });
};

const updateRole = async (id, roleData) => {
  return await prisma.mst_role.update({
    where: { id_role: Number(id) },
    data: roleData,
  });
};

const deleteRole = async (id) => {
  return await prisma.mst_role.delete({
    where: { id_role: Number(id) },
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
