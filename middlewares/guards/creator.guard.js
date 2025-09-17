const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = async (req, res, next) => {
  try {
    if (!req.admin.is_creator) {
      return sendErrorResponse({ message: "Siz creator emassiz" }, res, 403);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
