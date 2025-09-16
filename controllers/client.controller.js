const { sendErrorResponse } = require("./../helpers/send.error.response");
const Client = require("./../models/client");
const bcrypt = require("bcrypt");

const getAllClients = async (req, res) => {
  try {
    const allClient = await Client.findAll();
    res.status(200).json({ message: "All Clients", data: allClient });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      address,
      email,
      passport_ser,
      passport_number,
      password,
      confirm_password,
    } = req.body;

    const isHasClient = await Client.findOne({ where: { email } });
    if (isHasClient) {
      return sendErrorResponse({ message: "Bunday mijoz mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newClient = await Client.create({
      first_name,
      last_name,
      phone_number,
      address,
      email,
      passport_ser,
      passport_number,
      password: hashed_password,
    });
    res.status(201).json({ message: "New Client added", data: newClient });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      address,
      email,
      passport_ser,
      passport_number,
      password,
      confirm_password,
    } = req.body;

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }
    const editClient = await Client.update(
      {
        first_name,
        last_name,
        phone_number,
        address,
        email,
        passport_ser,
        passport_number,
        password,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A client edited", data: editClient[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const checkClient = await Client.findByPk(id);
    if (!checkClient) {
      return res.status(201).json({ message: "This Client Id not found" });
    }
    await Client.destroy({ where: { id } });
    res.status(201).json({ message: "A Client deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneClientByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneClient = await Client.findByPk(id);
    res.status(201).json({ message: "A Client", data: oneClient });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
  getOneClientByID,
};
