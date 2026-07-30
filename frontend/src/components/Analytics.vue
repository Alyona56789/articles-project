<template>
  <div>
    <h1 class="text-h4 mb-4">Аналитика комментариев</h1>
    
    <v-card class="pa-4 mb-6">
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="dateFrom"
            label="Дата начала"
            type="datetime-local"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="dateTo"
            label="Дата окончания"
            type="datetime-local"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="d-flex align-center">
          <v-btn
            color="primary"
            @click="loadAnalytics"
            :loading="loading"
            block
          >
            Показать
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Результаты аналитики -->
    <div v-if="Object.keys(analytics).length > 0">
      <div v-for="(comments, articleTitle) in analytics" :key="articleTitle" class="mb-6">
        <v-card class="pa-4">
          <h2 class="text-h5 mb-4">{{ articleTitle }}</h2>
          <v-list>
            <v-list-item v-for="comment in comments" :key="comment.id">
              <v-list-item-content>
                <v-list-item-title>{{ comment.text }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ new Date(comment.createdAt).toLocaleString() }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider class="mt-2"></v-divider>
          <p class="text-caption text-grey mt-2">
            Всего комментариев: {{ comments.length }}
          </p>
        </v-card>
      </div>
    </div>

    <!-- Если нет данных -->
    <v-card v-else-if="!loading" class="pa-10 text-center">
      <v-icon size="64" color="grey">mdi-chart-bar</v-icon>
      <p class="text-h6 text-grey mt-4">
        Выберите период и нажмите "Показать" для просмотра аналитики
      </p>
    </v-card>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p class="mt-4">Загрузка данных...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Analytics',
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      loading: false
    };
  },
  computed: {
    ...mapState(['analytics'])
  },
  methods: {
    async loadAnalytics() {
      if (!this.dateFrom || !this.dateTo) {
        alert('Пожалуйста, выберите обе даты');
        return;
      }

      this.loading = true;
      
      const params = {
        dateFrom: new Date(this.dateFrom).getTime(),
        dateTo: new Date(this.dateTo).getTime()
      };

      await this.$store.dispatch('fetchAnalytics', params);
      this.loading = false;
    }
  }
};
</script>