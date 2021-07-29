const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateUser, login);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', logout);

router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
