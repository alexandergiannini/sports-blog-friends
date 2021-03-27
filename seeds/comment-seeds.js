const { Comment } = require('../models');

const commentData = [
    {
        user_id: 3,
        post_id: 1,
        comment_text: 'They better not trade any Lakers, this team just won the Championship!'
        },
        {
        user_id: 2,
        post_id: 1,
        comment_text: 'The best players are hurt they need another star to make the playoffs!'    
        }    
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;