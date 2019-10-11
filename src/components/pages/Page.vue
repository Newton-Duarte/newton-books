<template>
  <v-card :loading="loading" class="mb-3">
    <v-list-item three-line>
      <v-flex xs11>
        <v-list-item-content class="align-self-start">
          <v-list-item-title class="subtitle-2">
            {{ page.book.title }}
          </v-list-item-title>

          <v-list-item-subtitle class="py-1 text--primary">
            <v-icon small>access_time</v-icon>
            {{ dateToText(page.date) }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon small>library_books</v-icon>
            <span class="px-1 font-italic">Páginas:</span>
            <strong>{{ page.readPages }}</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-flex>

      <v-flex xs1>
        <v-layout column align-center>
          <v-btn @click.stop="removePage(page)" text small fab icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Page',
  props: ['page'],
  data: () => ({
    loading: false
  }),
  methods: {
    ...mapActions(['deletePage', 'fetchBookById', 'updateBook']),
    async removePage(page) {
      if (confirm('Tem certeza que deseja excluir o movimento?')) {
        this.loading = true;
        await this.deletePage({ page, uid: this.$store.getters.user.uid });
        
        const book = await this.fetchBookById({ uid: this.$store.getters.user.uid, id: page.book.id });
        if (book.readPages - page.readPages < 0) {
          book.readPages = 0;
        } else {
          book.readPages -= page.readPages;
        }
        await this.updateBook({ book, uid: this.$store.getters.user.uid });
        this.loading = false;
      }
    },
    dateToText(date) {
      const dd = new Date(date);
      const d = dd.toISOString().substr(0,10).split('-').reverse().join('/');
      // const time = dd.toLocaleString().substr(11,4);
      const time = `${dd.getHours()}:${dd.getMinutes()}`;

      return `${d} ${time}`;
    }
  }
}
</script>

<style>

</style>