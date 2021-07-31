const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUser, validateLoginUser } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-err');
const { errorMessages } = require('../constants');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLoginUser, login);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', logout);

router.all('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundData));
});

module.exports = router;
