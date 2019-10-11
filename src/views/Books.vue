<template>
  <v-container>
    <v-layout>
      <v-subheader>Meus Livros ({{ filteredBooks.length }})</v-subheader>
      <v-spacer></v-spacer>
      <FilterBooks @filterBooks="filterBooks" />
    </v-layout>
    <AddBook />
    <Book 
      v-for="book in filteredBooks" 
      :key="book.id" 
      :book="book"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddBook from '@/components/books/AddBook'
import Book from '@/components/books/Book';
import FilterBooks from '@/components/books/FilterBooks';

export default {
  name: 'Books',
  data: () => ({
    drawerEdit: false,
    filter: 'allBooks'
  }),
  components: {
    Book,
    AddBook,
    FilterBooks
  },
  computed: {
    ...mapGetters(['allBooks', 'user']),
    filteredBooks() {
      if (this.filter == 'allBooks') return this.allBooks;
      if (this.filter == 'readBooks') return this.allBooks.filter(b => b.read);
      if (this.filter == 'readingBooks') return this.allBooks.filter(b => b.reading);
      if (this.filter == 'favoriteBooks') return this.allBooks.filter(b => b.favorite);
    }
  },
  methods: {
    ...mapActions(['fetchBooks']),
    filterBooks(filter) {
      this.filter = filter;
    }
  },
  async created() {
    await this.fetchBooks(this.user.uid);
  }
}
</script>

<style>

</style>