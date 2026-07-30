const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Модель Статьи
const Article = sequelize.define('Article', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  text: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  }
}, {
  timestamps: true 
});


const Comment = sequelize.define('Comment', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  text: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  articleId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  timestamps: true
});

Article.hasMany(Comment, { foreignKey: 'articleId', as: 'comments' });
Comment.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

module.exports = { Article, Comment };