<template>
  <div>
    <v-card @click.stop="editBook(book)" class="mb-3" :color="bookRead(book.read)">
      <v-list-item three-line>
        <v-flex xs9>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="subtitle-2">
              {{ book.title }}
            </v-list-item-title>

            <v-list-item-subtitle class="text--primary">{{ book.author }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ book.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-flex>

        <v-flex xs3>
          <v-layout column align-center>
            <v-icon large :color="book.read ? 'primary' : ''">menu_book</v-icon>
            <span class="caption">{{ book.pages }} páginas</span>
            <span class="caption font-italic">{{ book.readPages }} lidas</span>
          </v-layout>
        </v-flex>
      </v-list-item>
      <v-card-actions class="pa-1">
        <v-layout>
          <v-flex xs12 class="text-right">
            <v-btn @click.stop="favoriteBook(book)" text small fab icon>
              <v-icon :color="iconColorFavoriteBook(book.favorite)">{{ iconFavoriteBook(book.favorite) }}</v-icon>
            </v-btn>
            <v-btn v-if="!book.read" @click.stop="readBook(book)" text small fab icon>
              <v-icon :color="iconColorReadingBook(book.reading)">menu_book</v-icon>
            </v-btn>
            <!-- <v-btn @click="checkBook(book)" small fab icon>
              <v-icon color="success">{{ iconReadBook(book.read) }}</v-icon>
            </v-btn> -->
            <!-- <v-btn @click="editBook(book)" small fab icon>
              <v-icon color="warning">edit</v-icon>
            </v-btn> -->
            <v-btn @click.stop="removeBook(book)" text small fab icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <EditBook 
      :drawer="drawerEdit" 
      @close="drawerEdit = false"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditBook from '@/components/books/EditBook'

export default {
  name: 'Book',
  props: ['book'],
  data: () => ({
    drawerEdit: false
  }),
  components: {
    EditBook
  },
  methods: {
    ...mapActions(['setBookToEdit', 'updateBook', 'deleteBook']),
    editBook(book) {
      this.setBookToEdit(book);
      this.drawerEdit = !this.drawerEdit;
    },
    bookRead(read) {
      if (read) return 'blue lighten-4';
    },
    readBook(book) {
      if (!book.reading) {
        if (confirm(`Deseja marcar o livro: ${book.title} como lendo?`)) {
          book.reading = true;
          this.updateBook({ book, uid: this.$store.getters.user.id });
        }
      } else {
        if (confirm(`Deseja desmarcar o livro: ${book.title} como lendo?`)) {
          book.reading = false;
          this.updateBook({ book, uid: this.$store.getters.user.id });
        }
      }
    },
    favoriteBook(book) {
      if (!book.favorite) {
        if (confirm(`Deseja marcar o livro: ${book.title} como favorito?`)) {
          book.favorite = true;
          this.updateBook({ book, uid: this.$store.getters.user.id });
        }
      } else {
        if (confirm(`Deseja desmarcar o livro: ${book.title} como favorito?`)) {
          book.favorite = false;
          this.updateBook({ book, uid: this.$store.getters.user.id });
        }
      }
    },
    removeBook(book) {
      if (confirm(`Deseja excluir o livro: ${book.title}?`)) {
        this.deleteBook({ book, uid: this.$store.getters.user.id });
      }
    },
    iconColorReadingBook(reading) {
      return reading ? 'info' : 'default';
    },
    iconReadBook(read) {
      if (read) return 'clear';
      if (!read) return 'check';
    },
    iconFavoriteBook(favorite) {
      if (favorite) return 'favorite';
      if (!favorite) return 'favorite_border';
    },
    iconColorFavoriteBook(favorite) {
      return favorite ? 'error' : 'default';
    }
  }
}
</script>

<style>

</style>