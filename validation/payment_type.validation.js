const Joi = require("joi");

const payment_typeValidation = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = payment_typeValidation;
