//test
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./post-routes.js');

const commentRoutes = require('./comment-routes');

router.user('/users', userRoutes);

router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;