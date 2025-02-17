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
  // return await prisma.user.findMany();
  return await prisma.$queryRaw`
  SELECT user.id_user, user.nip, user.email, user.username, user.nama_perusahaan, user.nama_pic, user.no_telephone, user.npwp, mst_role.nama_role, user.id_status FROM user
  LEFT JOIN mst_role ON user.id_role = mst_role.id_role
  
`;
};

const getAllUserInternal = async () => {
  // return await prisma.user.findMany();
  const users = await prisma.$queryRaw`
  SELECT 
    user.id_user, 
    user.nip, 
    user.email, 
    user.username, 
    user.nama_perusahaan, 
    user.nama_pic, 
    user.no_telephone, 
    user.npwp, 
    mst_role.nama_role, 
    user.id_status 
  FROM 
    user
  LEFT JOIN 
    mst_role ON user.id_role = mst_role.id_role
  WHERE 
    user.id_role IN (2, 3);
`;

  return users;
};

const getAllUserDRM = async () => {
  const users = await prisma.$queryRaw`
  SELECT 
    user.id_user, 
    user.nip, 
    user.email, 
    user.username, 
    user.nama_perusahaan, 
    user.nama_pic, 
    user.no_telephone, 
    user.npwp, 
    mst_role.nama_role, 
    mst_status.nama_status,
    user.id_status
  FROM 
    user
  LEFT JOIN 
    mst_role ON user.id_role = mst_role.id_role
  LEFT JOIN
    mst_status ON user.id_status = mst_status.id_status
  WHERE 
    user.id_role = 1;
`;

  return users;
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id_user: id },
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
};
