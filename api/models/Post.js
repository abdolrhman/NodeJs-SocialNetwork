const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const tableName = 'posts';

const Post = sequelize.define('Post', {
  content: {
    type: Sequelize.TEXT(),
    validate: {
      max: 140,
    },
  },
}, { tableName });


// module export is here for a problem in sequalize
// so we need to load tag after export or else the compiler will compile
// will enter Tag before it even finishes post
// there is a better solution but i did this for simplicity
module.exports = Post;
const Tag = require('./Tag');
const User = require('./User');

/**
 * Creates a "post_tag table with IDs for PostId and TagId
 */
Post.belongsToMany(Tag, {
  as: 'HashTagged',
  through: 'post_tag',
});

Post.belongsToMany(User, {
  as: 'UserMentioned',
  through: 'user_mention',
});

Post.belongsTo(User); // puts foreign key UserId in Post Table

