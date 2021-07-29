const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');
// const { validateId } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfo);

module.exports = router;
