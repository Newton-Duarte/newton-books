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
      if (this.filter == 'today') {
        const sotd = this.moment().startOf('day'); // Start of the day
        const eotd = this.moment().endOf('day');  // End of the day
        return this.allPages.filter(p => this.moment(p.date).isBetween(sotd, eotd));
      }
      if (this.filter == 'week') {
        let fdow = this.moment().startOf('week'); // First day of the week
        let ldow = this.moment().endOf('week');  // Last day of the week
        return this.allPages.filter(p => this.moment(p.date).isBetween(fdow, ldow));
      }
      if (this.filter == 'month') {
        let fdom = this.moment().startOf('month'); // First day of the month
        let ldom = this.moment().endOf('month');  // Last day of the month
        return this.allPages.filter(p => this.moment(p.date).isBetween(fdom, ldom));
      }
      if (this.filter == 'year') {
        let fdoy = this.moment().startOf('year'); // First day of the year
        let ldoy = this.moment().endOf('year');  // Last day of the year
        return this.allPages.filter(p => this.moment(p.date).isBetween(fdoy, ldoy));
      }
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