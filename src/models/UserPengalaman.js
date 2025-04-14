const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPengalaman = async () => {
  try {
    return await prisma.$queryRaw`
        SELECT 
          "User_Pengalaman".id_pengalaman, 
          "User".nama_perusahaan, 
          "User_Pengalaman".nama_klien, 
          "User_Pengalaman".nama_proyek, 
          "User_Pengalaman".nilai_proyek, 
          "mst_kurs".nama_kurs, 
          "User_Pengalaman".no_kontrak, 
          "User_Pengalaman".kontak_klien, 
          "User_Pengalaman".tanggal_mulai, 
          "User_Pengalaman".tanggal_selesai 
        FROM "User_Pengalaman"
        LEFT JOIN "User" ON "User_Pengalaman".id_user = "User".id_user
        LEFT JOIN "mst_kurs" ON "User_Pengalaman".id_kurs = "mst_kurs".id_kurs
    `;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPengalamanById = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      SELECT 
          "User_Pengalaman"."id_pengalaman", 
          "User"."nama_perusahaan", 
          "User_Pengalaman"."nama_klien", 
          "User_Pengalaman"."nama_proyek", 
          "User_Pengalaman"."nilai_proyek", 
          "mst_kurs"."nama_kurs", 
          "mst_kurs"."id_kurs",
          "User_Pengalaman"."no_kontrak", 
          "User_Pengalaman"."kontak_klien", 
          "User_Pengalaman"."tanggal_mulai", 
          "User_Pengalaman"."tanggal_selesai" 
      FROM "User_Pengalaman"
      LEFT JOIN "User" ON "User_Pengalaman"."id_user" = "User"."id_user"
      LEFT JOIN "mst_kurs" ON "User_Pengalaman"."id_kurs" = "mst_kurs"."id_kurs"
      WHERE "User_Pengalaman"."id_pengalaman" = ${Number(id)}
    `;

    return response[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPengalamanByIdUser = async (userId) => {
  try {
    const response = await prisma.$queryRaw`
      SELECT 
          "User_Pengalaman"."id_pengalaman", 
          "User"."nama_perusahaan", 
          "User_Pengalaman"."nama_klien", 
          "User_Pengalaman"."nama_proyek", 
          "User_Pengalaman"."nilai_proyek", 
          "mst_kurs"."nama_kurs", 
          "User_Pengalaman"."no_kontrak", 
          "User_Pengalaman"."kontak_klien", 
          "User_Pengalaman"."tanggal_mulai", 
          "User_Pengalaman"."tanggal_selesai" 
      FROM "User_Pengalaman"
      LEFT JOIN "User" ON "User_Pengalaman"."id_user" = "User"."id_user"
      LEFT JOIN "mst_kurs" ON "User_Pengalaman"."id_kurs" = "mst_kurs"."id_kurs"
      WHERE "User"."id_user" = ${Number(userId)}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserPengalaman = async (pengalamanData) => {
  try {
    const {
      id_user,
      nama_klien,
      nama_proyek,
      nilai_proyek,
      id_kurs,
      no_kontrak,
      kontak_klien,
      tanggal_mulai,
      tanggal_selesai,
    } = pengalamanData;

    const newPengalaman = await prisma.user_Pengalaman.create({
      data: {
        id_user,
        nama_klien,
        nama_proyek,
        nilai_proyek,
        id_kurs,
        no_kontrak,
        kontak_klien,
        tanggal_mulai: new Date(tanggal_mulai),
        tanggal_selesai: new Date(tanggal_selesai),
      },
    });

    return newPengalaman;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserPengalaman = async (id, pengalamanData) => {
  try {
    const {
      nama_klien,
      nama_proyek,
      nilai_proyek,
      id_kurs,
      no_kontrak,
      kontak_klien,
      tanggal_mulai,
      tanggal_selesai,
    } = pengalamanData;

    const dataToUpdate = {
      nama_klien,
      nama_proyek,
      nilai_proyek,
      id_kurs,
      no_kontrak,
      kontak_klien,
      tanggal_mulai: new Date(tanggal_mulai),
      tanggal_selesai: new Date(tanggal_selesai),
    };

    const response = await prisma.user_Pengalaman.update({
      where: { id_pengalaman: Number(id) },
      data: dataToUpdate,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserPengalaman = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      DELETE FROM "User_Pengalaman" WHERE "id_pengalaman" = ${Number(id)}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserPengalaman,
  getUserPengalamanById,
  getUserPengalamanByIdUser,
  createUserPengalaman,
  updateUserPengalaman,
  deleteUserPengalaman,
};
