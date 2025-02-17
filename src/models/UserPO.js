const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPO = async () => {
  //   return await prisma.$queryRaw`
  //       SELECT
  //          user_po.no_po,
  //          user_penawaran.no_penawaran,
  //          user.nama_perusahaan,
  //          user_product.brand,
  //          user_po.tanggal_dibuat_po,
  //          user_po.tanggal_mulai_po,
  //          user_po.tanggal_berakhir_po,
  //          user_po.Terms_of_Payment,
  //          user_po.Terms_of_Delivery,
  //          user_po.description
  //       FROM user_po
  //       LEFT JOIN user ON user_po.id_user = user.id_user
  //       LEFT JOIN user_penawaran ON user_po.no_penawaran = user_penawaran.no_penawaran
  //       LEFT JOIN user_product ON user_po.id_product = user_product.id_product
  //     `;
};

const getUserPO = async () => {
  return await prisma.$queryRaw`
      SELECT 
        user_po.id_po,
         user_po.no_po,
         user_penawaran.no_penawaran,
         user.nama_perusahaan,
         user_product.brand,
         user_po.tanggal_dibuat_po,
         user_po.tanggal_mulai_po,
         user_po.tanggal_berakhir_po,
         user_po.Terms_of_Payment,
         user_po.Terms_of_Delivery,
         user_po.description
      FROM user_po
      LEFT JOIN user ON user_po.id_user = user.id_user
      LEFT JOIN user_penawaran ON user_po.no_penawaran = user_penawaran.no_penawaran
      LEFT JOIN user_product ON user_po.id_product = user_product.id_product
    `;
};

const createUserPO = async (data) => {
  return await prisma.user_PO.create({
    data: {
      no_po: data.no_po,
      no_penawaran: data.no_penawaran,
      id_user: data.id_user,
      id_product: data.id_product,
      tanggal_dibuat_po: data.tanggal_dibuat_po,
      tanggal_mulai_po: data.tanggal_mulai_po,
      tanggal_berakhir_po: data.tanggal_berakhir_po,
      Terms_of_Payment: data.Terms_of_Payment,
      Terms_of_Delivery: data.Terms_of_Delivery,
      description: data.description,
    },
  });
};

const getUserPODetail = async (id_po) => {
  // console.log("id_po", id_po);
  const data = await prisma.user_PO.findUnique({
    where: {
      id_po: Number(id_po),
    },
    include: {
      penawaran: {
        include: { status_penawaran: true, status_proses_penawaran: true },
      },
      user: true,
      product: true,
    },
  });

  return data;
  //   return await prisma.$queryRaw`
  //   SELECT
  //     user_po.no_po,
  //     user_penawaran.no_penawaran,
  //     user.nama_perusahaan,
  //     user_product.brand,
  //     user_po.tanggal_dibuat_po,
  //     user_po.tanggal_mulai_po,
  //     user_po.tanggal_berakhir_po,
  //     user_po.Terms_of_Payment,
  //     user_po.Terms_of_Delivery,
  //     user_po.description
  //   FROM user_po
  //   LEFT JOIN user ON user_po.id_user = user.id_user
  //   LEFT JOIN user_penawaran ON user_po.no_penawaran = user_penawaran.no_penawaran
  //   LEFT JOIN user_product ON user_po.id_product = user_product.id_product
  //   WHERE user_po.no_po = ${no_po}
  // `;
};

const deleteUserPO = async (id_po) => {
  return await prisma.user_PO.delete({
    where: {
      id_po: id_po,
    },
  });
};

const updateUserPO = async (id_po, data) => {
  return await prisma.user_PO.update({
    where: {
      id_po: id_po,
    },
    data: {
      no_penawaran: data.no_penawaran,
      id_user: data.id_user,
      id_product: data.id_product,
      tanggal_dibuat_po: data.tanggal_dibuat_po,
      tanggal_mulai_po: data.tanggal_mulai_po,
      tanggal_berakhir_po: data.tanggal_berakhir_po,
      Terms_of_Payment: data.Terms_of_Payment,
      Terms_of_Delivery: data.Terms_of_Delivery,
      description: data.description,
    },
  });
};

module.exports = {
  getAllUserPO,
  getUserPO,
  createUserPO,
  getUserPODetail,
  deleteUserPO,
  updateUserPO,
};
