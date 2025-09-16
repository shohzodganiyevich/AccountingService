const { sendErrorResponse } = require("../helpers/send.error.response");
const PaymentType = require("./../models/payment_type");

const getAllPaymentTypes = async (req, res) => {
  try {
    const allPaymentType = await PaymentType.findAll();
    res.status(200).json({ message: "All PaymentTypes", data: allPaymentType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addPaymentType = async (req, res) => {
  try {
    
    const { name } = req.body;
    

    const isHasPaymentType = await PaymentType.findOne({ where: { name } });
    if (isHasPaymentType) {
      return sendErrorResponse(
        { message: "Bunday to'lov turi mavjud!" },
        res,
        400
      );
    }

    const newPaymentType = await PaymentType.create({ name });
    res
      .status(201)
      .json({ message: "New PaymentType added", data: newPaymentType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updatePaymentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const editPaymentType = await PaymentType.update({ name },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A PaymentType edited", data: editPaymentType[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deletePaymentType = async (req, res) => {
  try {
    const id = req.params.id;
    const checkPaymentType = await PaymentType.findByPk(id);
    if (!checkPaymentType) {
      return res.status(201).json({ message: "This PaymentType Id not found" });
    }
    await PaymentType.destroy({ where: { id } });
    res.status(201).json({ message: "A PaymentType deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOnePaymentTypeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const onePaymentType = await PaymentType.findByPk(id);
    res.status(201).json({ message: "A PaymentType", data: onePaymentType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllPaymentTypes,
  addPaymentType,
  updatePaymentType,
  deletePaymentType,
  getOnePaymentTypeByID,
};
