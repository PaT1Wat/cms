import sequelize from '../config/database.js';
import User from './User.js';
import Content from './Content.js';
import Media from './Media.js';

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