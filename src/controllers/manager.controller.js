const Manager = require("../models/Manager");

const ManagerController = {
  getAllUserPO: async (req, res) => {
    try {
      const allUserPO = await Manager.getAllUserPO();
      res.status(200).json(allUserPO);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ManagerController;
