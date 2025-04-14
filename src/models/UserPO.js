const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPO = async () => {};

const getUserPO = async () => {
  return await prisma.$queryRaw`
    SELECT 
      "User_PO".id_po,
      "User_PO".no_po,
      "User_Penawaran".no_penawaran,
      "User".nama_perusahaan,
      "User_Product".brand,
      "User_PO".tanggal_dibuat_po,
      "User_PO".tanggal_mulai_po,
      "User_PO".tanggal_berakhir_po,
      "User_PO"."Terms_of_Payment",
      "User_PO"."Terms_of_Delivery",
      "User_PO".description
    FROM "User_PO"
    LEFT JOIN "User" ON "User_PO".id_user = "User".id_user
    LEFT JOIN "User_Penawaran" ON "User_PO".no_penawaran = "User_Penawaran".no_penawaran
    LEFT JOIN "User_Product" ON "User_PO".id_product = "User_Product".id_product
  `;
};

const createUserPO = async (data) => {
  return await prisma.user_PO.create({
    data: {
      no_po: data.no_po,
      no_penawaran: data.no_penawaran,
      id_user: data.id_user,
      id_product: data.id_product,
      tanggal_dibuat_po: new Date(data.tanggal_dibuat_po).toISOString(),
      tanggal_mulai_po: new Date(data.tanggal_mulai_po).toISOString(),
      tanggal_berakhir_po: new Date(data.tanggal_berakhir_po).toISOString(),
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

const getUserPOByPenawaranUserId = async (id_user) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        "User_PO"."id_po",
        "User_PO"."no_po",
        "User_PO"."tanggal_dibuat_po",
        "User_PO"."tanggal_mulai_po",
        "User_PO"."tanggal_berakhir_po",
        "User_PO"."Terms_of_Payment",
        "User_PO"."Terms_of_Delivery",
        "User_PO"."description",
        "User_Penawaran"."id_penawaran",
        "User_Penawaran"."no_penawaran",
        "User_Product"."brand",
        "User_Product"."price",
        "mst_kurs"."id_kurs",
        "mst_kurs"."nama_kurs",
        "User_Product"."stock",
        "mst_satuan"."id_satuan",
        "mst_satuan"."nama_satuan"
      FROM "User_PO"
      LEFT JOIN "User_Penawaran" ON "User_PO"."no_penawaran" = "User_Penawaran"."no_penawaran"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      WHERE "User_Penawaran"."id_user" = ${Number(id_user)}
    `;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserPO,
  getUserPO,
  createUserPO,
  getUserPODetail,
  deleteUserPO,
  updateUserPO,
  getUserPOByPenawaranUserId,
};
