const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserSertifikasi = async () => {
  try {
    return await prisma.$queryRaw`
      SELECT 
        "User_Sertifikasi".id_sertifikasi, 
        "User".nama_perusahaan, 
        "User_Sertifikasi".nama_sertifikasi, 
        "mst_jenis_sertifikasi".nama_sertifikasi AS jenis_sertifikasi, 
        "User_Sertifikasi".tanggal_berlaku, 
        "User_Sertifikasi".tanggal_berakhir, 
        "User_Sertifikasi".file  
      FROM 
        "User_Sertifikasi"
      LEFT JOIN 
        "User" ON "User_Sertifikasi".id_user = "User".id_user 
      LEFT JOIN 
        "mst_jenis_sertifikasi" ON "User_Sertifikasi".id_jenis_sertifikasi = "mst_jenis_sertifikasi".id_jenis_sertifikasi
    `;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserSertifikasiById = async (id) => {
  try {
    return await prisma.$queryRaw`
      SELECT 
        "User_Sertifikasi".id_sertifikasi, 
        "User".nama_perusahaan, 
        "User_Sertifikasi".nama_sertifikasi, 
        "User_Sertifikasi".id_jenis_sertifikasi, 
        "mst_jenis_sertifikasi".nama_sertifikasi AS jenis_sertifikasi, 
        "User_Sertifikasi".tanggal_berlaku, 
        "User_Sertifikasi".tanggal_berakhir, 
        "User_Sertifikasi".file 
      FROM 
        "User_Sertifikasi"
      LEFT JOIN 
        "User" ON "User_Sertifikasi".id_user = "User".id_user 
      LEFT JOIN 
        "mst_jenis_sertifikasi" ON "User_Sertifikasi".id_jenis_sertifikasi = "mst_jenis_sertifikasi".id_jenis_sertifikasi
      WHERE 
        "User_Sertifikasi".id_sertifikasi = ${Number(id)}
    `;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserSertifikasiByIdUser = async (userId) => {
  try {
    const response = await prisma.$queryRaw(Prisma.sql`
      SELECT 
          "User_Sertifikasi".id_sertifikasi, 
          "User".nama_perusahaan, 
          "User_Sertifikasi".nama_sertifikasi, 
          "mst_jenis_sertifikasi".nama_sertifikasi AS jenis_sertifikasi, 
          "User_Sertifikasi".tanggal_berlaku, 
          "User_Sertifikasi".tanggal_berakhir, 
          "User_Sertifikasi".file
      FROM "User_Sertifikasi"
      LEFT JOIN "User" ON "User_Sertifikasi".id_user = "User".id_user
      LEFT JOIN "mst_jenis_sertifikasi" ON "User_Sertifikasi".id_jenis_sertifikasi = "mst_jenis_sertifikasi".id_jenis_sertifikasi
      WHERE "User".id_user = ${Number(userId)}
    `);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserSertifikasiByIdJenisSertifikasi = async (jenisSertifikasiId) => {
  try {
    return await prisma.$queryRaw`
      SELECT 
        "User_Sertifikasi".id_sertifikasi, 
        "User".nama_perusahaan, 
        "User_Sertifikasi".nama_sertifikasi, 
        "mst_jenis_sertifikasi".nama_sertifikasi AS jenis_sertifikasi, 
        "User_Sertifikasi".tanggal_berlaku, 
        "User_Sertifikasi".tanggal_berakhir 
      FROM 
        "User_Sertifikasi"
      LEFT JOIN 
        "User" ON "User_Sertifikasi".id_user = "User".id_user 
      LEFT JOIN 
        "mst_jenis_sertifikasi" ON "User_Sertifikasi".id_jenis_sertifikasi = "mst_jenis_sertifikasi".id_jenis_sertifikasi
      WHERE 
        "User_Sertifikasi".id_jenis_sertifikasi = ${Number(jenisSertifikasiId)}
    `;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserSertifikasi = async (sertifikasiData) => {
  try {
    const {
      id_user,
      nama_sertifikasi,
      id_jenis_sertifikasi,
      tanggal_berlaku,
      tanggal_berakhir,
      file,
      updatedAt,
    } = sertifikasiData;

    const newSertifikasi = await prisma.user_Sertifikasi.create({
      data: {
        id_user,
        nama_sertifikasi,
        id_jenis_sertifikasi,
        tanggal_berlaku: new Date(tanggal_berlaku),
        tanggal_berakhir: new Date(tanggal_berakhir),
        file,
        updatedAt: new Date(updatedAt),
      },
    });

    return newSertifikasi;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserSertifikasi = async (id, sertifikasiData) => {
  try {
    const {
      nama_sertifikasi,
      id_jenis_sertifikasi,
      tanggal_berlaku,
      tanggal_berakhir,
      file,
    } = sertifikasiData;

    const dataToUpdate = {
      nama_sertifikasi,
      id_jenis_sertifikasi,
      tanggal_berlaku: new Date(tanggal_berlaku),
      tanggal_berakhir: new Date(tanggal_berakhir),
      updatedAt: new Date(),
    };

    if (file) {
      dataToUpdate.file = file;
    }

    const response = await prisma.user_Sertifikasi.update({
      where: { id_sertifikasi: id },
      data: dataToUpdate,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserSertifikasi = async (id) => {
  try {
    const response = await prisma.$queryRaw`
          DELETE FROM user_sertifikasi WHERE id_sertifikasi = ${id}
        `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserSertifikasi,
  getUserSertifikasiById,
  getUserSertifikasiByIdUser,
  getUserSertifikasiByIdJenisSertifikasi,
  createUserSertifikasi,
  updateUserSertifikasi,
  deleteUserSertifikasi,
};
