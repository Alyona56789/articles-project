const express = require('express');
const router = express.Router();
const { Comment, Article } = require('../models');
const { Op } = require('sequelize'); 

router.get('/comments/', async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;
    

    const whereClause = {};
    if (dateFrom && dateTo) {
      whereClause.createdAt = {
        [Op.between]: [new Date(Number(dateFrom)), new Date(Number(dateTo))]
      };
    }

    const comments = await Comment.findAll({
      where: whereClause,
      include: [{ 
        model: Article, 
        as: 'article', 
        attributes: ['title'] 
      }],
      order: [['createdAt', 'DESC']] 
    });

    const groupedComments = comments.reduce((acc, comment) => {
      const articleTitle = comment.article ? comment.article.title : 'Без статьи';
      
      if (!acc[articleTitle]) {
        acc[articleTitle] = [];
      }
      
      acc[articleTitle].push(comment);
      
      return acc;
    }, {});

    res.json(groupedComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;