<template>
  <div>
    <h1 class="text-h4 mb-4">Список статей</h1>
    
    <v-btn color="primary" class="mb-4" to="/article/new">
      <v-icon left>mdi-plus</v-icon>
      Создать статью
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="articles"
      :loading="loading"
      locale="ru"
      :items-per-page-text="'Строк на странице'"
      :footer-props="{
        itemsPerPageText: 'Строк на странице:',
        pageText: '{0}-{1} из {2}'
      }"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon size="x-small" color="primary" class="mr-1" @click="viewArticle(item.id)">
          <v-icon size="small">mdi-eye</v-icon>
        </v-btn>
        <v-btn icon size="x-small" color="warning" class="mr-1" @click="editArticle(item.id)">
          <v-icon size="small">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="x-small" color="error" @click="deleteArticle(item.id)">
          <v-icon size="small">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ArticleList',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', width: '80px' },
        { text: 'Название', value: 'title' },
        { text: 'Дата создания', value: 'createdAt' },
        { text: 'Действия', value: 'actions', sortable: false, width: '150px' }
      ],
      loading: false
    };
  },
  computed: {
    ...mapState(['articles'])
  },
  created() {
    this.loadArticles();
  },
  methods: {
    async loadArticles() {
      this.loading = true;
      await this.$store.dispatch('fetchArticles');
      this.loading = false;
    },
    viewArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    editArticle(id) {
      this.$router.push(`/article/${id}/edit`);
    },
    async deleteArticle(id) {
      if (confirm('Вы уверены, что хотите удалить эту статью?')) {
        await this.$store.dispatch('deleteArticle', id);
      }
    }
  }
};
</script>