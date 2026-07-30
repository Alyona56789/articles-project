<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>
        <router-link to="/" style="color: white; text-decoration: none;">
          Articles App
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Статьи</v-btn>
      <v-btn text to="/analytics">Аналитика</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
