const router = require('express').Router();

const { createUser } = require('../controllers/users');

router.post('/signup', createUser);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
