const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите корректный email',
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

module.exports = mongoose.model('user', userSchema);
