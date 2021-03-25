//test

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        //   include: [User]
    }).then(result => {
        res.json(result);
    })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        //   include: [User]
    }).then(result => {
        res.json(result);
    })
});


router.post('/', (req, res) => {
    Post.create({
        // id: req.body.id,
        post_title: req.body.post_title,
        post_content: req.body.post_content,  //req.body.body,
        // user_id: req.session.user_id, ///req.body.user_id
        //   user: req.session.username
    }).then(result => {
        res.json(result);
    })

});
///updating a post
router.put('/:id', (req, res) => {
    // update a post by its `id` value
    Post.update(
        req.body
        , {
            where: {
                id: req.params.id
            }
        },
    ).then(result => {
        res.json(result);
    })
});

/////deleting a post endpoint
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
});

module.exports = router;