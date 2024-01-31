import Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export default {
  loginUserSchema,
};
