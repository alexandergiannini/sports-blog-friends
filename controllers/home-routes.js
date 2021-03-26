const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'post_title',
          'post_content',
          'user_id'
        ]
        ,
        include: [
          {
            model: Comment,
            attributes: ['id', 'user_id', 'post_id', 'comment_text'] //'createdAt', 'updatedAt'
        },
        {
            model: User,
            attributes: ['username']
        }
      ]
      }).then(dbPostData => {
        console.log(dbPostData);
        console.log(req.session);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
      }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });


    });


module.exports = router;