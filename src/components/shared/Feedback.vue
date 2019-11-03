<template>
  <v-alert
    v-if="feedback"
    outlined
    type="warning"
    prominent
    border="left"
    class="mt-5"
  >
    {{ feedback }}
  </v-alert>
</template>

<script>
export default {
  name: 'Feedback',
  computed: {
    feedback() {
      return this.$store.getters.error;
    }
  }
}
</script>

<style>

</style>