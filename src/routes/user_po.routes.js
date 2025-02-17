const express = require("express");
const {
  getAllUserPO,
  getUserPO,
  createUserPO,
  getUserPODetail,
  deleteUserPO,
  updateUserPO,
} = require("../controllers/user_po.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles([3]), getAllUserPO);

router.get("/userPO", authenticateToken, authorizeRoles([2, 3]), getUserPO);

router.get(
  "/:id_po",
  authenticateToken,
  authorizeRoles([2, 3]),
  getUserPODetail
);

router.post("/", authenticateToken, authorizeRoles([3]), createUserPO);

router.delete("/:id", authenticateToken, authorizeRoles([3]), deleteUserPO);

router.put("/:id", authenticateToken, authorizeRoles([3]), updateUserPO);
// router.post(
//   "/",
//   authenticateToken,
//   authorizeRoles([1, 2, 3, 4]),
//   createUserPenawaran
// );
// router.put(
//   "/:id",
//   authenticateToken,
//   authorizeRoles([1, 2, 3, 4]),
//   updateUserPenawaran
// );
// router.delete(
//   "/:id",
//   authenticateToken,
//   authorizeRoles([1, 2, 3, 4]),
//   deleteUserPenawaran
// );

module.exports = router;
