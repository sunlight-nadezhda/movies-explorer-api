const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { validateMovie } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', deleteMovieById);

module.exports = router;
