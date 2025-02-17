const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserDocuments = async () => {
  // return await prisma.user_Document.findMany();
  return await prisma.$queryRaw`
        SELECT user_document.id_document, user.nama_perusahaan, user_document.nama_document, mst_jenis_document.nama_document AS 'jenis_document', user_document.tanggal_berlaku, user_document.tanggal_berakhir, user_document.file, mst_status.nama_status  FROM user_document
        LEFT JOIN User ON user_document.id_user = user.id_user 
        LEFT JOIN mst_jenis_document ON user_document.id_jenis_document = mst_jenis_document.id_jenis_document
        LEFT JOIN mst_status ON user_document.id_status = mst_status.id_status
    `;
};

const getUserDocumentById = async (id) => {
  return await prisma.$queryRaw`
    SELECT user_document.id_document, user.nama_perusahaan, user_document.nama_document, mst_jenis_document.nama_document AS 'jenis_document', user_document.id_jenis_document, user_document.tanggal_berlaku, user_document.tanggal_berakhir, user_document.file, mst_status.nama_status  FROM user_document
        LEFT JOIN User ON user_document.id_user = user.id_user 
        LEFT JOIN mst_jenis_document ON user_document.id_jenis_document = mst_jenis_document.id_jenis_document
        LEFT JOIN mst_status ON user_document.id_status = mst_status.id_status
    WHERE user_document.id_document = ${Number(id)}
  `;
};

const getUserDocumentByIdUser = async (userId) => {
  return await prisma.$queryRaw`
    SELECT user_document.id_document, user.nama_perusahaan, user_document.nama_document, mst_jenis_document.nama_document AS 'jenis_document', user_document.tanggal_berlaku, user_document.tanggal_berakhir, user_document.file, mst_status.nama_status  FROM user_document
        LEFT JOIN User ON user_document.id_user = user.id_user 
        LEFT JOIN mst_jenis_document ON user_document.id_jenis_document = mst_jenis_document.id_jenis_document
        LEFT JOIN mst_status ON user_document.id_status = mst_status.id_status
    WHERE user.id_user = ${Number(userId)}
  `;
};

const getUserDocumentByIdJenisDocument = async (jenisDocumentId) => {
  return await prisma.$queryRaw`
  SELECT user_document.id_document, user.nama_perusahaan, user_document.nama_document, mst_jenis_document.nama_document AS 'jenis_document', user_document.tanggal_berlaku, user_document.tanggal_berakhir, user_document.file, mst_status.nama_status  FROM user_document
        LEFT JOIN User ON user_document.id_user = user.id_user 
        LEFT JOIN mst_jenis_document ON user_document.id_jenis_document = mst_jenis_document.id_jenis_document
        LEFT JOIN mst_status ON user_document.id_status = mst_status.id_status
  WHERE user_document.id_jenis_document = ${Number(jenisDocumentId)}
`;
};

const getMissingDocumentsByUser = async (userId) => {
  return await prisma.$queryRaw`
  SELECT j.id_jenis_document, j.nama_document AS jenis_document 
  FROM mst_jenis_document j
  LEFT JOIN user_document ud 
    ON j.id_jenis_document = ud.id_jenis_document 
    AND ud.id_user = ${Number(userId)}
  WHERE ud.id_document IS NULL;
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

    const response = await prisma.$queryRaw`
      INSERT INTO user_document (id_user, nama_document, id_jenis_document, tanggal_berlaku, tanggal_berakhir, file, id_status)
      VALUES (${id_user}, ${nama_document}, ${id_jenis_document}, ${tanggal_berlaku}, ${tanggal_berakhir}, ${file}, ${id_status})
    `;

    const insertedRow = await prisma.$queryRaw`
      SELECT * FROM user_document
      WHERE id_user = ${id_user} AND nama_document = ${nama_document}
      ORDER BY id_document DESC LIMIT 1;
    `;

    return insertedRow;
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

    // if file is not provided, do not update the file
    if (!file) {
      console.log(documentData);
      const response = await prisma.$queryRaw`
        UPDATE user_document
        SET id_user = ${id_user},
            nama_document = ${nama_document},
            id_jenis_document = ${id_jenis_document},
            tanggal_berlaku = ${tanggal_berlaku},
            tanggal_berakhir = ${tanggal_berakhir},
            id_status = ${id_status}
        WHERE id_document = ${id}
      `;

      return response;
    }

    const response = await prisma.$queryRaw`
      UPDATE user_document
      SET id_user = ${id_user},
          nama_document = ${nama_document},
          id_jenis_document = ${id_jenis_document},
          tanggal_berlaku = ${tanggal_berlaku},
          tanggal_berakhir = ${tanggal_berakhir},
          file = ${file},
          id_status = ${id_status}
      WHERE id_document = ${id}
    `;

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
