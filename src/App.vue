<template>
  <v-app>
    <Appbar />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Appbar from '@/components/appbar/Appbar'
import Footer from '@/components/layout/footer/Footer'

export default {
  name: 'App',
  components: {
    Appbar,
    Footer
  },
  methods: {
    ...mapActions(['fetchCurrentUser'])
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    if (!this.user) this.fetchCurrentUser();
  }
};
</script>
