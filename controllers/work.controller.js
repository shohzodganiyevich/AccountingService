const { sendErrorResponse } = require("../helpers/send.error.response");
const Work = require("./../models/work");

const getAllWorks = async (req, res) => {
  try {
    const allWork = await Work.findAll();
    res.status(200).json({ message: "All Works", data: allWork });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addWork = async (req, res) => {
  try {
    const { name, contractId, employerId } = req.body;
    const newWork = await Work.create({
      name,
      contractId,
      employerId,
    });

    res.status(201).json({ message: "New Work added", data: newWork });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contractId, employerId } = req.body;
    const checkWork = await Work.findByPk(id);
    if (!checkWork) {
      return res.status(201).json({ message: "This Work Id not found" });
    }
    const editWork = await Work.update(
      {
        name,
        contractId,
        employerId,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A work edited", data: editWork[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteWork = async (req, res) => {
  try {
    const id = req.params.id;
    const checkWork = await Work.findByPk(id);
    if (!checkWork) {
      return res.status(201).json({ message: "This Work Id not found" });
    }
    await Work.destroy({ where: { id } });
    res.status(201).json({ message: "A Work deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneWorkByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneWork = await Work.findByPk(id);
    res.status(201).json({ message: "A Work", data: oneWork });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllWorks,
  addWork,
  updateWork,
  deleteWork,
  getOneWorkByID,
};
