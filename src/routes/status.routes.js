const express = require("express");
const {
  getAllstatus,
  getStatusById,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/status",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllstatus
);
router.get(
  "/status/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getStatusById
);
router.post(
  "/status",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  createStatus
);
router.put(
  "/status/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateStatus
);
router.delete(
  "/status/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteStatus
);

module.exports = router;
