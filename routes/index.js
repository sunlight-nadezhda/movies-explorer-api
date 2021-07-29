const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/signout', logout);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
