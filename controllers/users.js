const mongoose = require('mongoose');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const NoValidateError = require('../errors/no-validate-err');

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
      .then(({ emailUp, nameUp }) => res.send({ emailUp, nameUp }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new NoValidateError('Проверьте введенные данные');
        } else next(err);
      });
  }
};
