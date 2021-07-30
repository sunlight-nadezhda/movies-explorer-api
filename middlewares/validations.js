const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { vallidateMessages } = require('../constants');

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.nameRequired);
      })
      .messages({
        'string.required': vallidateMessages.nameRequired,
        'string.min': vallidateMessages.nameMin,
        'string.max': vallidateMessages.nameMax,
      }),
    password: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.passwordRequired);
      })
      .messages({
        'string.required': vallidateMessages.passwordRequired,
      }),
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.invalidEmail);
      })
      .messages({
        'string.required': vallidateMessages.emailRequired,
      }),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.countryRequired);
      })
      .messages({
        'string.required': vallidateMessages.countryRequired,
      }),
    director: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.directorRequired);
      })
      .messages({
        'string.required': vallidateMessages.directorRequired,
      }),
    duration: Joi.number().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.durationRequired);
      })
      .messages({
        'number.required': vallidateMessages.durationRequired,
      }),
    year: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.yearRequired);
      })
      .messages({
        'string.required': vallidateMessages.yearRequired,
      }),
    description: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.descriptionRequired);
      })
      .messages({
        'string.required': vallidateMessages.descriptionRequired,
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(vallidateMessages.invalidImageURL);
    })
      .messages({
        'string.required': vallidateMessages.imageRequired,
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(vallidateMessages.invalidTrailerURL);
    })
      .messages({
        'string.required': vallidateMessages.trailerRequired,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(vallidateMessages.invalidThumbnailURL);
    })
      .messages({
        'string.required': vallidateMessages.thumbnailRequired,
      }),
    movieId: Joi.number().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.movieIdRequired);
      })
      .messages({
        'number.required': vallidateMessages.movieIdRequired,
      }),
    nameRU: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.nameRURequired);
      })
      .messages({
        'string.required': vallidateMessages.nameRURequired,
      }),
    nameEN: Joi.string().required()
      .custom((value, helpers) => {
        if (!validator.isEmpty(value)) {
          return value;
        }
        return helpers.message(vallidateMessages.nameENRequired);
      })
      .messages({
        'string.required': vallidateMessages.nameENRequired,
      }),
  }),
});
