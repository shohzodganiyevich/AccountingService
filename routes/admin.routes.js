const {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminByID,
} = require("../controllers/admin.controller");
const router = require("express").Router();

router.get("/", getAllAdmins);
router.post("/", addAdmin);
router.patch("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/:id", getOneAdminByID);

module.exports = router;
