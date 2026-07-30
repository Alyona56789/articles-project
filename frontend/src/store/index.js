import { createStore } from 'vuex';
import api from '../api';

export default createStore({
  state: {
    articles: [],
    currentArticle: null,
    comments: [],
    analytics: {}
  },
  mutations: {
    SET_ARTICLES(state, articles) { state.articles = articles; },
    SET_CURRENT_ARTICLE(state, article) { state.currentArticle = article; },
    SET_COMMENTS(state, comments) { state.comments = comments; },
    ADD_COMMENT(state, comment) { state.comments.push(comment); },
    UPDATE_COMMENT(state, updatedComment) {
      const index = state.comments.findIndex(c => c.id === updatedComment.id);
      if (index !== -1) state.comments.splice(index, 1, updatedComment);
    },
    DELETE_COMMENT(state, id) {
      state.comments = state.comments.filter(c => c.id !== id);
    },
    SET_ANALYTICS(state, data) { state.analytics = data; }
  },
  actions: {
    async fetchArticles({ commit }) {
      const { data } = await api.get('/articles/');
      commit('SET_ARTICLES', data);
    },
    async fetchArticle({ commit }, id) {
      const { data } = await api.get(`/article/${id}/`);
      commit('SET_CURRENT_ARTICLE', data);
    },
    async saveArticle({ dispatch }, payload) {
      if (payload.id) {
        await api.patch(`/article/${payload.id}/`, payload);
      } else {
        await api.post('/article/', payload);
      }
      dispatch('fetchArticles');
    },
    async deleteArticle({ dispatch }, id) {
      await api.delete(`/article/${id}/`);
      dispatch('fetchArticles');
    },
    async fetchComments({ commit }, articleId) {
      const { data } = await api.get(`/article/${articleId}/comments/`);
      commit('SET_COMMENTS', data);
    },
    async saveComment({ commit, state }, payload) {
      const articleId = state.currentArticle.id;
      if (payload.id) {
        const { data } = await api.patch(`/article/${articleId}/comment/${payload.id}/`, payload);
        commit('UPDATE_COMMENT', data);
      } else {
        const { data } = await api.post(`/article/${articleId}/comment/`, payload);
        commit('ADD_COMMENT', data);
      }
    },
    async deleteComment({ commit, state }, commentId) {
      const articleId = state.currentArticle.id;
      await api.delete(`/article/${articleId}/comment/${commentId}/`);
      commit('DELETE_COMMENT', commentId);
    },
    async fetchAnalytics({ commit }, dates) {
      const params = new URLSearchParams(dates).toString();
      const { data } = await api.get(`/analytic/comments/?${params}`);
      commit('SET_ANALYTICS', data);
    }
  }
});