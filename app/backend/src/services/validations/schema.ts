import Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
  'string.email': 'Invalid email or password',
  'string.min': 'Invalid email or password',
});

export default {
  loginUserSchema,
};
