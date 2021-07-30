const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUser } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', validateUser, updateUserInfo);

module.exports = router;
