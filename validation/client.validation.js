const Joi = require("joi");

const clientValidation = Joi.object({
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  passport_ser: Joi.string().length(2).required(),
  passport_number: Joi.string().length(7).required(),
});

module.exports = clientValidation;
