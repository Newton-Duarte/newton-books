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
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">Novo Livro</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <BookForm 
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

export default {
  name: 'AddBook',
  components: {
    BookForm,
  },
  data: () => ({
    drawer: false,
    loading: false,
  }),
  methods: {
    ...mapActions(['createBook']),
    async addBook(payload) {
      this.loading = true;
      await this.createBook({ book: payload, uid: this.$store.getters.user.id });
      this.drawer = false;
      this.loading = false;
    },
  },
}
</script>

<style>

</style>