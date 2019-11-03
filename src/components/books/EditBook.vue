<template>
  <v-navigation-drawer
    :value="drawer"
    app
    temporary
    width="100%"
    touchless
    height="100%"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">Editar Livro</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <BookForm 
      :item="bookToEdit"
      @saveBook="editBook"
      @close="$emit('close')" 
      :loading="loading"
    />

  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BookForm from '@/components/books/BookForm'

export default {
  name: 'EditBook',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BookForm,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions(['updateBook']),
    async editBook() {
      this.loading = true;
      await this.updateBook({ book: this.bookToEdit, uid: this.$store.getters.user.id });
      this.loading = false;
      this.$emit('close');
    },
  },
  computed: {
    ...mapGetters(['bookToEdit'])
  }
}
</script>

<style>

</style>