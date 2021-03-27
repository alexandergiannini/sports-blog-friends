const { User } = require('../models');

const userData = [
    {
    username: 'Tae',
    password: '1234'
  },
  {
    username: 'Davit',
    password: '2345'
  },
  {
    username: 'Alex',
    password: '3456'
  },
  {
    username: 'Matt',
    password: '4567'
  },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;