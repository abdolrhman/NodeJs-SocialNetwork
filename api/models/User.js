const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING(180),
    unique: true,
  },
  password: {
    type: Sequelize.STRING(180),
  },
  userName: {
    type: Sequelize.STRING(180),
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING(180),
  },
  lastName: {
    type: Sequelize.STRING(180),
  },

}, { hooks, tableName });

// export in that way!!? "Refer to Post model comment code"
// line 18:21
module.exports = User;
const Post = require('./Post');

User.belongsToMany(Post, {
  as: 'PostMentioned',
  through: 'user_mention',
});


// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

