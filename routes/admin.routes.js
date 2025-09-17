const {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminByID,
} = require("../controllers/admin.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const selfGuard = require("../middlewares/guards/self.guard");
const validation = require("../middlewares/validation");
const adminValidation = require("../validation/admin.validation");
const router = require("express").Router();

router.get("/", admin_authGuard, creatorGuard, getAllAdmins);
router.post("/", validation(adminValidation),admin_authGuard, creatorGuard, addAdmin);
router.patch("/:id", validation(adminValidation),admin_authGuard, creatorGuard, updateAdmin);
router.delete("/:id",admin_authGuard,selfGuard, deleteAdmin);
router.get("/:id",admin_authGuard,selfGuard, getOneAdminByID);

module.exports = router;
