const { Post } = require('../models');

const postData = [{
        title: 'CSS',
        post_text: 'Styling with CSS helps with layout and appearance',
        user_id: 1

    },
    {
        title: 'HTML',
        post_text: 'HTML is fun to practice',
        user_id: 2
    },
    {
        title: 'Javascript',
        post_text: 'Javascript provides very useful functionality',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;