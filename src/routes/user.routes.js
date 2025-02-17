const express = require("express");
const {
  getAllUsers,
  getAllUserInternal,
  getAllUserDRM,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles([2, 3, 4]), getAllUsers);
router.get(
  "/userInternal",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  getAllUserInternal
);
router.get(
  "/userDRM",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  getAllUserDRM
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserById
);
router.post("/", createUser);
router.put("/:id", authenticateToken, authorizeRoles([1, 2, 3, 4]), updateUser);
router.delete("/:id", authenticateToken, authorizeRoles([4]), deleteUser);

module.exports = router;
