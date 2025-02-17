const express = require("express");
const {
  getAllJenisProducts,
  getJenisProductById,
  createJenisProduct,
  updateJenisProduct,
  deleteJenisProduct,
} = require("../controllers/jenis_product.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/jenis-products",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllJenisProducts
);
router.get(
  "/jenis-products/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getJenisProductById
);
router.post(
  "/jenis-products",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createJenisProduct
);
router.put(
  "/jenis-products/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateJenisProduct
);
router.delete(
  "/jenis-products/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteJenisProduct
);

module.exports = router;
