const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPenawaran = async () => {
  return await prisma.$queryRaw`
      SELECT 
      user_penawaran.id_penawaran,
          user_penawaran.no_penawaran,
          user_product.id_product,
          user_product.brand,
          user_product.price,
          user_penawaran.id_product,
          mst_kurs.id_kurs,
          mst_kurs.nama_kurs,
          user_product.stock,
          mst_satuan.id_satuan,
          mst_satuan.nama_satuan,
          user_penawaran.tanggal_dibuat_penawaran,
          user_penawaran.tanggal_mulai_penawaran,
          user_penawaran.tanggal_berakhir_penawaran,
          user_penawaran.Terms_of_Payment,
          user_penawaran.Terms_of_Delivery,
          user_penawaran.description,
          status_penawaran.id_status AS id_status_penawaran,
          status_proses.id_status AS id_status_proses_penawaran,
          status_penawaran.nama_status AS nama_status_penawaran,
          status_proses.nama_status AS nama_status_proses_penawaran
      FROM user_penawaran 
      LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
      LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
      LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
      LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
      LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status;
    `;
};

const getUserPenawaranByManager = async () => {
  const data = await prisma.$queryRaw`
        SELECT 
          user_penawaran.id_penawaran,
          user_penawaran.no_penawaran,
          user_product.brand,
          user_product.price,
          mst_kurs.nama_kurs,
          user_product.stock,
          mst_satuan.nama_satuan,
          user_penawaran.tanggal_dibuat_penawaran,
          user_penawaran.tanggal_mulai_penawaran,
          user_penawaran.tanggal_berakhir_penawaran,
          user_penawaran.Terms_of_Payment,
          user_penawaran.Terms_of_Delivery,
          user_penawaran.description,
          user_penawaran.id_status_penawaran,
          user_penawaran.id_status_proses_penawaran,
          status_penawaran.nama_status AS nama_status_penawaran,
          status_proses.nama_status AS nama_status_proses_penawaran
      FROM user_penawaran 
      LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
      LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
      LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
      LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
      LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
      WHERE user_penawaran.id_status_proses_penawaran IN (4,5,7)
            `;
  return data;
  //   return await prisma.$queryRaw`
  //     SELECT
  //     user_penawaran.no_penawaran,
  //           user_product.brand,
  //           user_product.price,
  //           user_penawaran.id_product,
  //           mst_kurs.id_kurs,
  //           mst_kurs.nama_kurs,
  //           user_product.stock,
  //           mrs_satuan.id_satuan,
  //           mst_satuan.nama_satuan,
  //           user_penawaran.tanggal_dibuat_penawaran,
  //           user_penawaran.tanggal_mulai_penawaran,
  //           user_penawaran.tanggal_berakhir_penawaran,
  //           user_penawaran.Terms_of_Payment,
  //           user_penawaran.Terms_of_Delivery,
  //           user_penawaran.description,
  //           status_penawaran.id_status AS id_status_penawaran,
  //           status_proses.id_status AS id_status_proses_penawaran,
  //           status_penawaran.nama_status AS nama_status_penawaran,
  //           status_proses.nama_status AS nama_status_proses_penawaran
  // FROM
  //     user_penawaran
  // LEFT JOIN
  //     user_product ON user_penawaran.id_product = user_product.id_product
  // LEFT JOIN
  //     mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
  // LEFT JOIN
  //     mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
  // LEFT JOIN
  //     mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
  // LEFT JOIN
  //     mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
  // WHERE
  //     status_penawaran.nama_status IN ('Berlaku','Tidak Berlaku')
  //     AND
  //     status_proses.nama_status IN ('Penawaran Dipilih Staff', 'Penawaran Dipilih Manager', 'Penawaran Ditolak Manager');
  //     `;
};

const getUserPenawaranDetail = async (id) => {
  try {
    const data = await prisma.$queryRaw`
    SELECT
        user_penawaran.id_penawaran, 
        user_penawaran.no_penawaran,
        user.nama_perusahaan,
        user.nama_pic,
        user.no_telephone,
        user_product.brand, 
        user_product.price, 
        mst_kurs.nama_kurs, 
        user_product.stock, 
        user_product.volume, 
        mst_satuan.nama_satuan, 
        user_product.id_product,
        user_product.address, 
        user_product.item_image, 
        user_product.description AS product_description, 
        mst_jenis_product.nama_jenis_product, 
        mst_provinsi.nama_provinsi, 
        mst_kota.nama_kota, 
        user_product.company_category, 
        user_product.storage_type, 
        user_product.packaging, 
        user_penawaran.tanggal_dibuat_penawaran,
        user_penawaran.tanggal_mulai_penawaran,
        user_penawaran.tanggal_berakhir_penawaran,
        user_penawaran.Terms_of_Payment,
        user_penawaran.Terms_of_Delivery,
        user_penawaran.description AS penawaran_description,
        status_penawaran.id_status AS id_status_penawaran,
        status_proses.id_status AS id_status_proses_penawaran,
        status_penawaran.nama_status AS nama_status_penawaran,
        status_proses.nama_status AS nama_status_proses_penawaran
    FROM user_penawaran 
    LEFT JOIN User ON user_penawaran.id_penawaran = user.id_user 
    LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
    LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
    LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
    LEFT JOIN mst_jenis_product ON user_product.id_jenis_product = mst_jenis_product.id_jenis_product
    LEFT JOIN mst_provinsi ON user_product.id_provinsi = mst_provinsi.id_provinsi
    LEFT JOIN mst_kota ON user_product.id_kota = mst_kota.id_kota
    LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
    LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
    WHERE user_penawaran.id_penawaran =  ${Number(id)}
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
        user_penawaran.id_penawaran,
        user_penawaran.no_penawaran,
        user_product.brand,
        user_product.price,
        mst_kurs.id_kurs,
        mst_kurs.nama_kurs,
        user_product.stock,
        mst_satuan.id_satuan,
        mst_satuan.nama_satuan,
        user_penawaran.tanggal_dibuat_penawaran,
        user_penawaran.tanggal_mulai_penawaran,
        user_penawaran.tanggal_berakhir_penawaran,
        user_penawaran.Terms_of_Payment,
        user_penawaran.Terms_of_Delivery,
        user_penawaran.description,
        status_penawaran.id_status AS id_status_penawaran,
        status_penawaran.nama_status AS nama_status_penawaran,
        status_proses.id_status AS id_status_proses_penawaran,
        status_proses.nama_status AS nama_status_proses_penawaran
    FROM user_penawaran 
    LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
    LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
    LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
    LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
    LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
    WHERE user_penawaran.id_user =  ${Number(userId)}
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
        COUNT(user_penawaran.id_penawaran) AS total_penawaran
    FROM user_penawaran
    WHERE user_penawaran.id_user = ${Number(userId)}
  `;

    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserPenawaranByStatusPenawaran = async (statuspenawaranId) => {
  try {
    const data = await prisma.$queryRaw`
        SELECT 
            user_penawaran.no_penawaran,
            user_product.brand,
            user_product.price,
            mst_kurs.nama_kurs,
            user_product.stock,
            mst_satuan.nama_satuan,
            user_penawaran.tanggal_dibuat_penawaran,
            user_penawaran.tanggal_mulai_penawaran,
            user_penawaran.tanggal_berakhir_penawaran,
            user_penawaran.Terms_of_Payment,
            user_penawaran.Terms_of_Delivery,
            user_penawaran.description,
            status_penawaran.nama_status AS nama_status_penawaran,
            status_proses.nama_status AS nama_status_proses_penawaran
        FROM user_penawaran 
        LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
        LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
        LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
        LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
        LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
        WHERE user_penawaran.id_status_penawaran = ${Number(statuspenawaranId)}
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
          user_penawaran.id_penawaran,
          user_penawaran.no_penawaran,
          user_product.id_product,
          user_product.brand,
          user_product.price,
          mst_kurs.nama_kurs,
          user_product.stock,
          mst_satuan.nama_satuan,
          user_penawaran.tanggal_dibuat_penawaran,
          user_penawaran.tanggal_mulai_penawaran,
          user_penawaran.tanggal_berakhir_penawaran,
          user_penawaran.Terms_of_Payment,
          user_penawaran.Terms_of_Delivery,
          user_penawaran.description,
          user_penawaran.id_status_penawaran,
          user_penawaran.id_status_proses_penawaran,
          status_penawaran.nama_status AS nama_status_penawaran,
          status_proses.nama_status AS nama_status_proses_penawaran
      FROM user_penawaran 
      LEFT JOIN user_product ON user_penawaran.id_product = user_product.id_product
      LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
      LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
      LEFT JOIN mst_status AS status_penawaran ON user_penawaran.id_status_penawaran = status_penawaran.id_status
      LEFT JOIN mst_status AS status_proses ON user_penawaran.id_status_proses_penawaran = status_proses.id_status
      WHERE user_penawaran.id_status_proses_penawaran = ${Number(
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
    } = documentData;

    const response = await prisma.$queryRaw`
        INSERT INTO User_Penawaran
          (
            no_penawaran,
            id_user,
            id_product,
            tanggal_dibuat_penawaran,
            tanggal_mulai_penawaran,
            tanggal_berakhir_penawaran,
            Terms_of_Payment,
            Terms_of_Delivery,
            description,
            id_status_penawaran,
            id_status_proses_penawaran
          )
        VALUES
          (
            ${no_penawaran},
            ${id_user},
            ${id_product},
            ${tanggal_dibuat_penawaran},
            ${tanggal_mulai_penawaran},
            ${tanggal_berakhir_penawaran},
            ${Terms_of_Payment},
            ${Terms_of_Delivery},
            "",
            ${id_status_penawaran},
            ${id_status_proses_penawaran}
          )
      `;

    return response;
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
      DELETE FROM user_penawaran WHERE id_penawaran = ${id}
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
