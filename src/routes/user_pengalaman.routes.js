const express = require("express");
const {
  getAllUserPengalaman,
  getUserPengalamanById,
  getUserPengalamanByIdUser,
  createUserPengalaman,
  updateUserPengalaman,
  deleteUserPengalaman,
} = require("../controllers/user_pengalaman.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllUserPengalaman
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserPengalamanById
);
router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserPengalamanByIdUser
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createUserPengalaman
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  updateUserPengalaman
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  deleteUserPengalaman
);

module.exports = router;
