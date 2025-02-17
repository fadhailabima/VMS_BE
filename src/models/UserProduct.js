const { PrismaClient, Prisma } = require("@prisma/client");
const { json } = require("../utils/helper");
const prisma = new PrismaClient();

const getAllUserProducts = async () => {
  return await prisma.$queryRaw`
        SELECT 
            user_product.id_product,
            user_product.brand, 
            user_product.price, 
            mst_kurs.nama_kurs, 
            user_product.stock, 
            mst_satuan.nama_satuan 
        FROM user_product 
        LEFT JOIN User ON user_product.id_product = user.id_user 
        LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
        LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
    `;
};

const getUserProductDetail = async (id) => {
  try {
    const data = await prisma.$queryRaw`
        SELECT  
          user_product.id_product,
            user.nama_perusahaan,
            user.id_user,
            user_product.brand, 
            user_product.price, 
            mst_kurs.id_kurs, 
            mst_kurs.nama_kurs, 
            user_product.stock, 
            user_product.volume, 
            mst_satuan.id_satuan, 
            mst_satuan.nama_satuan, 
            user_product.address, 
            user_product.item_image, 
            user_product.description, 
            mst_jenis_product.id_jenis_product, 
            mst_jenis_product.nama_jenis_product, 
            mst_provinsi.id_provinsi, 
            mst_provinsi.nama_provinsi, 
            mst_kota.id_kota, 
            mst_kota.nama_kota, 
            user_product.company_category, 
            user_product.storage_type, 
            user_product.packaging 
        FROM user_product 
        LEFT JOIN User ON user_product.id_user = user.id_user 
        LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
        LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
        LEFT JOIN mst_jenis_product ON user_product.id_jenis_product = mst_jenis_product.id_jenis_product
        LEFT JOIN mst_provinsi ON user_product.id_provinsi = mst_provinsi.id_provinsi
        LEFT JOIN mst_kota ON user_product.id_kota = mst_kota.id_kota
        WHERE user_product.id_product = ${Number(id)}
      `;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProductByIdUser = async (userId) => {
  try {
    const data = await prisma.$queryRaw`
          SELECT  
              user_product.id_product,
              user.nama_perusahaan,
              user_product.brand, 
              user_product.price, 
              mst_kurs.nama_kurs, 
              user_product.stock, 
              user_product.volume, 
              mst_satuan.nama_satuan, 
              user_product.address, 
              user_product.item_image, 
              user_product.description, 
              mst_jenis_product.nama_jenis_product, 
              mst_provinsi.nama_provinsi, 
              mst_kota.nama_kota, 
              user_product.company_category, 
              user_product.storage_type, 
              user_product.packaging 
          FROM user_product 
          LEFT JOIN User ON user_product.id_user = user.id_user 
          LEFT JOIN mst_kurs ON user_product.id_kurs = mst_kurs.id_kurs
          LEFT JOIN mst_satuan ON user_product.id_satuan = mst_satuan.id_satuan
          LEFT JOIN mst_jenis_product ON user_product.id_jenis_product = mst_jenis_product.id_jenis_product
          LEFT JOIN mst_provinsi ON user_product.id_provinsi = mst_provinsi.id_provinsi
          LEFT JOIN mst_kota ON user_product.id_kota = mst_kota.id_kota
          WHERE user.id_user = ${Number(userId)}
        `;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProductSummaryByIdUser = async (userId) => {
  try {
    const data = await prisma.$queryRaw`
          SELECT
              COUNT(id_product) AS total_product
          FROM user_product
          WHERE id_user = ${Number(userId)}
        `;
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserProduct = async (documentData) => {
  try {
    const {
      id_user,
      brand,
      price,
      id_kurs,
      stock,
      volume,
      id_satuan,
      address,
      item_image,
      description,
      id_jenis_product,
      id_provinsi,
      id_kota,
      company_category,
      storage_type,
      packaging,
    } = documentData;

    const response = await prisma.$queryRaw`
        INSERT INTO user_product 
          (
              id_user,
              brand,
              price,
              id_kurs,
              stock,
              volume,
              id_satuan,
              address,
              item_image,
              description,
              id_jenis_product,
              id_provinsi,
              id_kota,
              company_category,
              storage_type,
              packaging
          )
        VALUES 
          (
            ${id_user}, 
            ${brand}, 
            ${price}, 
            ${id_kurs}, 
            ${stock}, 
            ${volume}, 
            ${id_satuan}, 
            ${address}, 
            ${item_image}, 
            ${description}, 
            ${id_jenis_product}, 
            ${id_provinsi}, 
            ${id_kota}, 
            ${company_category}, 
            ${storage_type}, 
            ${packaging}
          )
      `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserProduct = async (id, documentData) => {
  try {
    const {
      id_user,
      brand,
      price,
      id_kurs,
      stock,
      volume,
      id_satuan,
      address,
      item_image,
      description,
      id_jenis_product,
      id_provinsi,
      id_kota,
      company_category,
      storage_type,
      packaging,
    } = documentData;

    let response;

    if (item_image) {
      response = await prisma.$queryRaw`
        UPDATE user_product
        SET 
          id_user = ${id_user},
          brand = ${brand},
          price = ${price},
          id_kurs = ${id_kurs},
          stock = ${stock},
          volume = ${volume},
          id_satuan = ${id_satuan},
          address = ${address},
          item_image = ${item_image},
          description = ${description},
          id_jenis_product = ${id_jenis_product},
          id_provinsi = ${id_provinsi},
          id_kota = ${id_kota},
          company_category = ${company_category},
          storage_type = ${storage_type},
          packaging = ${packaging}
        WHERE id_product = ${id}
      `;
    } else {
      response = await prisma.$queryRaw`
        UPDATE user_product
        SET 
          brand = ${brand},
          price = ${price},
          id_kurs = ${id_kurs},
          stock = ${stock},
          volume = ${volume},
          id_satuan = ${id_satuan},
          address = ${address},
          description = ${description},
          id_jenis_product = ${id_jenis_product},
          id_provinsi = ${id_provinsi},
          id_kota = ${id_kota},
          company_category = ${company_category},
          storage_type = ${storage_type},
          packaging = ${packaging}
        WHERE id_product = ${id}
      `;
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserProduct = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      DELETE FROM user_product WHERE id_product = ${id}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserProducts,
  getUserProductDetail,
  getUserProductByIdUser,
  createUserProduct,
  updateUserProduct,
  deleteUserProduct,
  getUserProductSummaryByIdUser,
};
