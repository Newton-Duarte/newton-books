<template>
  <v-card class="mt-3" to="/pages">
    <v-list-item three-line>
      <v-flex xs9>
        <v-list-item-content class="align-self-start">
          <v-list-item-subtitle class="subtitle-2">Páginas Lidas</v-list-item-subtitle>
          <v-list-item-title class="title">{{ totalPages }}</v-list-item-title>
        </v-list-item-content>
      </v-flex>

      <v-flex xs3>
        <v-layout column align-center>
          <v-icon large>menu_book</v-icon>
        </v-layout>
      </v-flex>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TotalPages',
  computed: {
    ...mapGetters(['totalBooks', 'totalPages'])
  }
}
</script>

<style>

</style>