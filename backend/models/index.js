const sequelize = require('../config/database');
const User = require('./User');
const Content = require('./Content');
const Media = require('./Media');

// Define relationships
User.hasMany(Content, { foreignKey: 'authorId' });
Content.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Media, { foreignKey: 'uploadedById' });
Media.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploadedBy' });

// Sync models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export { sequelize, User, Content, Media, syncDatabase };