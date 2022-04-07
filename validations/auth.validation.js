const Joi = require('joi');

module.exports = {
  login: Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }),
  signup: Joi.object({
    password: Joi.string().required(),
    phone: Joi.string().required(),
    publickey: Joi.string().required(),
    privatekey: Joi.string().required(),
  }),
};
