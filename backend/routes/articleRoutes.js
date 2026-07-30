const express = require('express');
const router = express.Router();
const { Article } = require('../models');

router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    await article.update(req.body);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id/', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    await article.destroy();
    res.json({ message: 'Статья удалена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;