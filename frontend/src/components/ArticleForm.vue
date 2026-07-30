<template>
  <div>
    <h1 class="text-h4 mb-4">{{ isEditing ? 'Редактирование статьи' : 'Создание новой статьи' }}</h1>
    
    <v-card class="pa-4">
      <v-form @submit.prevent="saveArticle">
        <v-text-field
          v-model="form.title"
          label="Название статьи"
          placeholder="Введите название"
          required
          :rules="[v => !!v || 'Название обязательно']"
          class="mb-4"
        ></v-text-field>

        <v-textarea
          v-model="form.text"
          label="Текст статьи"
          placeholder="Введите текст статьи"
          required
          :rules="[v => !!v || 'Текст обязателен']"
          rows="10"
          auto-grow
        ></v-textarea>

        <div class="mt-4">
          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            class="mr-2"
          >
            {{ isEditing ? 'Сохранить изменения' : 'Создать статью' }}
          </v-btn>
          
          <v-btn
            color="grey"
            @click="cancel"
          >
            Отмена
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleForm',
  data() {
    return {
      form: {
        title: '',
        text: ''
      },
      loading: false
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id && this.$route.params.id !== 'new';
    }
  },
  created() {
    if (this.isEditing) {
      this.loadArticle();
    }
  },
  methods: {
    async loadArticle() {
      this.loading = true;
      const articleId = this.$route.params.id;
      await this.$store.dispatch('fetchArticle', articleId);
      
      const article = this.$store.state.currentArticle;
      if (article) {
        this.form.title = article.title;
        this.form.text = article.text;
      }
      this.loading = false;
    },
    async saveArticle() {
      this.loading = true;
      
      const payload = {
        ...this.form,
        id: this.isEditing ? this.$route.params.id : undefined
      };
      
      await this.$store.dispatch('saveArticle', payload);
      
      this.loading = false;
      this.$router.push('/');
    },
    cancel() {
      this.$router.push('/');
    }
  }
};
</script>