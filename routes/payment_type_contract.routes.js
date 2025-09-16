const {
  getAllPaymentTypeContracts,
  addPaymentTypeContract,
  updatePaymentTypeContract,
  deletePaymentTypeContract,
  getOnePaymentTypeContractByID,
} = require("../controllers/payment_type_contract.controller");
const router = require("express").Router();

router.get("/", getAllPaymentTypeContracts);
router.post("/", addPaymentTypeContract);
router.patch("/:id", updatePaymentTypeContract);
router.delete("/:id", deletePaymentTypeContract);
router.get("/:id", getOnePaymentTypeContractByID);

module.exports = router;
