const express = require("express");
const {
  getAllUsersertifikasi,
  getUserSertifikasiById,
  getUserSertifikasiByIdUser,
  getUserSertifikasiByIdJenisSertifikasi,
  createUserSertifikasi,
  updateUserSertifikasi,
  deleteUserSertifikasi,
} = require("../controllers/user_sertifikasi.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");
const upload = require("../utils/multer");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllUsersertifikasi
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserSertifikasiById
);
router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserSertifikasiByIdUser
);
router.get(
  "/jenis/:jenisSertifikasiId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserSertifikasiByIdJenisSertifikasi
);
router.post(
  "/",
  upload.single("file"),
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createUserSertifikasi
);
router.put(
  "/:id",
  upload.single("file"),
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  updateUserSertifikasi
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  deleteUserSertifikasi
);

module.exports = router;
