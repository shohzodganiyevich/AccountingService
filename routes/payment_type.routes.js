const {
  getAllPaymentTypes,
  addPaymentType,
  updatePaymentType,
  deletePaymentType,
  getOnePaymentTypeByID,
} = require("../controllers/payment_type.controller");
const router = require("express").Router();



router.get("/", getAllPaymentTypes);
router.post("/", addPaymentType);
router.patch("/:id", updatePaymentType);
router.delete("/:id", deletePaymentType);
router.get("/:id", getOnePaymentTypeByID);

module.exports = router;
