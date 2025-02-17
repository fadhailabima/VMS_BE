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

module.exports = {
  getAllUserPO,
  getUserPO,
  createUserPO,
  getUserPODetail,
  deleteUserPO,
  updateUserPO,
};

// const getUserPenawaranByManager = async (req, res) => {
//   try {
//     const userPenawaran = await userPenawaranModel.getUserPenawaranByManager();
//     res.status(200).json(userPenawaran);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getUserPenawaranDetail = async (req, res) => {
//   const { penawaranId } = req.params;
//   try {
//     const userPenawaran = await userPenawaranModel.getUserPenawaranDetail(
//       penawaranId
//     );
//     return res.status(200).json(userPenawaran);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const getUserPenawaranByIdUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const userPenawaran = await userPenawaranModel.getUserPenawaranByIdUser(
//       userId
//     );
//     if (!userPenawaran) {
//       return res.status(404).json({ error: "User penawaran not found" });
//     }
//     return res.status(200).json(userPenawaran);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const getUserPenawaranByStatusPenawaran = async (req, res) => {
//   const { statuspenawaranId } = req.params;
//   try {
//     const userPenawaran =
//       await userPenawaranModel.getUserPenawaranByStatusPenawaran(
//         statuspenawaranId
//       );
//     if (!userPenawaran) {
//       return res.status(404).json({ error: "User penawaran not found" });
//     }
//     return res.status(200).json(userPenawaran);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const getUserPenawaranByStatusProsesPenawaran = async (req, res) => {
//   const { statusprosespenawaranId } = req.params;
//   try {
//     const userPenawaran =
//       await userPenawaranModel.getUserPenawaranByStatusProsesPenawaran(
//         statusprosespenawaranId
//       );
//     if (!userPenawaran) {
//       return res.status(404).json({ error: "User penawaran not found" });
//     }
//     return res.status(200).json(userPenawaran);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const createUserPenawaran = async (req, res) => {
//   try {
//     const data = {
//       no_penawaran: req.body.no_penawaran,
//       id_user: Number(req.body.id_user),
//       id_product: Number(req.body.id_product),
//       tanggal_dibuat_penawaran: req.body.tanggal_dibuat_penawaran,
//       tanggal_mulai_penawaran: req.body.tanggal_mulai_penawaran,
//       tanggal_berakhir_penawaran: req.body.tanggal_berakhir_penawaran,
//       Terms_of_Payment: req.body.Terms_of_Payment,
//       Terms_of_Delivery: req.body.Terms_of_Delivery,
//       description: req.body.description,
//       id_status_penawaran: Number(req.body.id_status_penawaran),
//       id_status_proses_penawaran: Number(req.body.id_status_proses_penawaran),
//     };
//     console.log(data);
//     const newUserPenawaran = await userPenawaranModel.createUserPenawaran(data);
//     res.status(201).json(newUserPenawaran);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateUserPenawaran = async (req, res) => {
//   const { id } = req.params;
//   const documentData = req.body;

//   try {
//     const updatedUserPenawaran = await userPenawaranModel.updateUserPenawaran(
//       id,
//       documentData
//     );
//     console.log(updatedUserPenawaran);
//     return res.status(200).json(updatedUserPenawaran);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteUserPenawaran = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     await userPenawaranModel.deleteUserPenawaran(id);
//     res.status(204).send();
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
