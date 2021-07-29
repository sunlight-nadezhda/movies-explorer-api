const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Поле name не должно быть пустым',
        'string.min': 'В поле name должно быть минимум 2 символа',
        'string.max': 'В поле name должно быть максимум 30 символов',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'Поле password не должно быть пустым',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('В поле email должен быть введен валидный email');
    })
      .messages({
        'string.required': 'Поле email не должно быть пустым',
      }),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'Поле country не должно быть пустым',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'Поле director не должно быть пустым',
      }),
    duration: Joi.number().required()
      .messages({
        'number.required': 'Поле duration не должно быть пустым',
      }),
    year: Joi.string().required()
      .messages({
        'string.required': 'Поле year не должно быть пустым',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'Поле description не должно быть пустым',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В поле image должен быть введен валидный url');
    })
      .messages({
        'string.required': 'Поле image не должно быть пустым',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В поле trailer должен быть введен валидный url');
    })
      .messages({
        'string.required': 'Поле trailer не должно быть пустым',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В поле thumbnail должен быть введен валидный url');
    })
      .messages({
        'string.required': 'Поле thumbnail не должно быть пустым',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.required': 'Поле movieId не должно быть пустым',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'Поле nameRU не должно быть пустым',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'Поле nameEN не должно быть пустым',
      }),
  }),
});
