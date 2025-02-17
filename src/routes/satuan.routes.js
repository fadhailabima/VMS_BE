const express = require("express");
const {
  getAllsatuan,
  getSatuanById,
  createSatuan,
  updateSatuan,
  deleteSatuan,
} = require("../controllers/satuan.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/satuan",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllsatuan
);
router.get(
  "/satuan/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getSatuanById
);
router.post(
  "/satuan",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  createSatuan
);
router.put(
  "/satuan/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateSatuan
);
router.delete(
  "/satuan/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteSatuan
);

module.exports = router;
