const userSertifikasiModel = require("../models/UserSertifikasi");

const getAllUsersertifikasi = async (req, res) => {
  try {
    const usersertifikasi = await userSertifikasiModel.getAllUserSertifikasi();
    res.status(200).json(usersertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserSertifikasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const userSertifikasi = await userSertifikasiModel.getUserSertifikasiById(
      id
    );
    return res.status(200).json(userSertifikasi[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserSertifikasiByIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const usersertifikasi =
      await userSertifikasiModel.getUserSertifikasiByIdUser(userId);
    return res.status(200).json(usersertifikasi);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserSertifikasiByIdJenisSertifikasi = async (req, res) => {
  const { jenisSertifikasiId } = req.params;
  try {
    const usersertifikasi =
      await userSertifikasiModel.getUserSertifikasiByIdJenisSertifikasi(
        jenisSertifikasiId
      );
    res.status(200).json(usersertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserSertifikasi = async (req, res) => {
  try {
    const data = {
      id_user: req.user.id,
      nama_sertifikasi: req.body.nama_sertifikasi,
      id_jenis_sertifikasi: Number(req.body.id_jenis_sertifikasi),
      tanggal_berlaku: req.body.tanggal_berlaku,
      tanggal_berakhir: req.body.tanggal_berakhir,
      file: req.file.path,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUserSertifikasi = await userSertifikasiModel.createUserSertifikasi(
      data
    );
    res.status(201).json(newUserSertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserSertifikasi = async (req, res) => {
  const { id } = req.params;
  const sertifikasiData = req.body;

  try {
    if (req.file && req.file.path) {
      sertifikasiData.file = req.file.path;
    }
    const updatedUserSertifikasi =
      await userSertifikasiModel.updateUserSertifikasi(id, sertifikasiData);
    return res.status(200).json(updatedUserSertifikasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserSertifikasi = async (req, res) => {
  const { id } = req.params;
  try {
    await userSertifikasiModel.deleteUserSertifikasi(id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersertifikasi,
  getUserSertifikasiById,
  getUserSertifikasiByIdUser,
  getUserSertifikasiByIdJenisSertifikasi,
  createUserSertifikasi,
  updateUserSertifikasi,
  deleteUserSertifikasi,
};
