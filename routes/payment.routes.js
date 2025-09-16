const {
  getAllPayments,
  addPayment,
  updatePayment,
  deletePayment,
  getOnePaymentByID,
} = require("../controllers/payment.controller");
const router = require("express").Router();

router.get("/", getAllPayments);
router.post("/", addPayment);
router.patch("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/:id", getOnePaymentByID);

module.exports = router;
