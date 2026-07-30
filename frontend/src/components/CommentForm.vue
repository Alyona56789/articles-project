<template>
  <div class="mb-6">
    <v-card v-if="showForm" class="pa-4" variant="outlined">
      <h3 class="text-h6 mb-2">{{ isEditing ? 'Редактировать комментарий' : 'Новый комментарий' }}</h3>
      
      <v-textarea
        v-model="text"
        label="Текст комментария"
        rows="3"
        auto-grow
        required
      ></v-textarea>

      <div>
        <v-btn color="primary" @click="save" :loading="loading" class="mr-2">
          {{ isEditing ? 'Сохранить' : 'Отправить' }}
        </v-btn>
        <v-btn color="grey" @click="cancel" v-if="isEditing">Отмена</v-btn>
      </div>
    </v-card>

    <!-- Если форма скрыта, показываем кнопку для её открытия -->
    <v-btn v-else color="primary" @click="showForm = true">
      Оставить комментарий
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    editComment: { type: Object, default: null }
  },
  data() {
    return {
      text: '',
      loading: false,
      showForm: true 
    };
  },
  computed: {
    isEditing() {
      return !!this.editComment;
    }
  },
  watch: {
    editComment: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.text = newVal.text;
          this.showForm = true;
        } else {
          this.text = '';
        }
      }
    }
  },
  methods: {
    async save() {
      if (!this.text.trim()) return;
      
      this.loading = true;
      const payload = { text: this.text };
      
      if (this.editComment) {
        payload.id = this.editComment.id;
      }
      
      await this.$store.dispatch('saveComment', payload);
      
      this.text = '';
      this.$emit('saved'); 
      
      if (!this.editComment) {
        this.showForm = false;
      }
      this.loading = false;
    },
    cancel() {
      this.$emit('cancel'); 
    }
  }
};
</script>