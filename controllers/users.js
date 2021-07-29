const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NoValidateError = require('../errors/no-validate-err');
const IsAlreadyTakenError = require('../errors/is-already-taken-err');

// Получает информацию о пользователе
module.exports.getUserInfo = (req, res, next) => {
  // const userId = req.user._id;
  const userId = '610120993f55d3d1913b6819';
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError('userID пользователя не валиден');
  } else {
    User.findById(userId)
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then(({ email, name }) => res.send({ email, name }))
      .catch(next);
  }
};

// Обновляет информацию о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  // const userId = req.user._id;
  const userId = '610120993f55d3d1913b6819';
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError('userID пользователя не валиден');
  } else {
    const { email, name } = req.body;
    User.findByIdAndUpdate(
      userId,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then(({ email: emailUp, name: nameUp }) => res.send({ emailUp, nameUp }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new NoValidateError('Проверьте введенные данные');
        } else next(err);
      });
  }
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
    }))
    .then(({ email: emailSaved, name: nameSaved }) => res
      .send({ email: emailSaved, name: nameSaved }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NoValidateError('Проверьте введенные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new IsAlreadyTakenError('Введенный email уже занят');
      } else next(err);
    });
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
          maxAge: 3600000,
          httpOnly: true,
          sameSite: false,
          secure: true,
        })
        .send({ message: 'Вы успешно авторизованы!' });
    })
    .catch(next);
};
