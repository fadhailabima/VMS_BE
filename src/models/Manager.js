const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const Manager = {
  getAllUserPO: async () => {
    try {
      const allUserPO = await prisma.$queryRaw`
            SELECT 
            User_PO.id_po,
            User_PO.no_po,
            User_PO.no_penawaran,
            User.nama_perusahaan,
            User_PO.tanggal_dibuat_po,
            User_PO.tanggal_mulai_po,
            User_PO.tanggal_berakhir_po,
            User_PO.Terms_of_Delivery,
            User_PO.Terms_of_Payment,
            User_PO.description,
            status_proses_penawaran.nama_status AS "Status Proses Penawaran",
            status_penawaran.nama_status AS "Status Penawaran"
            FROM User_PO 
            LEFT JOIN User_Penawaran ON User_PO.no_penawaran = User_Penawaran.no_penawaran
            LEFT JOIN User ON User_Penawaran.id_user = User.id_user
            LEFT JOIN mst_status as status_penawaran ON User_Penawaran.id_status_penawaran = status_penawaran.id_status
            LEFT JOIN mst_status as status_proses_penawaran ON User_Penawaran.id_status_proses_penawaran = status_proses_penawaran.id_status
            WHERE User_Penawaran.id_status_proses_penawaran = 5 OR User_Penawaran.id_status_proses_penawaran = 4
            `;

      return allUserPO;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getDetailUserPO: async (id_po) => {
    try {
      const detailUserPO = await prisma.$queryRaw`
            SELECT 
            User_PO.id_po,
            User_PO.no_po,
            User_PO.no_penawaran,
            User.nama_perusahaan,
            User_PO.tanggal_dibuat_po,
            User_PO.tanggal_mulai_po,
            User_PO.tanggal_berakhir_po,
            User_PO.Terms_of_Delivery,
            User_PO.Terms_of_Payment,
            User_PO.description
            FROM User_PO 
            LEFT JOIN User_Penawaran ON User_PO.no_penawaran = User_Penawaran.no_penawaran
            LEFT JOIN User ON User_Penawaran.id_user = User.id_user
            WHERE User_PO.id_po = ${id_po}
            `;

      return detailUserPO;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = Manager;
