const {
  getAllPaymentTypes,
  addPaymentType,
  updatePaymentType,
  deletePaymentType,
  getOnePaymentTypeByID,
} = require("../controllers/payment_type.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const payment_typeValidation = require("../validation/payment_type.validation");
const router = require("express").Router();
const validation=require("./../middlewares/validation")



router.get("/", getAllPaymentTypes);
router.post("/",validation(payment_typeValidation),admin_authGuard, addPaymentType);
router.patch("/:id",validation(payment_typeValidation),admin_authGuard, updatePaymentType);
router.delete("/:id",admin_authGuard, deletePaymentType);
router.get("/:id", getOnePaymentTypeByID);

module.exports = router;
