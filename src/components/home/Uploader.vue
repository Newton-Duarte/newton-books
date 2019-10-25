<template>
  <v-avatar color="orange" size="100">
    <img
      v-show="imageUrl" 
      :src="imageUrl"
      @click="removePhoto"
    >
    <v-icon 
      v-show="!imageUrl"
      dark 
      @click="onPickFile"
    >photo_camera</v-icon>
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
import { mapActions } from 'vuex';

export default {
  name: 'Uploader',
  props: ['imageUrl'],
  data: () => ({
    // imageUrl: '',
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
      console.log(files[0].name.split('.').pop());
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
  }
}
</script>

<style>

</style>