const {
  getAllWorks,
  addWork,
  updateWork,
  deleteWork,
  getOneWorkByID,
} = require("../controllers/work.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const employer_authGuard = require("../middlewares/guards/employer_auth.guard");
const workValidation = require("../validation/work.validation");
const router = require("express").Router();
const validation = require("./../middlewares/validation");

router.get("/",employer_authGuard, getAllWorks);
router.post("/", validation(workValidation),admin_authGuard, addWork);
router.patch("/:id", validation(workValidation),admin_authGuard, updateWork);
router.delete("/:id",admin_authGuard, deleteWork);
router.get("/:id",admin_authGuard, getOneWorkByID);

module.exports = router;
