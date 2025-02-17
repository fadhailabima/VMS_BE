const express = require("express");
const {
  getAllprovinsi,
  getprovinsiById,
  createprovinsi,
  updateprovinsi,
  deleteprovinsi,
} = require("../controllers/provinsi.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/provinsi", getAllprovinsi);
router.get("/provinsi/:id", getprovinsiById);
router.post(
  "/provinsi",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  createprovinsi
);
router.put(
  "/provinsi/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateprovinsi
);
router.delete(
  "/provinsi/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteprovinsi
);

module.exports = router;
