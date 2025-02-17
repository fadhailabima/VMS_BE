const userModel = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserInternal = async (req, res) => {
  try {
    const users = await userModel.getAllUserInternal();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserDRM = async (req, res) => {
  try {
    const users = await userModel.getAllUserDRM();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.getUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await userModel.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await userModel.updateUser(Number(id), userData);
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userModel.deleteUser(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllUserInternal,
  getAllUserDRM,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
