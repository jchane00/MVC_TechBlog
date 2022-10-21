const { User } = require('../models');

const userData = [{
        username: 'Jarmaris',
        email: 'jchaney@fakemail.com',
        password: 'JC1234'

    },
    {
        username: 'Mark',
        email: 'mark@fakemail.com',
        password: 'nintendo64'
    },
    {
        username: 'Tony',
        email: 'tony@fakemail.com',
        password: 'Soprano567'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;