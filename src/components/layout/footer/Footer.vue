<template>
  <v-footer>
    <div class="flex-grow-1">
      <span>NEWTON</span>
      <span class="font-weight-light">BOOKS</span>
      &copy; {{ new Date().getFullYear() }}
    </div>
    <div class="caption font-italic">Versão: {{ version }}</div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    version: '1.0.1'
  })
}
</script>

<style>

</style>