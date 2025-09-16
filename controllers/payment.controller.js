const { sendErrorResponse } = require("../helpers/send.error.response");
const Payment = require("../models/payment");

const getAllPayments = async (req, res) => {
  try {
    const allPayment = await Payment.findAll();
    res.status(200).json({ message: "All Payments", data: allPayment });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addPayment = async (req, res) => {
  try {
    const { summa, payment_date, contractId, paymentTypeId } = req.body;
    const newPayment = await Payment.create({
      summa,
      payment_date,
      contractId,
      paymentTypeId,
    });

    res.status(201).json({ message: "New Payment added", data: newPayment });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { summa, payment_date, contractId, paymentTypeId } = req.body;

    const editPayment = await Payment.update(
      {
        summa,
        payment_date,
        contractId,
        paymentTypeId,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A payment edited", data: editPayment[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const checkPayment = await Payment.findByPk(id);
    if (!checkPayment) {
      return res.status(201).json({ message: "This Payment Id not found" });
    }
    await Payment.destroy({ where: { id } });
    res.status(201).json({ message: "A Payment deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOnePaymentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const onePayment = await Payment.findByPk(id);
    res.status(201).json({ message: "A Payment", data: onePayment });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllPayments,
  addPayment,
  updatePayment,
  deletePayment,
  getOnePaymentByID,
};
