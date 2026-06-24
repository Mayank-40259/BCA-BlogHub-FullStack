const { sequelize } = require('../config/db.js');
const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

// User aur Post ka One-to-Many Relationship
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Post aur Comment ka One-to-Many Relationship
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// User aur Comment ka One-to-Many Relationship
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Post,
  Comment
};
