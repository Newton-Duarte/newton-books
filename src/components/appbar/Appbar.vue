<template>
  <nav>
    <v-app-bar app dark color="primary">
      <v-toolbar-title @click="$router.push('/')" class="headline text-uppercase">
        <span>Newton</span>
        <span class="font-weight-light">Books</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="user" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-if="user"
      v-model="drawer"
      app
      touchless
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profileImage"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ user.displayName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="route in routes"
          :key="route.title"
          :to="route.route"
        >
          <v-list-item-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            Sair da Conta
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Appbar',
  data: () => ({
    drawer: false,
    routes: [
      { title: 'Dashboard', route: '/', icon: 'dashboard' },
      { title: 'Meus Livros', route: '/books', icon: 'menu_book' },
      { title: 'Minhas Leituras', route: '/pages', icon: 'library_books' },
    ]
  }),
  methods: {
    ...mapActions(['logoutUser']),
    async logout() {
      if (confirm('Tem certeza que deseja sair do sistema?')) {
        await this.logoutUser();
        this.$router.replace({ name: 'login' });
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'profileImage'])
  },
}
</script>

<style>

</style>