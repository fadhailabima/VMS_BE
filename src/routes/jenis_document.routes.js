const express = require("express");
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/jenis_document.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/documents",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getAllDocuments
);
router.get(
  "/documents/:id",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  getDocumentById
);
router.post(
  "/documents",
  authenticateToken,
  authorizeRoles([1, 2, 3, 4]),
  createDocument
);
router.put(
  "/documents/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  updateDocument
);
router.delete(
  "/documents/:id",
  authenticateToken,
  authorizeRoles([2, 3, 4]),
  deleteDocument
);

module.exports = router;
