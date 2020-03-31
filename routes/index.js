const router = require('express-promise-router')();
const userRoutes = require('./user');

router.use('/user', userRoutes);

module.exports = router;
