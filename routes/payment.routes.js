const {
  getAllPayments,
  addPayment,
  updatePayment,
  deletePayment,
  getOnePaymentByID,
} = require("../controllers/payment.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const paymentValidation = require("../validation/payment.validation");
const router = require("express").Router();
const validation = require("./../middlewares/validation");

router.get("/",admin_authGuard,creatorGuard, getAllPayments);
router.post("/", validation(paymentValidation),admin_authGuard, addPayment);
router.patch("/:id", validation(paymentValidation),admin_authGuard, updatePayment);
router.delete("/:id",admin_authGuard, deletePayment);
router.get("/:id",admin_authGuard, getOnePaymentByID);

module.exports = router;
