const jwt = require('jsonwebtoken');

const WrongAuthError = require('../errors/wrong-auth-err');
const { errorMessages } = require('../constants');
const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new WrongAuthError(errorMessages.needAuth);
  } else {
    let payload;
    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      throw new WrongAuthError(errorMessages.needAuth);
    }
    req.user = payload;
  }

  next();
};
