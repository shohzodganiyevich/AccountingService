const {
  getAllEmployers,
  addEmployer,
  updateEmployer,
  deleteEmployer,
  getOneEmployerByID,
} = require("../controllers/employer.controller");
const router = require("express").Router();

router.get("/", getAllEmployers);
router.post("/", addEmployer);
router.patch("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);
router.get("/:id", getOneEmployerByID);

module.exports = router;
