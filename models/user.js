const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const WrongAuthError = require('../errors/wrong-auth-err');
const { errorMessages, vallidateMessages } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: vallidateMessages.invalidEmail,
    },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
},
{
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function f(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongAuthError(errorMessages.wrongAuth);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new WrongAuthError(errorMessages.wrongAuth);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
