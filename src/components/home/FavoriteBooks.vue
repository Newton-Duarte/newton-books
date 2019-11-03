<template>
  <div v-if="favoriteBooks.length">
    <v-subheader>Livros Favoritos</v-subheader>
      <Book 
        v-for="book in favoriteBooks" 
        :key="book.id"
        :book="book"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Book from '@/components/books/Book'
export default {
  name: 'FavoriteBooks',
  components: {
    Book
  },
  computed: {
    ...mapGetters(['favoriteBooks'])
  }
}
</script>

<style>
</style>