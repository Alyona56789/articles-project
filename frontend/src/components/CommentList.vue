<template>
  <div>
    <h3 class="text-h5 mb-4">Комментарии ({{ comments.length }})</h3>
    
    <v-card 
      v-for="comment in comments" 
      :key="comment.id" 
      class="pa-4 mb-3" 
      variant="outlined"
    >
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-body-1 mb-1" style="white-space: pre-wrap;">{{ comment.text }}</p>
          <span class="text-caption text-grey">
            {{ new Date(comment.createdAt).toLocaleString() }}
          </span>
        </div>
        
        <div class="d-flex">
          <v-btn icon size="x-small" color="warning" class="mr-1" @click="$emit('edit', comment)">
            <v-icon size="small">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="x-small" color="error" @click="deleteComment(comment.id)">
            <v-icon size="small">mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>

    <p v-if="!comments.length" class="text-grey text-center pa-4">
      Комментариев пока нет. Будьте первым!
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CommentList',
  computed: {
    ...mapState(['comments'])
  },
  methods: {
    async deleteComment(id) {
      if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
        await this.$store.dispatch('deleteComment', id);
      }
    }
  }
};
</script>