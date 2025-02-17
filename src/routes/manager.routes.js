const express = require("express");
const router = express.Router();
const ManagerController = require("../controllers/manager.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

router.get(
  "/user-po",
  authenticateToken,
  authorizeRoles([3, 4]),
  ManagerController.getAllUserPO
);

module.exports = router;
