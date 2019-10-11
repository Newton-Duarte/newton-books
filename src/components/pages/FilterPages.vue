<template>
  <div>
    <span class="caption font-italic">
      {{ activeFilter }}
    </span>
    <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text fab small icon v-on="on">
        <v-icon>filter_list</v-icon>
      </v-btn>
    </template>
    <v-list class="py-0">
      <v-list-item class="px-3" @click="filterPages('all')">
        <v-list-item-title>Todas</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterPages('today')">
        <v-list-item-title>Hoje</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterPages('week')">
        <v-list-item-title>Semana</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterPages('month')">
        <v-list-item-title>Mês</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterPages('year')">
        <v-list-item-title>Ano</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  </div>
</template>

<script>
export default {
  name: 'FilterPages',
  data: () => ({
    activeFilter: 'Todas'
  }),
  methods: {
    filterPages(filter) {
      switch(filter) {
        case 'all':
          this.activeFilter = 'Todas';
          this.$emit('filterPages', 'allPages');
          break;
        case 'today':
          this.activeFilter = 'Hoje';
          this.$emit('filterPages', 'today');
          break;
        case 'week':
          this.activeFilter = 'Semana';
          this.$emit('filterPages', 'week');
          break;
        case 'month':
          this.activeFilter = 'Mês';
          this.$emit('filterPages', 'month');
          break;
        case 'year':
          this.activeFilter = 'Ano';
          this.$emit('filterPages', 'year');
          break;
      }
    }
  }
}
</script>

<style>

</style>