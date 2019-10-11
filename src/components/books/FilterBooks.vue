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
      <v-list-item class="px-3" @click="filterBooks('all')">
        <v-list-item-title>Todos</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterBooks('read')">
        <v-list-item-title>Lidos</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterBooks('reading')">
        <v-list-item-title>Lendo</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-3" @click="filterBooks('favorite')">
        <v-list-item-title>Favoritos</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  </div>
</template>

<script>
export default {
  name: 'FilterBooks',
  data: () => ({
    activeFilter: 'Todos'
  }),
  methods: {
    filterBooks(filter) {
      switch(filter) {
        case 'all':
          this.activeFilter = 'Todos';
          this.$emit('filterBooks', 'allBooks');
          break;
        case 'read':
          this.activeFilter = 'Lidos';
          this.$emit('filterBooks', 'readBooks');
          break;
        case 'reading':
          this.activeFilter = 'Lendo';
          this.$emit('filterBooks', 'readingBooks');
          break;
        case 'favorite':
          this.activeFilter = 'Favoritos';
          this.$emit('filterBooks', 'favoriteBooks');
          break;
      };
    }
  }
}
</script>

<style>

</style>