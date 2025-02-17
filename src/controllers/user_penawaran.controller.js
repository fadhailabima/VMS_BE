const userPenawaranModel = require("../models/UserPenawaran");

const getAllUserPenawaran = async (req, res) => {
  try {
    const userPenawaran = await userPenawaranModel.getAllUserPenawaran();
    res.status(200).json(userPenawaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranByManager = async (req, res) => {
  try {
    const userPenawaran = await userPenawaranModel.getUserPenawaranByManager();
    res.status(200).json(userPenawaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranDetail = async (req, res) => {
  const { penawaranId } = req.params;
  try {
    const userPenawaran = await userPenawaranModel.getUserPenawaranDetail(
      penawaranId
    );
    return res.status(200).json(userPenawaran[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranByIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userPenawaran = await userPenawaranModel.getUserPenawaranByIdUser(
      userId
    );
    if (!userPenawaran) {
      return res.status(404).json({ error: "User penawaran not found" });
    }
    return res.status(200).json(userPenawaran);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranSummaryByIdUser = async (req, res) => {
  const userId = Number(req.user.id);
  try {
    const userPenawaran =
      await userPenawaranModel.getUserPenawaranSummaryByIdUser(userId);
    if (!userPenawaran) {
      return res.status(404).json({ error: "User penawaran not found" });
    }
    return res.status(200).json(userPenawaran);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranByStatusPenawaran = async (req, res) => {
  const { statuspenawaranId } = req.params;
  try {
    const userPenawaran =
      await userPenawaranModel.getUserPenawaranByStatusPenawaran(
        statuspenawaranId
      );
    if (!userPenawaran) {
      return res.status(404).json({ error: "User penawaran not found" });
    }
    return res.status(200).json(userPenawaran);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserPenawaranByStatusProsesPenawaran = async (req, res) => {
  const { statusprosespenawaranId } = req.params;
  console.log(statusprosespenawaranId);
  try {
    const userPenawaran =
      await userPenawaranModel.getUserPenawaranByStatusProsesPenawaran(
        statusprosespenawaranId
      );
    if (!userPenawaran) {
      return res.status(404).json({ error: "User penawaran not found" });
    }
    return res.status(200).json(userPenawaran);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUserPenawaran = async (req, res) => {
  try {
    const data = {
      no_penawaran: req.body.no_penawaran,
      id_user: Number(req.user.id),
      id_product: Number(req.body.id_product),
      tanggal_dibuat_penawaran: req.body.tanggal_dibuat_penawaran,
      tanggal_mulai_penawaran: req.body.tanggal_mulai_penawaran,
      tanggal_berakhir_penawaran: req.body.tanggal_berakhir_penawaran,
      Terms_of_Payment: req.body.terms_of_payment,
      Terms_of_Delivery: req.body.terms_of_delivery,
      description: req.body.description,
      id_status_penawaran: Number(req.body.id_status_penawaran),
      id_status_proses_penawaran: 3,
    };
    const newUserPenawaran = await userPenawaranModel.createUserPenawaran(data);
    res.status(201).json(newUserPenawaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserPenawaran = async (req, res) => {
  const { id } = req.params;
  const documentData = req.body;

  try {
    const updatedUserPenawaran = await userPenawaranModel.updateUserPenawaran(
      id,
      documentData
    );
    return res.status(200).json(updatedUserPenawaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserPenawaran = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await userPenawaranModel.deleteUserPenawaran(id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
