const userPengalamanModel = require("../models/UserPengalaman");

const getAllUserPengalaman = async (req, res) => {
  try {
    const userpengalaman = await userPengalamanModel.getAllUserPengalaman();
    res.status(200).json(userpengalaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPengalamanById = async (req, res) => {
  const { id } = req.params;
  try {
    const userpengalaman = await userPengalamanModel.getUserPengalamanById(id);
    return res.status(200).json(userpengalaman);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserPengalamanByIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userpengalaman = await userPengalamanModel.getUserPengalamanByIdUser(
      userId
    );
    return res.status(200).json(userpengalaman);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUserPengalaman = async (req, res) => {
  try {
    const data = {
      id_user: req.user.id,
      nama_klien: req.body.nama_klien,
      nama_proyek: req.body.nama_proyek,
      nilai_proyek: Number(req.body.nilai_proyek),
      id_kurs: Number(req.body.id_kurs),
      no_kontrak: req.body.no_kontrak,
      kontak_klien: req.body.kontak_klien,
      tanggal_mulai: req.body.tanggal_mulai,
      tanggal_selesai: req.body.tanggal_selesai,
    };
    const newUserPengalaman = await userPengalamanModel.createUserPengalaman(
      data
    );
    res.status(201).json(newUserPengalaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserPengalaman = async (req, res) => {
  const { id } = req.params;
  const pengalamanData = req.body;
  const userId = req.user.id;
  pengalamanData.id_user = userId;
  try {
    const updatedUserPengalaman =
      await userPengalamanModel.updateUserPengalaman(id, pengalamanData);
    console.log(updatedUserPengalaman);
    return res.status(200).json(updatedUserPengalaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserPengalaman = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await userPengalamanModel.deleteUserPengalaman(id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserPengalaman,
  getUserPengalamanById,
  getUserPengalamanByIdUser,
  createUserPengalaman,
  updateUserPengalaman,
  deleteUserPengalaman,
};
