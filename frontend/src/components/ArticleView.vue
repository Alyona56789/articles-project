<template>
  <div v-if="article">
    <v-btn text @click="$router.push('/')" class="mb-4">
      ← Назад к списку статей
    </v-btn>
    
    <!-- Карточка самой статьи -->
    <v-card class="pa-6 mb-6">
      <div class="d-flex justify-space-between align-start mb-4">
        <h1 class="text-h4">{{ article.title }}</h1>
        <div>
          <v-btn icon color="warning" class="mr-2" @click="$router.push(`/article/${article.id}/edit`)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteArticle">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
      
      <p class="text-body-1" style="white-space: pre-wrap;">{{ article.text }}</p>
      
      <v-divider class="my-4"></v-divider>
      <p class="text-caption text-grey">
        Создано: {{ new Date(article.createdAt).toLocaleString() }}
      </p>
    </v-card>

    <v-divider class="mb-6"></v-divider>
    
    <CommentForm 
      :editComment="commentToEdit" 
      @saved="onCommentSaved" 
      @cancel="commentToEdit = null" 
    />
    
    <CommentList @edit="editComment" />
  </div>
  <div v-else class="text-center pa-10">
    <v-progress-circular indeterminate></v-progress-circular>
    <p class="mt-4">Загрузка статьи...</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentList from './CommentList.vue';
import CommentForm from './CommentForm.vue';

export default {
  name: 'ArticleView',
  components: { CommentList, CommentForm },
  computed: {
    ...mapState(['currentArticle']),
    article() { return this.currentArticle; }
  },
  data() {
    return {
      commentToEdit: null 
    };
  },
  created() {
    const id = this.$route.params.id;
    // Загружаем статью и её комментарии
    this.$store.dispatch('fetchArticle', id);
    this.$store.dispatch('fetchComments', id);
  },
  methods: {
    editComment(comment) {
      this.commentToEdit = comment; 
    },
    onCommentSaved() {
      this.commentToEdit = null; 
    },
    async deleteArticle() {
      if (confirm('Вы уверены, что хотите удалить эту статью и все комментарии к ней?')) {
        await this.$store.dispatch('deleteArticle', this.article.id);
        this.$router.push('/');
      }
    }
  }
};
</script>