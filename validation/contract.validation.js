const Joi = require("joi");

const contractValidation = Joi.object({
  number: Joi.string().min(1).required(),
  date_contract: Joi.date().required(),
  exp_date: Joi.date().required(),
  summa: Joi.number().required(),
});

module.exports = contractValidation;
