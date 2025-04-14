const express = require("express");
const {
  login,
  register,
  refreshAccessToken,
  logout,
  getCurrentUser,
} = require("../controllers/auth.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/token", refreshAccessToken);
router.post("/logout", logout);
router.get("/data", authenticateToken, getCurrentUser);

module.exports = router;
