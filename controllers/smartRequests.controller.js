const { sendErrorResponse } = require("../helpers/send.response.errors");
const Client = require("../models/client");
const Contract = require("./../models/contract");
const { Op } = require("sequelize");

const exercise1 = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const contract = await Contract.findAll({
      where: {
        start_time: {
          [Op.gt]: start_time,
        },
        end_time: {
          [Op.lt]: end_time,
        },
      },
      attributes: [],
    });
    if (contract.length == 0) {
      return sendErrorResponse(
        { message: "Bu vaqt orasida contractlar yo'q" },
        res,
        500
      );
    }

    res.status(200).send({
      message: "success",
      data: contract,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const exercise2 = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const contract = await Contract.findAll({
      where: {
        start_time: {
          [Op.gt]: start_time,
        },
        end_time: {
          [Op.lt]: end_time,
        },
      },
      include: [{ model: Client, as: "client", attributes: ["name"] }],
      attributes: [],
    });
    if (contract.length == 0) {
      return sendErrorResponse(
        { message: "Bu vaqt orasida contractlar yo'q" },
        res,
        500
      );
    }

    res.status(200).send({
      message: "success",
      data: contract,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const exercise3 = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const contract = await Contract.findAll({
      where: {
        start_time: {
          [Op.gt]: start_time,
        },
        end_time: {
          [Op.lt]: end_time,
        },
        is_active: false,
      },
    });
    if (contract.length == 0) {
      return sendErrorResponse(
        { message: "Bu vaqt orasida contractlar yo'q" },
        res,
        500
      );
    }

    res.status(200).send({
      message: "success",
      data: contract,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const exercise4 = async (req, res) => {
  try {
    const { role } = req.body;
    const shart = await Contract.findAll({
      include: [
        {
          model: Worker,
          as: "worker",
          attributes: ["name", "price", "role"],
          where: { role: role },
        },
      ],
      where: { is_active: true },
    });
    if (shart.length == 0) {
      return sendErrorResponse(
        { message: "BUnday ishchi contract tuzmagan" },
        res,
        500
      );
    }
    res.status(200).send({
      data: shart,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};


module.exports = {
  exercise1,
  exercise2,
  exercise3,
  exercise4,
};
