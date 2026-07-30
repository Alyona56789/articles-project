import { createRouter, createWebHistory } from 'vue-router'
import ArticleList from '../components/ArticleList.vue'
import ArticleForm from '../components/ArticleForm.vue'
import ArticleView from '../components/ArticleView.vue'
import Analytics from '../components/Analytics.vue'

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/article/new',
    name: 'ArticleNew',
    component: ArticleForm
  },
  {
    path: '/article/:id/edit',
    name: 'ArticleEdit',
    component: ArticleForm
  },
  {
    path: '/article/:id',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router