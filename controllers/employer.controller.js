const { sendErrorResponse } = require("../helpers/send.error.response");
const Employer = require("../models/employer");
const bcrypt = require("bcrypt");

const getAllEmployers = async (req, res) => {
  try {
    const allEmployer = await Employer.findAll();
    res.status(200).json({ message: "All Employers", data: allEmployer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addEmployer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
      experience_year,
      salary,
      start_work_day,
    } = req.body;

    const isHasEmployer = await Employer.findOne({ where: { email } });
    if (isHasEmployer) {
      return sendErrorResponse(
        { message: "Bunday employer mavjud!" },
        res,
        403
      );
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newEmployer = await Employer.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      phone_number,
      experience_year,
      salary,
      start_work_day,
    });
    res.status(201).json({ message: "New Employer added", data: newEmployer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
      experience_year,
      salary,
      start_work_day,
    } = req.body;
    
    const checkEmployer = await Employer.findByPk(id);
    if (!checkEmployer) {
      return res.status(201).json({ message: "This Employer Id not found" });
    }
    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }
    const editEmployer = await Employer.update(
      {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        experience_year,
        salary,
        start_work_day,
      },
      { where: { id }, returning: true }
    );
    console.log(editEmployer);

    res
      .status(201)
      .json({ message: "A employer edited", data: editEmployer[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const id = req.params.id;
    const checkEmployer = await Employer.findByPk(id);
    if (!checkEmployer) {
      return res.status(201).json({ message: "This Employer Id not found" });
    }
    await Employer.destroy({ where: { id } });
    res.status(201).json({ message: "A Employer deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneEmployerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneEmployer = await Employer.findByPk(id);
    res.status(201).json({ message: "A Employer", data: oneEmployer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllEmployers,
  addEmployer,
  updateEmployer,
  deleteEmployer,
  getOneEmployerByID,
};
