const express = require('express');
const router = express.Router({ mergeParams: true });
const { Comment } = require('../models');

router.post('/comment/', async (req, res) => {
  try {
    const { articleId } = req.params;
    const comment = await Comment.create({ ...req.body, articleId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/comments/', async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({ where: { articleId } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/comment/:commentId/', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/comment/:commentId/', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/comment/:commentId/', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });
    await comment.destroy();
    res.json({ message: 'Комментарий удален' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;