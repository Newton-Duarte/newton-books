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

    <v-row v-if="googleBooks.length">
      <v-col cols="12" class="pb-0">
        <v-list dense>
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
              v-for="(item, i) in formattedGoogleBooks"
              :key="i"
              @click.stop="selectGoogleBook(item)"
            >
              <v-list-item-icon>
                <v-icon>menu_book</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <span class="caption font-italic">{{ item.author }}</span>
                <span class="caption font-italic">{{ item.publisher }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col class="pt-0">
        <v-btn small fab icon @click.stop="previousPage">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-col>
      <v-col align-self="center" class="pt-0 text-center">
        <span class="caption">
          {{ page }}/{{ Math.floor(totalItems/10) }}
        </span>
      </v-col>
      <v-col class="pt-0 text-right">
        <v-btn small fab icon @click.stop="nextPage">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

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
    lastSearchTerm: '',
    searchIndex: 0,
    totalItems: 0,
    page: 1,
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
      this.lastSearchTerm = '',
      this.googleBooks = [];
      this.book = new Book();
      this.drawer = false;
      this.loading = false;
    },
    searchGoogleBooks() {
      if (this.searchTerm && this.searchTerm === this.lastSearchTerm) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&startIndex=${this.searchIndex}`)
          .then(res => res.json())
          .then(data => this.renderGoogleBooks(data.items, data.totalItems))
          .catch(error => console.error(error));
      } else {
        this.page = 1;
        this.searchIndex = 0;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&startIndex=${this.searchIndex}`)
          .then(res => res.json())
          .then(data => this.renderGoogleBooks(data.items, data.totalItems))
          .catch(error => console.error(error));
      }
    },
    nextPage() {
      if (this.searchIndex >= 0 && this.page < Math.round(this.totalItems/10)) {
        this.searchIndex += 10;
        this.page += 1;
        this.searchGoogleBooks();
      }
    },
    previousPage() {
      if (this.searchIndex > 0) {
        this.searchIndex -= 10;
        this.page -= 1;
        this.searchGoogleBooks();
      }
    },
    renderGoogleBooks(books, totalItems) {
      this.googleBooks = [];
      if (books !== undefined && books.length) {
        if (this.searchTerm === this.lastSearchTerm) {
          books.forEach(book => this.googleBooks.push(book.volumeInfo));
        } else {
          books.forEach(book => this.googleBooks.push(book.volumeInfo));
          this.totalItems = totalItems;
        }
      } else {
        console.log('Nenhum registro encontrado.');
      }
      // save the last term entered
      this.lastSearchTerm = this.searchTerm;
    },
    selectGoogleBook(item) {
      this.book.title = item.title;
      this.book.subtitle = item.subtitle || '';
      this.book.author = item.author;
      this.book.pages = item.pages;
    },
    clearGoogleBooks() {
      this.googleBooks = [];
      this.searchIndex = 0;
      this.page = 1;
      this.totalItems = 0;
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
  computed: {
    formattedGoogleBooks() {
      const books = [];
      this.googleBooks.forEach(book => {
        const formattedBook = new Book();
        formattedBook.title = book.title;
        formattedBook.subtitle = book.subtitle || '';
        formattedBook.author = book.authors ? book.authors[0] : '';
        formattedBook.pages = book.pageCount || 0;
        formattedBook.publisher = book.publisher || '';
        books.push(formattedBook);
      })
      return books;
    }
  }
}
</script>

<style>

</style>