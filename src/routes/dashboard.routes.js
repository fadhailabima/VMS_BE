const express = require("express");
const { getDashboard } = require("../controllers/dashboard.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles([2, 3, 4]), getDashboard);

module.exports = router;
