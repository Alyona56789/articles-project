require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { Article, Comment } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

const articleRoutes = require('./routes/articleRoutes');
app.use('/article', articleRoutes);
app.use('/articles', articleRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Сервер работает!' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('База данных подключена');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}).catch(err => {
  console.error('Ошибка подключения к БД:', err);
});