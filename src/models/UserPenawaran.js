const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPenawaran = async () => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Penawaran".id_penawaran,
      "User_Penawaran".no_penawaran,
      "User_Product".id_product,
      "User_Product".brand,
      "User_Product".price,
      "User_Penawaran".id_product,
      "mst_kurs".id_kurs,
      "mst_kurs".nama_kurs,
      "User_Product".stock,
      "mst_satuan".id_satuan,
      "mst_satuan".nama_satuan,
      "User_Penawaran".tanggal_dibuat_penawaran,
      "User_Penawaran".tanggal_mulai_penawaran,
      "User_Penawaran".tanggal_berakhir_penawaran,
      "User_Penawaran"."Terms_of_Payment",
      "User_Penawaran"."Terms_of_Delivery",
      "User_Penawaran".description,
      "status_penawaran".id_status AS id_status_penawaran,
      "status_proses".id_status AS id_status_proses_penawaran,
      "status_penawaran".nama_status AS nama_status_penawaran,
      "status_proses".nama_status AS nama_status_proses_penawaran
    FROM "User_Penawaran"
    LEFT JOIN "User_Product" ON "User_Penawaran".id_product = "User_Product".id_product
    LEFT JOIN "mst_kurs" ON "User_Product".id_kurs = "mst_kurs".id_kurs
    LEFT JOIN "mst_satuan" ON "User_Product".id_satuan = "mst_satuan".id_satuan
    LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran".id_status_penawaran = "status_penawaran".id_status
    LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran".id_status_proses_penawaran = "status_proses".id_status;
  `;
};
const getUserPenawaranByManager = async () => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        "User_Penawaran"."id_penawaran",
        "User_Penawaran"."no_penawaran",
        "User_Product"."brand",
        "User_Product"."price",
        "mst_kurs"."nama_kurs",
        "User_Product"."stock",
        "mst_satuan"."nama_satuan",
        "User_Penawaran"."tanggal_dibuat_penawaran",
        "User_Penawaran"."tanggal_mulai_penawaran",
        "User_Penawaran"."tanggal_berakhir_penawaran",
        "User_Penawaran"."Terms_of_Payment",
        "User_Penawaran"."Terms_of_Delivery",
        "User_Penawaran"."description",
        "User_Penawaran"."id_status_penawaran",
        "User_Penawaran"."id_status_proses_penawaran",
        "status_penawaran"."nama_status" AS "nama_status_penawaran",
        "status_proses"."nama_status" AS "nama_status_proses_penawaran"
      FROM "User_Penawaran"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran"."id_status_penawaran" = "status_penawaran"."id_status"
      LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran"."id_status_proses_penawaran" = "status_proses"."id_status"
      WHERE "User_Penawaran"."id_status_proses_penawaran" IN (4, 5, 7)
    `;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPenawaranDetail = async (id) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT
        "User_Penawaran"."id_penawaran", 
        "User_Penawaran"."no_penawaran",
        "User"."nama_perusahaan",
        "User"."nama_pic",
        "User"."no_telephone",
        "User_Product"."brand", 
        "User_Product"."price", 
        "mst_kurs"."nama_kurs", 
        "User_Product"."stock", 
        "User_Product"."volume", 
        "mst_satuan"."nama_satuan", 
        "User_Product"."id_product",
        "User_Product"."address", 
        "User_Product"."item_image", 
        "User_Product"."description" AS "product_description", 
        "mst_jenis_product"."nama_jenis_product", 
        "mst_provinsi"."nama_provinsi", 
        "mst_kota"."nama_kota", 
        "User_Product"."company_category", 
        "User_Product"."storage_type", 
        "User_Product"."packaging", 
        "User_Penawaran"."tanggal_dibuat_penawaran",
        "User_Penawaran"."tanggal_mulai_penawaran",
        "User_Penawaran"."tanggal_berakhir_penawaran",
        "User_Penawaran"."Terms_of_Payment",
        "User_Penawaran"."Terms_of_Delivery",
        "User_Penawaran"."description" AS "penawaran_description",
        "status_penawaran"."id_status" AS "id_status_penawaran",
        "status_proses"."id_status" AS "id_status_proses_penawaran",
        "status_penawaran"."nama_status" AS "nama_status_penawaran",
        "status_proses"."nama_status" AS "nama_status_proses_penawaran"
      FROM "User_Penawaran"
      LEFT JOIN "User" ON "User_Penawaran"."id_user" = "User"."id_user"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      LEFT JOIN "mst_jenis_product" ON "User_Product"."id_jenis_product" = "mst_jenis_product"."id_jenis_product"
      LEFT JOIN "mst_provinsi" ON "User_Product"."id_provinsi" = "mst_provinsi"."id_provinsi"
      LEFT JOIN "mst_kota" ON "User_Product"."id_kota" = "mst_kota"."id_kota"
      LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran"."id_status_penawaran" = "status_penawaran"."id_status"
      LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran"."id_status_proses_penawaran" = "status_proses"."id_status"
      WHERE "User_Penawaran"."id_penawaran" = ${Number(id)}
    `;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPenawaranByIdUser = async (userId) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        "User_Penawaran"."id_penawaran",
        "User_Penawaran"."no_penawaran",
        "User_Product"."brand",
        "User_Product"."price",
        "mst_kurs"."id_kurs",
        "mst_kurs"."nama_kurs",
        "User_Product"."stock",
        "mst_satuan"."id_satuan",
        "mst_satuan"."nama_satuan",
        "User_Penawaran"."tanggal_dibuat_penawaran",
        "User_Penawaran"."tanggal_mulai_penawaran",
        "User_Penawaran"."tanggal_berakhir_penawaran",
        "User_Penawaran"."Terms_of_Payment",
        "User_Penawaran"."Terms_of_Delivery",
        "User_Penawaran"."description",
        "status_penawaran"."id_status" AS "id_status_penawaran",
        "status_penawaran"."nama_status" AS "nama_status_penawaran",
        "status_proses"."id_status" AS "id_status_proses_penawaran",
        "status_proses"."nama_status" AS "nama_status_proses_penawaran"
      FROM "User_Penawaran"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran"."id_status_penawaran" = "status_penawaran"."id_status"
      LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran"."id_status_proses_penawaran" = "status_proses"."id_status"
      WHERE "User_Penawaran"."id_user" = ${Number(userId)}
    `;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPenawaranSummaryByIdUser = async (userId) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT
        COUNT("id_penawaran")::text AS "total_penawaran"
      FROM "User_Penawaran"
      WHERE "id_user" = ${BigInt(userId)}
    `;
    return { total_penawaran: data[0].total_penawaran };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserPenawaranByStatusPenawaran = async (statuspenawaranId) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        "User_Penawaran"."no_penawaran",
        "User_Product"."brand",
        "User_Product"."price",
        "mst_kurs"."nama_kurs",
        "User_Product"."stock",
        "mst_satuan"."nama_satuan",
        "User_Penawaran"."tanggal_dibuat_penawaran",
        "User_Penawaran"."tanggal_mulai_penawaran",
        "User_Penawaran"."tanggal_berakhir_penawaran",
        "User_Penawaran"."Terms_of_Payment",
        "User_Penawaran"."Terms_of_Delivery",
        "User_Penawaran"."description",
        "status_penawaran"."nama_status" AS "nama_status_penawaran",
        "status_proses"."nama_status" AS "nama_status_proses_penawaran"
      FROM "User_Penawaran"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran"."id_status_penawaran" = "status_penawaran"."id_status"
      LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran"."id_status_proses_penawaran" = "status_proses"."id_status"
      WHERE "User_Penawaran"."id_status_penawaran" = ${Number(
        statuspenawaranId
      )}
    `;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPenawaranByStatusProsesPenawaran = async (
  statusprosespenawaranId
) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        "User_Penawaran"."id_penawaran",
        "User_Penawaran"."no_penawaran",
        "User_Product"."id_product",
        "User_Product"."brand",
        "User_Product"."price",
        "mst_kurs"."nama_kurs",
        "User_Product"."stock",
        "mst_satuan"."nama_satuan",
        "User_Penawaran"."tanggal_dibuat_penawaran",
        "User_Penawaran"."tanggal_mulai_penawaran",
        "User_Penawaran"."tanggal_berakhir_penawaran",
        "User_Penawaran"."Terms_of_Payment",
        "User_Penawaran"."Terms_of_Delivery",
        "User_Penawaran"."description",
        "User_Penawaran"."id_status_penawaran",
        "User_Penawaran"."id_status_proses_penawaran",
        "status_penawaran"."nama_status" AS "nama_status_penawaran",
        "status_proses"."nama_status" AS "nama_status_proses_penawaran"
      FROM "User_Penawaran"
      LEFT JOIN "User_Product" ON "User_Penawaran"."id_product" = "User_Product"."id_product"
      LEFT JOIN "mst_kurs" ON "User_Product"."id_kurs" = "mst_kurs"."id_kurs"
      LEFT JOIN "mst_satuan" ON "User_Product"."id_satuan" = "mst_satuan"."id_satuan"
      LEFT JOIN "mst_status" AS "status_penawaran" ON "User_Penawaran"."id_status_penawaran" = "status_penawaran"."id_status"
      LEFT JOIN "mst_status" AS "status_proses" ON "User_Penawaran"."id_status_proses_penawaran" = "status_proses"."id_status"
      WHERE "User_Penawaran"."id_status_proses_penawaran" = ${BigInt(
        statusprosespenawaranId
      )}
    `;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserPenawaran = async (documentData) => {
  try {
    const {
      no_penawaran,
      id_user,
      id_product,
      tanggal_dibuat_penawaran,
      tanggal_mulai_penawaran,
      tanggal_berakhir_penawaran,
      Terms_of_Payment,
      Terms_of_Delivery,
      id_status_penawaran,
      id_status_proses_penawaran,
      description,
    } = documentData;

    const newPenawaran = await prisma.user_Penawaran.create({
      data: {
        no_penawaran,
        id_user,
        id_product,
        description,
        tanggal_dibuat_penawaran: new Date(
          tanggal_dibuat_penawaran
        ).toISOString(),
        tanggal_mulai_penawaran: new Date(
          tanggal_mulai_penawaran
        ).toISOString(),
        tanggal_berakhir_penawaran: new Date(
          tanggal_berakhir_penawaran
        ).toISOString(),
        Terms_of_Payment,
        Terms_of_Delivery,
        id_status_penawaran,
        id_status_proses_penawaran,
      },
    });

    return newPenawaran;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateUserPenawaran = async (id, documentData) => {
  try {
    // remove field from documentData, such as, id_penawaran, id_status_penawaran, id_status_proses_penawaran
    const newDocumentData = Object.keys(documentData).reduce((object, key) => {
      if (
        key === "tanggal_dibuat_penawaran" ||
        key === "tanggal_mulai_penawaran" ||
        key === "tanggal_berakhir_penawaran" ||
        key === "Terms_of_Payment" ||
        key === "Terms_of_Delivery" ||
        key === "id_status_penawaran" ||
        key === "id_status_proses_penawaran"
      ) {
        object[key] = documentData[key];
      }
      return object;
    }, {});

    const numId = Number(id);
    // const numIdStatusPenawaran = Number(id_status_penawaran);
    // const numIdStatusProsesPenawaran = Number(id_status_proses_penawaran);
    // let response = null;
    // if (id_status_penawaran) {
    //   response = await prisma.$queryRaw`
    //     UPDATE user_penawaran
    //     SET
    //       id_status_penawaran = ${numIdStatusPenawaran}
    //     WHERE id_penawaran = ${numId}
    //   `;
    // } else if (id_status_proses_penawaran) {
    //   response = await prisma.$queryRaw`
    //     UPDATE user_penawaran
    //     SET
    //       id_status_proses_penawaran = ${numIdStatusProsesPenawaran}
    //     WHERE id_penawaran = ${numId}
    //   `;
    // }
    // return response;

    const data = await prisma.user_Penawaran.update({
      where: {
        id_penawaran: numId,
      },
      data: { ...newDocumentData },
    });

    console.log("data", data);

    return data;
  } catch (error) {
    console.log("error", error.message);
    // throw new Error(error.message);
    throw new Error(error.message);
  }
};

const deleteUserPenawaran = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      DELETE FROM "User_Penawaran" WHERE "id_penawaran" = ${Number(id)}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserPenawaran,
  getUserPenawaranByManager,
  getUserPenawaranDetail,
  getUserPenawaranByIdUser,
  getUserPenawaranByStatusPenawaran,
  getUserPenawaranByStatusProsesPenawaran,
  createUserPenawaran,
  updateUserPenawaran,
  deleteUserPenawaran,
  getUserPenawaranSummaryByIdUser,
};
