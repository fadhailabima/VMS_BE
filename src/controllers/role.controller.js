const roleModel = require("../models/Role");

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await roleModel.getRoleById(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRole = async (req, res) => {
  const roleData = req.body;

  try {
    const role = await roleModel.createRole(roleData);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const roleData = req.body;

  try {
    const role = await roleModel.updateRole(id, roleData);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await roleModel.deleteRole(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
