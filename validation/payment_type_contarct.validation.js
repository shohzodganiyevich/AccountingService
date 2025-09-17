const Joi = require("joi");

const payment_type_contractValidation = Joi.object({
  number: Joi.string().min(1).required(),
  signed_date: Joi.date().required(),
});

module.exports = payment_type_contractValidation;
