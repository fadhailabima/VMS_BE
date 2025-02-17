const express = require("express");
const {
  getAllkota,
  getKotaById,
  getKotaByProvinsiId,
  createKota,
  updateKota,
  deleteKota,
} = require("../controllers/kota.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/kota",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllkota
);
router.get(
  "/kota/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getKotaById
);
router.get(
  "/kota/provinsi/:provinsiId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getKotaByProvinsiId
);
router.post("/kota", authenticateToken, authorizeRoles([2, 3, 4]), createKota);
router.put(
  "/kota/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateKota
);
router.delete(
  "/kota/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteKota
);

module.exports = router;
