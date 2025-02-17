const express = require("express");
const {
  getAllSertifikasi,
  getSertifikasiById,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
} = require("../controllers/jenis_sertifikasi.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/sertifikasi",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllSertifikasi
);
router.get(
  "/sertifikasi/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getSertifikasiById
);
router.post(
  "/sertifikasi",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createSertifikasi
);
router.put(
  "/sertifikasi/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateSertifikasi
);
router.delete(
  "/sertifikasi/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteSertifikasi
);

module.exports = router;
