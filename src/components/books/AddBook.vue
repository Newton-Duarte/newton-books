<template>
<div>
  <v-btn
    dark
    fab
    fixed
    right
    bottom
    color="primary"
    @click="drawer = !drawer"
  >
    <v-icon>add</v-icon>
  </v-btn>
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    width="100%"
  >
    <v-list-item>
      <v-list-item-content class="pa-0">
        <v-list-item-title class="font-weight-bold">Novo Livro</v-list-item-title>
      </v-list-item-content>
      <v-btn small fab icon @click="focusSearch">
        <v-icon>search</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider v-if="showSearch"></v-divider>

    <v-row class="mx-4 mb-3" no-gutters v-if="showSearch">
      <v-col>
        <v-text-field 
          id="google-search"
          type="search"
          v-model="searchTerm"
          placeholder="Pesquisar no Google Books (Título)"
          hint="Informe o título do livro ou parte dele e tecle Enter."
          persistent-hint
          clearable
          @keyup.enter.stop="searchGoogleBooks"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-list dense v-if="googleBooks.length">
      <v-row justify="space-between" no-gutters class="px-2">
        <v-col>
          <v-subheader>Google Books ({{ googleBooks.length }})</v-subheader>
        </v-col>
        <v-col class="text-right">
          <v-btn small fab icon @click.stop="clearGoogleBooks">
            <v-icon>close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in googleBooks"
          :key="i"
          @click.stop="selectGoogleBook(item)"
        >
          <v-list-item-icon>
            <v-icon>menu_book</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <BookForm 
      :item="book"
      @saveBook="addBook"
      @close="drawer = false" 
      :loading="loading"
    />

  </v-navigation-drawer>

</div>
</template>

<script>
import { mapActions } from 'vuex';
import BookForm from '@/components/books/BookForm'
import Book from '@/models/Book';

export default {
  name: 'AddBook',
  components: {
    BookForm,
  },
  data: () => ({
    drawer: false,
    loading: false,
    showSearch: false,
    searchTerm: '',
    googleBooks: [],
    item: 0,
    book: new Book()
  }),
  methods: {
    ...mapActions(['createBook']),
    async addBook(payload) {
      this.loading = true;
      await this.createBook({ book: payload, uid: this.$store.getters.user.id });
      this.showSearch = false;
      this.searchTerm = '';
      this.googleBooks = [];
      this.book = new Book();
      this.drawer = false;
      this.loading = false;
    },
    searchGoogleBooks() {
      if (this.searchTerm) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}`)
          .then(res => res.json())
          .then(data => this.renderGoogleBooks(data.items))
          .catch(error => console.error(error));
      }
    },
    renderGoogleBooks(books) {
      if (books !== undefined && books.length) {
        this.googleBooks = [];
        books.forEach(book => this.googleBooks.push(book.volumeInfo));
      } else {
        console.log('Nenhum registro encontrado.');
      }
    },
    selectGoogleBook(item) {
      const { title, subtitle, authors, pageCount } = item;
      this.book.title = title;
      this.book.subtitle = subtitle || '';
      this.book.author = authors[0];
      this.book.pages = pageCount;
    },
    clearGoogleBooks() {
      this.googleBooks = []
    },
    focusSearch() {
      if (!this.showSearch) {
        this.showSearch = true;
        this.$nextTick(() => document.getElementById('google-search').focus());
      } else {
        this.showSearch = false;
      }
    }
  },
}
</script>

<style>

</style>