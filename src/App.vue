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
import Appbar from '@/components/appbar/Appbar'
import Footer from '@/components/layout/footer/Footer'

export default {
  name: 'App',
  components: {
    Appbar,
    Footer
  }
};
</script>
