const { sendErrorResponse } = require("../helpers/send.error.response");
const News = require("../models/news");

const getAllNews = async (req, res) => {
  try {
    const allNews = await News.findAll();
    res.status(200).json({ message: "All News", data: allNews });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addNews = async (req, res) => {
  try {
    const { name, describtion, adminId } = req.body;

    const newNews = await News.create({ name, describtion, adminId });
    res.status(201).json({ message: "New News added", data: newNews });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, describtion, adminId } = req.body;
    const editNews = await News.update(
      { name, describtion, adminId },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A news edited", data: editNews[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    const checkNews = await News.findByPk(id);
    if (!checkNews) {
      return res.status(201).json({ message: "This News Id not found" });
    }
    await News.destroy({ where: { id } });
    res.status(201).json({ message: "A News deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneNewsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneNews = await News.findByPk(id);
    res.status(201).json({ message: "A News", data: oneNews });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  getOneNewsByID,
};
