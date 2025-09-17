const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = async (req, res, next) => {
  try {
    if (req.admin) {
      if (req.params.id != req.admin.id) {
        return sendErrorResponse(
          { messae: "Faqat shaxsiy ma'lumotlarni ko'rish mumkin!" },
          res,
          403
        );
      }
    } else if (req.client) {
      if (req.params.id != req.client.id) {
        return sendErrorResponse(
          { messae: "Faqat shaxsiy ma'lumotlarni ko'rish mumkin!" },
          res,
          403
        );
      }
    } else if (req.employer) {
      if (req.params.id != req.employer.id) {
        return sendErrorResponse(
          { messae: "Faqat shaxsiy ma'lumotlarni ko'rish mumkin!" },
          res,
          403
        );
      }
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
