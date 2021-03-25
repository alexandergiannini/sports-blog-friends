//test dasdasd
const router = require('express').Router();
const {User, Post, Comment} = require('../../models')

//  (http://localhost:3001/api/users/)
router.get('/', (req, res) => {
    User.findAll({
   //   include: [Post, Comment]
    }).then(result => {
      res.json(result);
    })
  });


  router.get('/:id', (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
   //   include: [Post, Comment]
    }).then(result => {
      res.json(result);
    })
  });

  //creating a user endpoint
router.post('/', (req, res) => {
    User.create({
     // id: req.body.id,
      username: req.body.username,
      password: req.body.password
    }).then(dbUserData => {
     res.json(dbUserData);
    })
  });


    ///http://localhost:3001/api/user/1 (PUT), updating a user
    router.put('/:id', (req, res) => {
        User.update(
           {
           username: req.body.username,
           password: req.body.password
         },{
           where: {
             id: req.params.id
           }
         },
         ).then(result => {
           res.json(result);
         })
       });
       
       /////deleting a user endpoint
       router.delete('/:id', (req, res) => {
         User.destroy({
           where: {
             id: req.params.id
           }
         }).then(result => {
           res.json(result);
         })
       });
       
       module.exports = router;
       