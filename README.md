# Articles Project

Веб-приложение для управления статьями и комментариями.

## Стек
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: Vue.js 3, Vuex, Vue Router, Axios, Vuetify

## Установка

### Backend

cd backend
npm install
node server.js

### Frontend

cd frontend
npm install
npm run dev

## API

- Статьи: GET/POST/PATCH/DELETE /article/
- Комментарии: GET/POST/PATCH/DELETE /article/:id/comment/
- Аналитика: GET /analytic/comments/?dateFrom=&dateTo=
