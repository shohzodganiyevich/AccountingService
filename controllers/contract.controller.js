const { sendErrorResponse } = require("../helpers/send.error.response");
const Contract = require("../models/contract");

const getAllContracts = async (req, res) => {
  try {
    const allContract = await Contract.findAll();
    res.status(200).json({ message: "All Contracts", data: allContract });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addContract = async (req, res) => {
  try {
    const { number, date_contract, exp_date, summa, clientId } = req.body;

    const isHasContract = await Contract.findOne({ where: { number } });
    if (isHasContract) {
      return sendErrorResponse(
        { message: "Bunday raqamli kontrakt mavjud!" },
        res,
        403
      );
    }

    const newContract = await Contract.create({
      number,
      date_contract,
      exp_date,
      summa,
      clientId,
    });
    res.status(201).json({ message: "New Contract added", data: newContract });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, date_contract, exp_date, summa, clientId } = req.body;

    const editContract = await Contract.update(
      {
        number,
        date_contract,
        exp_date,
        summa,
        clientId,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A contract edited", data: editContract[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteContract = async (req, res) => {
  try {
    const id = req.params.id;
    const checkContract = await Contract.findByPk(id);
    if (!checkContract) {
      return res.status(201).json({ message: "This Contract Id not found" });
    }
    await Contract.destroy({ where: { id } });
    res.status(201).json({ message: "A Contract deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneContractByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneContract = await Contract.findByPk(id);
    res.status(201).json({ message: "A Contract", data: oneContract });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllContracts,
  addContract,
  updateContract,
  deleteContract,
  getOneContractByID,
};
