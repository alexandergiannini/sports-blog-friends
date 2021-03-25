const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const allSeeds = async() => {
    await sequelize.sync({ force: false });
    console.log('\n');

    await seedUsers();
    console.log('\n');

    await seedPosts();
    console.log('\n');

    await seedComments();
    console.log('\n');

    process.exit(0);


}

allSeeds();