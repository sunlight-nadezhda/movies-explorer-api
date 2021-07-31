const mongoose = require('mongoose');

const User = require('../models/user');
const Movie = require('../models/movie');

const NoValidateError = require('../errors/no-validate-err');
const NotFoundError = require('../errors/not-found-err');
const NotEnoughRightsError = require('../errors/not-enough-rights-err');
const { errorMessages } = require('../constants');

// Возвращает все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send(movies))
  .catch(next);

// Создаёт фильм с переданными в теле данными о фильме
module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError(errorMessages.invalidUserId);
  } else {
    return User.findById(userId)
      .orFail(new NotFoundError(errorMessages.notFoundUser))
      .then(() => {
        const {
          country, director, duration, year, description,
          image, trailer, nameRU, nameEN, thumbnail, movieId,
        } = req.body;

        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
          owner: userId,
        })
          .then((user) => res.send(user))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new NoValidateError(errorMessages.invalidData);
            } else next(err);
          });
      })
      .catch(next);
  }
};

// Удаляет сохранённый фильм по id
module.exports.deleteMovieById = (req, res, next) => {
  const userId = req.user._id;
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError(errorMessages.invalidUserId);
  } else {
    return User.findById(userId)
      .orFail(new NotFoundError(errorMessages.notFoundUser))
      .then(() => {
        const { movieId } = req.params;
        Movie.findById(movieId)
          .orFail(new NotFoundError(errorMessages.notFoundMovie))
          .then((movie) => {
            if (!movie.owner._id.equals(userId)) {
              throw new NotEnoughRightsError(errorMessages.notEnoughRights);
            } else {
              Movie.findByIdAndRemove(movieId)
                .then((deletedMovie) => res.send(deletedMovie))
                .catch(next);
            }
          })
          .catch(next);
      })
      .catch(next);
  }
};
