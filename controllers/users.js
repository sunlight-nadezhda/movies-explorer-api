const mongoose = require('mongoose');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const NoValidateError = require('../errors/no-validate-err');

// Получает информацию о пользователе
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  // const userId = '610120993f55d3d1913b6819';
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError('userID пользователя не валиден');
  } else {
    User.findById(userId)
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then((user) => res.send(user))
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
    const { name, email } = req.body;
    User.findByIdAndUpdate(
      userId,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then((user) => res.send(user))
      .catch(next);
  }
};
