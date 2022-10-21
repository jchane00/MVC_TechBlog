const  {Comment} = require('../models');

const commentData = [
    {
        comment_text: 'Congratulations!',
        post_id: 3,
        user_id: 1
    },
    {
        comment_text: 'This is exceptional!!',
        post_id: 1,
        user_id: 2
    },
    {
        comment_text: 'Nice!',
        post_id: 2,
        user_id: 3
    },
   
   
];
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;