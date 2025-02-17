const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPengalaman = async () => {
  try {
    return await prisma.$queryRaw`
        SELECT user_pengalaman.id_pengalaman, user.nama_perusahaan, user_pengalaman.nama_klien, user_pengalaman.nama_proyek, user_pengalaman.nilai_proyek, mst_kurs.nama_kurs, user_pengalaman.no_kontrak, user_pengalaman.kontak_klien, user_pengalaman.tanggal_mulai, user_pengalaman.tanggal_selesai FROM user_pengalaman
        LEFT JOIN User ON user_pengalaman.id_user = user.id_user
        LEFT JOIN mst_kurs ON user_pengalaman.id_kurs = mst_kurs.id_kurs
    `;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPengalamanById = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      SELECT 
          user_pengalaman.id_pengalaman, 
          user.nama_perusahaan, 
          user_pengalaman.nama_klien, 
          user_pengalaman.nama_proyek, 
          user_pengalaman.nilai_proyek, 
          mst_kurs.nama_kurs, 
          mst_kurs.id_kurs,
          user_pengalaman.no_kontrak, 
          user_pengalaman.kontak_klien, 
          user_pengalaman.tanggal_mulai, 
          user_pengalaman.tanggal_selesai 
      FROM user_pengalaman
      LEFT JOIN User ON user_pengalaman.id_user = user.id_user
      LEFT JOIN mst_kurs ON user_pengalaman.id_kurs = mst_kurs.id_kurs
      WHERE user_pengalaman.id_pengalaman = ${id}
    `;

    return response[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPengalamanByIdUser = async (userId) => {
  try {
    const response = await prisma.$queryRaw(Prisma.sql`
      SELECT 
          user_pengalaman.id_pengalaman, 
          user.nama_perusahaan, 
          user_pengalaman.nama_klien, 
          user_pengalaman.nama_proyek, 
          user_pengalaman.nilai_proyek, 
          mst_kurs.nama_kurs, 
          user_pengalaman.no_kontrak, 
          user_pengalaman.kontak_klien, 
          user_pengalaman.tanggal_mulai, 
          user_pengalaman.tanggal_selesai 
      FROM user_pengalaman
      LEFT JOIN User ON user_pengalaman.id_user = user.id_user
      LEFT JOIN mst_kurs ON user_pengalaman.id_kurs = mst_kurs.id_kurs
      WHERE user.id_user = ${userId}
    `);

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

    const response = await prisma.$queryRaw`
      INSERT INTO user_pengalaman (id_user, nama_klien, nama_proyek, nilai_proyek, id_kurs, no_kontrak, kontak_klien, tanggal_mulai, tanggal_selesai)
      VALUES (${id_user}, ${nama_klien}, ${nama_proyek}, ${nilai_proyek}, ${id_kurs}, ${no_kontrak}, ${kontak_klien}, ${tanggal_mulai}, ${tanggal_selesai})
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserPengalaman = async (id, pengalamanData) => {
  try {
    console.log(id);
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

    const response = await prisma.$queryRaw`
      UPDATE user_pengalaman
      SET 
          nama_klien = ${nama_klien},
          nama_proyek = ${nama_proyek},
          nilai_proyek = ${nilai_proyek},
          id_kurs = ${id_kurs},
          no_kontrak = ${no_kontrak},
          kontak_klien = ${kontak_klien},
          tanggal_mulai = ${tanggal_mulai},
          tanggal_selesai = ${tanggal_selesai}
      WHERE id_pengalaman = ${id}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserPengalaman = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      DELETE FROM user_pengalaman WHERE id_pengalaman = ${id}
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
