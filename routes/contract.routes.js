const {
  getAllContracts,
  addContract,
  updateContract,
  deleteContract,
  getOneContractByID,
} = require("../controllers/contract.controller");
const router = require("express").Router();

router.get("/", getAllContracts);
router.post("/", addContract);
router.patch("/:id", updateContract);
router.delete("/:id", deleteContract);
router.get("/:id", getOneContractByID);

module.exports = router;
