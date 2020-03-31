const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

router.route('/login').post(userController.login);
router.route('/registration').post(userController.registration);

module.exports = router;
