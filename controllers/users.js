const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NoValidateError = require('../errors/no-validate-err');
const ConflictError = require('../errors/conflict-err');
const { errorMessages } = require('../constants');

// Получает информацию о пользователе
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then(({ email, name }) => res.send({ email, name }))
    .catch(next);
};

// Обновляет информацию о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(errorMessages.notFoundUser))
    .then(({ email: emailUp, name: nameUp }) => res.send({ email: emailUp, name: nameUp }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(errorMessages.conflict));
      } else if (err.name === 'ValidationError') {
        next(new NoValidateError(errorMessages.invalidData));
      } else next(err);
    });
};

// Создаёт пользователя с переданными в теле email, password и name
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new NoValidateError(errorMessages.invalidData);
        } else if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(errorMessages.conflict);
        } else next(err);
      }))
    .then(({ email: emailSaved, name: nameSaved, _id }) => {
      const token = jwt.sign(
        { _id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24,
          httpOnly: true,
          sameSite: 'strict',
          domain: '.nomoredomains.monster',
          path: '/',
        })
        .send({ email: emailSaved, name: nameSaved });
    })
    .catch(next);
};

// Проверяет переданные в теле почту и пароль, возвращает JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24,
          httpOnly: true,
          sameSite: 'strict',
          domain: '.nomoredomains.monster',
          path: '/',
        })
        .send({ message: errorMessages.successLogin });
    })
    .catch(next);
};

// Удаляет JWT из кук
module.exports.logout = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
        domain: '.nomoredomains.monster',
        path: '/',
      })
      .send({ message: errorMessages.successLogout });
  } catch (err) {
    next(err);
  }
};
