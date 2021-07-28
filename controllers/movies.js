const mongoose = require('mongoose');

const User = require('../models/user');
const Movie = require('../models/movie');

const NoValidateError = require('../errors/no-validate-err');
const NotFoundError = require('../errors/not-found-err');
const NotEnoughRightsError = require('../errors/not-enough-rights-err');

// Возвращает все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

// Создаёт фильм с переданными в теле данными о фильме
module.exports.createMovie = (req, res, next) => {
  // const userId = req.user._id;
  const userId = '610120993f55d3d1913b6819';
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError('userID пользователя не валиден');
  } else {
    User.findById(userId)
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
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
              throw new NoValidateError('Проверьте введенные данные');
            } else next(err);
          });
      })
      .catch(next);
  }
};

// Удаляет сохранённый фильм по id
module.exports.deleteMovieById = (req, res, next) => {
  // const userId = req.user._id;
  const userId = '610120993f55d3d1913b6819';
  if (!mongoose.isValidObjectId(userId)) {
    throw new NoValidateError('userID пользователя не валиден');
  } else {
    User.findById(userId)
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then(() => {
        const { movieId } = req.params;
        Movie.findOne({ movieId })
          .orFail(new NotFoundError('Запрашиваемый фильм не найден'))
          .then((movie) => {
            if (!movie.owner._id.equals(userId)) {
              throw new NotEnoughRightsError('Не достаточно прав');
            } else {
              Movie.findOneAndRemove({ movieId })
                .populate(['owner'])
                .then((deletedMovie) => res.send(deletedMovie))
                .catch(next);
            }
          })
          .catch(next);
      })
      .catch(next);
  }
};
