const {
  getAllPaymentTypeContracts,
  addPaymentTypeContract,
  updatePaymentTypeContract,
  deletePaymentTypeContract,
  getOnePaymentTypeContractByID,
} = require("../controllers/payment_type_contract.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const payment_type_contractValidation = require("../validation/payment_type_contarct.validation");
const router = require("express").Router();
const validation=require("./../middlewares/validation")


router.get("/",admin_authGuard, getAllPaymentTypeContracts);
router.post("/",validation(payment_type_contractValidation),admin_authGuard, addPaymentTypeContract);
router.patch("/:id",validation(payment_type_contractValidation),admin_authGuard, updatePaymentTypeContract);
router.delete("/:id",admin_authGuard, deletePaymentTypeContract);
router.get("/:id",admin_authGuard, getOnePaymentTypeContractByID);

module.exports = router;
