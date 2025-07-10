const { PrismaClient, Prisma } = require("@prisma/client");
const { json } = require("../utils/helper");
const prisma = new PrismaClient();

const getAllUserProducts = async () => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Product".id_product,
      "User_Product".brand, 
      "User_Product".price, 
      "mst_kurs".nama_kurs, 
      "User_Product".stock, 
      "mst_satuan".nama_satuan 
    FROM "User_Product"
    LEFT JOIN "User" ON "User_Product".id_user = "User".id_user 
    LEFT JOIN "mst_kurs" ON "User_Product".id_kurs = "mst_kurs".id_kurs
    LEFT JOIN "mst_satuan" ON "User_Product".id_satuan = "mst_satuan".id_satuan
  `;
};

const getUserProductDetail = async (id) => {
  try {
    const data = await prisma.user_Product.findUnique({
      where: {
        id_product: Number(id),
      },
      include: {
        user: {
          select: {
            nama_perusahaan: true,
            id_user: true,
          },
        },
        kurs: {
          select: {
            id_kurs: true,
            nama_kurs: true,
          },
        },
        satuan: {
          select: {
            id_satuan: true,
            nama_satuan: true,
          },
        },
        jenis_product: {
          select: {
            id_jenis_product: true,
            nama_jenis_product: true,
          },
        },
        provinsi: {
          select: {
            id_provinsi: true,
            nama_provinsi: true,
          },
        },
        kota: {
          select: {
            id_kota: true,
            nama_kota: true,
          },
        },
      },
    });

    if (!data) {
      throw new Error("Product not found");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProductByIdUser = async (userId) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT  
        "User_Product".id_product,
        "User".nama_perusahaan,
        "User_Product".brand, 
        "User_Product".price, 
        "mst_kurs".nama_kurs, 
        "User_Product".stock, 
        "User_Product".volume, 
        "mst_satuan".nama_satuan, 
        "User_Product".address, 
        "User_Product".item_image, 
        "User_Product".description, 
        "mst_jenis_product".nama_jenis_product, 
        "mst_provinsi".nama_provinsi, 
        "mst_kota".nama_kota, 
        "User_Product".company_category, 
        "User_Product".storage_type, 
        "User_Product".packaging 
      FROM "User_Product" 
      LEFT JOIN "User" ON "User_Product".id_user = "User".id_user 
      LEFT JOIN "mst_kurs" ON "User_Product".id_kurs = "mst_kurs".id_kurs
      LEFT JOIN "mst_satuan" ON "User_Product".id_satuan = "mst_satuan".id_satuan
      LEFT JOIN "mst_jenis_product" ON "User_Product".id_jenis_product = "mst_jenis_product".id_jenis_product
      LEFT JOIN "mst_provinsi" ON "User_Product".id_provinsi = "mst_provinsi".id_provinsi
      LEFT JOIN "mst_kota" ON "User_Product".id_kota = "mst_kota".id_kota
      WHERE "User".id_user = ${Number(userId)}
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
        COUNT(id_product)::text AS total_product
      FROM "User_Product"
      WHERE id_user = ${Number(userId)}
    `;
    return { total_product: data[0].total_product };
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

    const newProduct = await prisma.user_Product.create({
      data: {
        id_user,
        brand,
        price: parseFloat(price),
        id_kurs,
        stock: parseInt(stock, 10),
        volume, // volume remains a string
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
      },
    });

    return newProduct;
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

    const dataToUpdate = {
      id_user,
      brand,
      price: parseFloat(price),
      id_kurs,
      stock: parseInt(stock, 10),
      volume, // volume remains a string
      id_satuan,
      address,
      description,
      id_jenis_product,
      id_provinsi,
      id_kota,
      company_category,
      storage_type,
      packaging,
    };

    if (item_image) {
      dataToUpdate.item_image = item_image;
    }

    const updatedProduct = await prisma.user_Product.update({
      where: { id_product: id },
      data: dataToUpdate,
    });

    return updatedProduct;
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
