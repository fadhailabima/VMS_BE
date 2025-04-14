const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserDocuments = async () => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Document".id_document, 
      "User".nama_perusahaan, 
      "User_Document".nama_document, 
      "mst_jenis_document".nama_document AS jenis_document, 
      "User_Document".tanggal_berlaku, 
      "User_Document".tanggal_berakhir, 
      "User_Document".file, 
      "mst_status".nama_status  
    FROM 
      "User_Document"
    LEFT JOIN 
      "User" ON "User_Document".id_user = "User".id_user 
    LEFT JOIN 
      "mst_jenis_document" ON "User_Document".id_jenis_document = "mst_jenis_document".id_jenis_document
    LEFT JOIN 
      "mst_status" ON "User_Document".id_status = "mst_status".id_status
  `;
};

const getUserDocumentById = async (id) => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Document".id_document, 
      "User".nama_perusahaan, 
      "User_Document".nama_document, 
      "mst_jenis_document".nama_document AS jenis_document, 
      "User_Document".id_jenis_document, 
      "User_Document".tanggal_berlaku, 
      "User_Document".tanggal_berakhir, 
      "User_Document".file, 
      "mst_status".nama_status  
    FROM 
      "User_Document"
    LEFT JOIN 
      "User" ON "User_Document".id_user = "User".id_user 
    LEFT JOIN 
      "mst_jenis_document" ON "User_Document".id_jenis_document = "mst_jenis_document".id_jenis_document
    LEFT JOIN 
      "mst_status" ON "User_Document".id_status = "mst_status".id_status
    WHERE 
      "User_Document".id_document = ${Number(id)}
  `;
};
const getUserDocumentByIdUser = async (userId) => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Document".id_document, 
      "User".nama_perusahaan, 
      "User_Document".nama_document, 
      "mst_jenis_document".nama_document AS jenis_document, 
      "User_Document".tanggal_berlaku, 
      "User_Document".tanggal_berakhir, 
      "User_Document".file, 
      "mst_status".nama_status  
    FROM 
      "User_Document"
    LEFT JOIN 
      "User" ON "User_Document".id_user = "User".id_user 
    LEFT JOIN 
      "mst_jenis_document" ON "User_Document".id_jenis_document = "mst_jenis_document".id_jenis_document
    LEFT JOIN 
      "mst_status" ON "User_Document".id_status = "mst_status".id_status
    WHERE 
      "User".id_user = ${Number(userId)}
  `;
};

const getUserDocumentByIdJenisDocument = async (jenisDocumentId) => {
  return await prisma.$queryRaw`
    SELECT 
      "User_Document".id_document, 
      "User".nama_perusahaan, 
      "User_Document".nama_document, 
      "mst_jenis_document".nama_document AS jenis_document, 
      "User_Document".tanggal_berlaku, 
      "User_Document".tanggal_berakhir, 
      "User_Document".file, 
      "mst_status".nama_status  
    FROM 
      "User_Document"
    LEFT JOIN 
      "User" ON "User_Document".id_user = "User".id_user 
    LEFT JOIN 
      "mst_jenis_document" ON "User_Document".id_jenis_document = "mst_jenis_document".id_jenis_document
    LEFT JOIN 
      "mst_status" ON "User_Document".id_status = "mst_status".id_status
    WHERE 
      "User_Document".id_jenis_document = ${Number(jenisDocumentId)}
  `;
};

const getMissingDocumentsByUser = async (userId) => {
  return await prisma.$queryRaw`
    SELECT 
      "j".id_jenis_document, 
      "j".nama_document AS jenis_document 
    FROM 
      "mst_jenis_document" "j"
    LEFT JOIN 
      "User_Document" "ud" 
      ON "j".id_jenis_document = "ud".id_jenis_document 
      AND "ud".id_user = ${Number(userId)}
    WHERE 
      "ud".id_document IS NULL;
  `;
};
const createUserDocument = async (documentData) => {
  try {
    const {
      id_user,
      nama_document,
      id_jenis_document,
      tanggal_berlaku,
      tanggal_berakhir,
      file,
      id_status,
    } = documentData;

    const newDocument = await prisma.user_Document.create({
      data: {
        id_user,
        nama_document,
        id_jenis_document,
        tanggal_berlaku: new Date(tanggal_berlaku),
        tanggal_berakhir: new Date(tanggal_berakhir),
        file,
        id_status,
      },
    });

    return newDocument;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserDocument = async (id, documentData) => {
  try {
    const {
      id_user,
      nama_document,
      id_jenis_document,
      tanggal_berlaku,
      tanggal_berakhir,
      file,
      id_status,
    } = documentData;

    const dataToUpdate = {
      id_user,
      nama_document,
      id_jenis_document,
      tanggal_berlaku: new Date(tanggal_berlaku),
      tanggal_berakhir: new Date(tanggal_berakhir),
      id_status,
    };

    if (file) {
      dataToUpdate.file = file;
    }

    const response = await prisma.user_Document.update({
      where: { id_document: id },
      data: dataToUpdate,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const deleteUserDocument = async (id) => {
  try {
    const response = await prisma.$queryRaw`
      DELETE FROM user_document WHERE id_document = ${id}
    `;

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserDocuments,
  getUserDocumentById,
  getUserDocumentByIdUser,
  getUserDocumentByIdJenisDocument,
  createUserDocument,
  updateUserDocument,
  deleteUserDocument,
  getMissingDocumentsByUser,
};
