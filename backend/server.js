require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const articleListRoutes = require('./routes/articleRoutes');
app.use('/articles', articleListRoutes);

const articleSingleRoutes = require('./routes/articleRoutes');
app.use('/article', articleSingleRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/article/:articleId', commentRoutes);

const analyticRoutes = require('./routes/analyticRoutes');
app.use('/analytic', analyticRoutes);

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