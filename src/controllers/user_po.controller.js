const userPOModel = require("../models/UserPO");

const getAllUserPO = async (req, res) => {
  try {
    const userPO = await userPOModel.getAllUserPO();
    res.status(200).json(userPO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPO = async (req, res) => {
  try {
    const userPO = await userPOModel.getUserPO();
    res.status(200).json(userPO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserPO = async (req, res) => {
  try {
    const data = {
      id_user: Number(req.user.id),
      no_po: req.body.no_po,
      no_penawaran: req.body.no_penawaran,
      id_product: Number(req.body.id_product),
      tanggal_dibuat_po: new Date(req.body.tanggal_dibuat_po),
      tanggal_mulai_po: new Date(req.body.tanggal_mulai_po),
      tanggal_berakhir_po: new Date(req.body.tanggal_berakhir_po),
      Terms_of_Payment: req.body.Terms_of_Payment,
      Terms_of_Delivery: req.body.Terms_of_Delivery,
      description: req.body.description,
    };
    const newUserPO = await userPOModel.createUserPO(data);
    res.status(201).json(newUserPO);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserPODetail = async (req, res) => {
  const { id_po } = req.params;
  try {
    const userPO = await userPOModel.getUserPODetail(id_po);
    return res.status(200).json(userPO);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserPO = async (req, res) => {
  const { id } = req.params;
  try {
    await userPOModel.deleteUserPO(Number(id));
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUserPO = async (req, res) => {
  const { id } = req.params;
  const documentData = req.body;

  try {
    const updatedUserPO = await userPOModel.updateUserPO(
      Number(id),
      documentData
    );
    return res.status(200).json(updatedUserPO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPOByPenawaranUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const userPOs = await userPOModel.getUserPOByPenawaranUserId(userId);
    if (!userPOs || userPOs.length === 0) {
      return res.status(404).json({ error: "User PO not found" });
    }
    return res.status(200).json(userPOs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
