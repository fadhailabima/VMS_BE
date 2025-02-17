const userModel = require("../models/User");
const UserPO = require("../models/UserPO");
const UserPenawaran = require("../models/UserPenawaran");

const getDashboard = async (req, res) => {
  try {
    const vendors = await userModel.getAllUserDRM();
    const userPO = await UserPO.getUserPO();
    const userPenawaran = await UserPenawaran.getAllUserPenawaran();

    const resBody = {
      total_vendor: vendors.length,
      total_verified_vendor: vendors.filter((vendor) => vendor.id_status === 1)
        .length,
      total_po: userPO.length,
      total_penawaran: userPenawaran.length,
      total_penawaran_staff: userPenawaran.filter(
        (penawaran) => penawaran.id_status_proses_penawaran === 4
      ).length,
      total_penawaran_manager: userPenawaran.filter(
        (penawaran) => penawaran.id_status_proses_penawaran === 5
      ).length,
      vendors,
      PO: userPO,
      penawaran: userPenawaran,
    };

    res.status(200).json(resBody);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboard,
};
