<template>
  <v-container>
    <v-layout>
      <v-subheader>Minhas Leituras ({{ filteredPages.length }})</v-subheader>
      <v-spacer></v-spacer>
      <FilterPages @filterPages="filterPages" />
    </v-layout>
    <Page 
      v-for="page in filteredPages" 
      :key="page.id" 
      :page="page"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Page from '@/components/pages/Page';
import FilterPages from '@/components/pages/FilterPages';

export default {
  name: 'Pages',
  data: () => ({
    filter: 'allPages'
  }),
  components: {
    Page,
    FilterPages
  },
  computed: {
    ...mapGetters(['allPages', 'user']),
    filteredPages() {
      if (this.filter == 'allPages') return this.allPages;
      if (this.filter == 'today') return this.allPages.filter(p => {
        const today = new Date().toISOString().substr(0,10);
        return new Date(p.date).toISOString().substr(0,10) == today;
      });
      if (this.filter == 'week') return this.allPages.filter(p => p.reading);
      if (this.filter == 'month') return this.allPages.filter(p => p.favorite);
      if (this.filter == 'year') return this.allPages.filter(p => p.favorite);
    }
  },
  methods: {
    ...mapActions(['fetchPages']),
    filterPages(filter) {
      this.filter = filter;
    }
  },
  async created() {
    await this.fetchPages(this.user.uid);
  }
}
</script>

<style>

</style>