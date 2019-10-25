<template>
  <v-container>
    <v-layout>
      <v-flex xs5>
        <Uploader :imageUrl="profileImage" />
      </v-flex>
      <v-flex xs7>
        <h3>{{ user.displayName }}</h3>
        <v-layout mt-3>
          <v-flex xs4>
            <p class="title ma-0">{{ totalBooks }}</p>
            <p class="ma-0 caption">Livros</p>
          </v-flex>
          <v-flex xs4>
            <p class="title ma-0">{{ totalReadingBooks }}</p>
            <p class="ma-0 caption">Lendo</p>
          </v-flex>
          <v-flex xs4>
            <p class="title ma-0">{{ totalReadBooks }}</p>
            <p class="ma-0 caption">Lidos</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <TotalBooks />
    <TotalPages />
    <FavoriteBooks />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TotalBooks from '@/components/home/TotalBooks';
import TotalPages from '@/components/home/TotalPages';
import FavoriteBooks from '@/components/home/FavoriteBooks';
import Uploader from '@/components/home/Uploader';

export default {
  name: 'Home',
  components: {
    TotalBooks,
    TotalPages,
    FavoriteBooks,
    Uploader
  },
  methods: {
    ...mapActions(['fetchBooks', 'fetchPages', 'fetchProfileImage'])
  },
  computed: {
    ...mapGetters(['user', 'totalBooks', 'totalReadingBooks', 'totalReadBooks', 'allPages', 'profileImage'])
  },
  async created() {
    await this.fetchBooks(this.user.uid);
    await this.fetchPages(this.user.uid);
    await this.fetchProfileImage(this.user.uid);
  }
};
</script>
