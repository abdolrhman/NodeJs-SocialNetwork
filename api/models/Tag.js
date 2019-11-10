const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const Post = require('./Post');


const tableName = 'tags';

const Tag = sequelize.define('Tag', {
  name: {
    type: Sequelize.STRING(180),
    validate: {
      max: 140,
    },
  },
}, { tableName });

/**
 * Creates a "post_tag table with IDs for PostId and TagId
 */
Tag.belongsToMany(Post, {
  as: 'Posts',
  through: 'post_tag',
});

module.exports = Tag;
