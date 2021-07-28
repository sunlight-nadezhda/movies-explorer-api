const Movie = require('../models/movie');
const NoValidateError = require('../errors/no-validate-err');

// Возвращает все сохранённые пользователем фильмы
module.exports.getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({})
      .populate(['owner']);
  } catch (err) {
    next(err);
  }

  try {
    await res.send(movies);
  } catch (err) {
    next(err);
  }
};

// Создаёт фильм с переданными в теле данными о фильме
module.exports.createMovie = async (req, res, next) => {
  try {
    // const userId = req.user._id;
    const userId = '610120993f55d3d1913b6819';
    const {
      country, director, duration, year, description,
      image, trailer, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    let movie;
    try {
      movie = await Movie.create({
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
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new NoValidateError('Проверьте введенные данные');
      }
      throw err;
    }
    try {
      await res.send(movie);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
