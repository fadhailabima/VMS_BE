const express = require("express");
const upload = require("../utils/multer");

const {
  getAllUserProducts,
  getUserProductDetail,
  getUserProductByIdUser,
  createUserProduct,
  updateUserProduct,
  deleteUserProduct,
  getUserProductSummaryByIdUser,
} = require("../controllers/user_product.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllUserProducts
);
router.get(
  "/summary",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserProductSummaryByIdUser
);
router.get(
  "/:productId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserProductDetail
);
router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getUserProductByIdUser
);
router.post(
  "/",
  upload.single("file"),
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createUserProduct
);
router.put(
  "/:id",
  upload.single("file"),
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  updateUserProduct
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  deleteUserProduct
);

module.exports = router;
