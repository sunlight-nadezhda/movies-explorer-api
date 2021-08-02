const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { validateMovie, validateId } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateId, deleteMovieById);

module.exports = router;
