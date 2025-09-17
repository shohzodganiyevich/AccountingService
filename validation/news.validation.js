const Joi = require("joi");

const newsValidation = Joi.object({
  name: Joi.string().min(1).required(),
  describtion: Joi.string().required(),
});

module.exports = newsValidation;
