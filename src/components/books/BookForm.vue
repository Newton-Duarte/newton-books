<template>
  <v-form 
    ref="form" 
    v-model="valid"
    lazy-validation
    class="ma-4"
  >

  <v-text-field
    v-model="item.title"
    :rules="titleRules"
    label="Título"
    placeholder="exemplo: Turma da Mônica"
    required
  ></v-text-field>

  <v-text-field
    v-model="item.subtitle"
    label="Subtítulo"
    placeholder="exemplo: A busca da verdade"
    required
  ></v-text-field>

  <v-text-field
    v-model="item.author"
    :rules="authorRules"
    label="Autor"
    placeholder="exemplo: Isaac Newton"
    required
  ></v-text-field>

  <v-text-field
    type="tel"
    v-model="item.pages"
    :rules="pagesRules"
    label="Páginas"
    placeholder="exemplo: 300"
    required
  ></v-text-field>

  <v-text-field
    type="tel"
    v-model="item.readPages"
    label="Páginas Lidas"
    placeholder="exemplo: 30"
    @focus="readPageFocus = true"
  ></v-text-field>

  <v-layout row justify-center mb-5 v-if="readPageFocus">
    <v-flex class="text-center">
      <v-btn text small @click="addReadPages(10)">+10</v-btn>
    </v-flex>
    <v-flex class="text-center">
      <v-btn text small @click="addReadPages(20)">+20</v-btn>
    </v-flex>
    <v-flex class="text-center">
      <v-btn text small @click="addReadPages(30)">+30</v-btn>
    </v-flex>
  </v-layout>

  <v-btn 
    :disabled="!valid"
    block 
    large
    color="primary"
    class="mb-3"
    :loading="loading"
    @click="saveBook"
  >
    Confirmar
  </v-btn>

  <v-btn 
    block 
    text
    @click="$emit('close')"
  >
    Cancelar
  </v-btn>

  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Book from '@/models/Book';

export default {
  name: 'BookForm',
  props: {
    item: {
      type: Object,
      default: () => new Book()
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    readPageFocus: false,
    titleRules: [
      v => !!v || 'O título do livro é obrigatório.',
    ],
    authorRules: [
      v => !!v || 'O autor do livro é obrigatório.',
    ],
    pagesRules: [
      v => !!v || 'A quantidade de páginas do livro é obrigatório.',
    ],
  }),
  methods: {
    saveBook() {
      if (this.$refs.form.validate()) {
        this.$emit('saveBook', this.item);
      }
    },
    addReadPages(val) {
      if ((this.item.readPages + val) > this.item.pages) {
        this.item.readPages = this.item.pages;
      } else {
        this.item.readPages += val;
      }
    }
  }
}
</script>

<style>

</style>