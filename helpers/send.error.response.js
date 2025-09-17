const logger = require("../services/logger.service");

const sendErrorResponse = (error, res, status) => {
  console.log(error);
  logger.error(error)
  res.status(status).send({
    message: "Xatolik",
    error: error.message,
  });
};

module.exports = { sendErrorResponse };
