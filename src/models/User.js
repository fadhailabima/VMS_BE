const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmailOrUsername = async (identifier) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
};

const updateUserTokens = async (userId, accessToken, refreshToken) => {
  return await prisma.user.update({
    where: { id_user: userId },
    data: { accessToken, refreshToken },
  });
};

const getAllUsers = async () => {
  return await prisma.$queryRaw`
    SELECT 
      "User".id_user, 
      "User".nip, 
      "User".email, 
      "User".username, 
      "User".nama_perusahaan, 
      "User".nama_pic, 
      "User".no_telephone, 
      "User".npwp, 
      "mst_role".nama_role, 
      "User".id_status 
    FROM "User"
    LEFT JOIN "mst_role" ON "user".id_role = "mst_role".id_role
  `;
};

const getAllUserInternal = async () => {
  const users = await prisma.$queryRaw`
    SELECT 
      "User".id_user, 
      "User".nip, 
      "User".email, 
      "User".username, 
      "User".nama_perusahaan, 
      "User".nama_pic, 
      "User".no_telephone, 
      "User".npwp, 
      "mst_role".nama_role, 
      "User".id_status 
    FROM 
      "User"
    LEFT JOIN 
      "mst_role" ON "User".id_role = "mst_role".id_role
    WHERE 
      "User".id_role IN (2, 3);
  `;

  return users;
};

const getAllUserDRM = async () => {
  const users = await prisma.$queryRaw`
  SELECT 
    "User".id_user, 
    "User".nip, 
    "User".email, 
    "User".username, 
    "User".nama_perusahaan, 
    "User".nama_pic, 
    "User".no_telephone, 
    "User".npwp, 
    mst_role.nama_role, 
    mst_status.nama_status,
    "User".id_status
  FROM 
    "User"
  LEFT JOIN 
    mst_role ON "User".id_role = mst_role.id_role
  LEFT JOIN
    mst_status ON "User".id_status = mst_status.id_status
  WHERE 
    mst_role.nama_role = 'Vendor';
  `;

  return users;
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id_user: id },
    include: {
      role: {
        select: {
          nama_role: true,
        },
      },
    },
  });
};

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id_user: id },
    data: {
      ...userData,
      status: {
        connect: { id_status: userData.status }, // Assuming `statusId` is part of `userData`
      },
    },
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id_user: id },
  });
};

const getCurrentUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id_user: userId },
    select: {
      id_user: true,
      email: true,
      username: true,
      nama_perusahaan: true,
      nama_pic: true,
      no_telephone: true,
      npwp: true,
      role: {
        select: {
          nama_role: true,
        },
      },
      id_status: true,
    },
  });
};

const getAllVerifUserDRM = async () => {
  const users = await prisma.$queryRaw`
  SELECT 
    "User".id_user, 
    "User".nip, 
    "User".email, 
    "User".username, 
    "User".nama_perusahaan, 
    "User".nama_pic, 
    "User".no_telephone, 
    "User".npwp, 
    mst_role.nama_role, 
    mst_status.nama_status,
    "User".id_status
  FROM 
    "User"
  LEFT JOIN 
    mst_role ON "User".id_role = mst_role.id_role
  LEFT JOIN
    mst_status ON "User".id_status = mst_status.id_status
  WHERE 
    mst_role.nama_role = 'Vendor' AND mst_status.nama_status = 'Terverifikasi';
  `;

  return users;
};

module.exports = {
  getAllUsers,
  getAllUserInternal,
  getAllUserDRM,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmailOrUsername,
  updateUserTokens,
  getCurrentUser,
  getAllVerifUserDRM,
};
