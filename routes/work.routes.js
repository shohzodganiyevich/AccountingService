const {
  getAllWorks,
  addWork,
  updateWork,
  deleteWork,
  getOneWorkByID,
} = require("../controllers/work.controller");
const router = require("express").Router();

router.get("/", getAllWorks);
router.post("/", addWork);
router.patch("/:id", updateWork);
router.delete("/:id", deleteWork);
router.get("/:id", getOneWorkByID);

module.exports = router;
