//test
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./post-routes.js');


router.user('/users', userRoutes);

router.use('/posts', postRoutes);


module.exports = router;