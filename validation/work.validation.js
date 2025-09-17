const Joi = require("joi");

const workValidation = Joi.object({
  name: Joi.string().required(),
});

module.exports = workValidation;
