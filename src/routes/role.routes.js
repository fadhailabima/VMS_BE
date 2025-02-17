const express = require("express");
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");
const router = express.Router();

router.get(
  "/roles",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllRoles
);
router.get(
  "/roles/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getRoleById
);
router.post("/roles", authenticateToken, authorizeRoles([4]), createRole);
router.put("/roles/:id", authenticateToken, authorizeRoles([4]), updateRole);
router.delete("/roles/:id", authenticateToken, authorizeRoles([4]), deleteRole);

module.exports = router;
