const Joi = require("joi");

const paymentValidation = Joi.object({
  summa: Joi.number().min(0).required(),
  payment_date: Joi.date().required(),
});

module.exports = paymentValidation;
