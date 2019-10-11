<template>
  <v-card class="mt-5" to="/books">
    <v-list-item three-line>
      <v-flex xs9>
        <v-list-item-content class="align-self-start">
          <v-list-item-subtitle class="subtitle-2">Livros</v-list-item-subtitle>
          <v-list-item-title class="title">{{ totalBooks }}</v-list-item-title>
        </v-list-item-content>
      </v-flex>

      <v-flex xs3>
        <v-layout column align-center>
          <v-icon large>library_books</v-icon>
        </v-layout>
      </v-flex>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TotalBooks',
  computed: {
    ...mapGetters(['totalBooks'])
  }
}
</script>

<style>

</style>