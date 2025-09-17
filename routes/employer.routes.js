const {
  getAllEmployers,
  addEmployer,
  updateEmployer,
  deleteEmployer,
  getOneEmployerByID,
} = require("../controllers/employer.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const employer_authGuard = require("../middlewares/guards/employer_auth.guard");
const selfGuard = require("../middlewares/guards/self.guard");
const employerValidation = require("../validation/employer.validation");
const router = require("express").Router();
const validation=require("./../middlewares/validation")

router.get("/", admin_authGuard,creatorGuard, getAllEmployers);
router.post("/",validation(employerValidation),employer_authGuard, addEmployer);
router.patch("/:id",validation(employerValidation),admin_authGuard, updateEmployer);
router.delete("/:id",selfGuard, deleteEmployer);
router.get("/:id",selfGuard, getOneEmployerByID);

module.exports = router;
