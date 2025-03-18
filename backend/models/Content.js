const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? rawValue.split(',') : [];
    },
    set(val) {
      this.setDataValue('tags', Array.isArray(val) ? val.join(',') : '');
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  }
});

module.exports = Content;