<template>
  <v-avatar color="orange" size="100">
    <img
      v-show="user.imageUrl" 
      :src="user.imageUrl"
      @click="removePhoto"
    >
    <v-icon 
      v-show="!user.imageUrl && !loading"
      dark 
      @click="onPickFile"
    >photo_camera</v-icon>
    <v-btn
      v-if="loading"
      :loading="loading"
      color="orange"
      dark
      depressed
      light
      small
      fab
    ></v-btn>
    <input
      type="file" 
      ref="fileInput" 
      accept="image/*" 
      label="Imagem" 
      style="display: none;"
      @change="onFilePicked"
    />
  </v-avatar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Uploader',
  data: () => ({
    imageUrl: '',
    image: null
  }),
  methods: {
    ...mapActions(['uploadFile', 'deleteImageProfile']),
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Arquivo inválido. Selecione um arquivo do tipo imagem.');
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageUrl = fileReader.result;
      };
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.uploadFile(this.image);
    },
    removePhoto() {
      if (confirm('Deseja excluir a sua imagem de perfil?')) {
        this.deleteImageProfile();
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'loading'])
  }
}
</script>

<style>

</style>