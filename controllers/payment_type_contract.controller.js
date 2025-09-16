const { sendErrorResponse } = require("../helpers/send.error.response");
const PaymentTypeContract = require("../models/payment_type_contract");

const getAllPaymentTypeContracts = async (req, res) => {
  try {
    const allPaymentTypeContract = await PaymentTypeContract.findAll();
    res.status(200).json({
      message: "All PaymentTypeContracts",
      data: allPaymentTypeContract,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addPaymentTypeContract = async (req, res) => {
  try {
    const { number, signed_date, paymentTypeId } = req.body;

    const newPaymentTypeContract = await PaymentTypeContract.create({
      number,
      signed_date,
      paymentTypeId,
    });
    res.status(201).json({
      message: "New PaymentTypeContract added",
      data: newPaymentTypeContract,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updatePaymentTypeContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, signed_date, paymentTypeId } = req.body;

    const editPaymentTypeContract = await PaymentTypeContract.update(
      { number, signed_date, paymentTypeId },
      { where: { id }, returning: true }
    );
    res.status(201).json({
      message: "A PaymentTypeContract edited",
      data: editPaymentTypeContract[1][0],
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deletePaymentTypeContract = async (req, res) => {
  try {
    const id = req.params.id;
    const checkPaymentTypeContract = await PaymentTypeContract.findByPk(id);
    if (!checkPaymentTypeContract) {
      return res
        .status(201)
        .json({ message: "This PaymentTypeContract Id not found" });
    }
    await PaymentTypeContract.destroy({ where: { id } });
    res
      .status(201)
      .json({ message: "A PaymentTypeContract deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOnePaymentTypeContractByID = async (req, res) => {
  try {
    const { id } = req.params;
    const onePaymentTypeContract = await PaymentTypeContract.findByPk(id);
    res
      .status(201)
      .json({ message: "A PaymentTypeContract", data: onePaymentTypeContract });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllPaymentTypeContracts,
  addPaymentTypeContract,
  updatePaymentTypeContract,
  deletePaymentTypeContract,
  getOnePaymentTypeContractByID,
};
