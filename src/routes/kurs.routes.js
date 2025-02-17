const express = require("express");
const {
  getAllKurs,
  getKursById,
  createKurs,
  updateKurs,
  deleteKurs,
} = require("../controllers/kurs.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/kurs",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllKurs
);
router.get(
  "/kurs/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getKursById
);
router.post(
  "/kurs",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createKurs
);
router.put(
  "/kurs/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateKurs
);
router.delete(
  "/kurs/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteKurs
);

module.exports = router;
