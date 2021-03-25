//test
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.user('/users', userRoutes);

module.exports = router;