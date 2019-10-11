<template>
<div>
    <h1>Cadastro</h1>
    <router-link to="login">ou entre com sua conta</router-link>

    <v-form 
      ref="form"
      v-model="valid"
      validate-on-blur
      class="mt-5"
    >

    <v-text-field
      v-model="user.name"
      :rules="nameRules"
      label="Nome"
      outlined
      required
    ></v-text-field>
    
    <v-text-field
      type="email"
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      outlined
      required
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Senha"
      outlined
      required
    ></v-text-field>

    <v-btn 
      @click="register" 
      :disabled="!valid" 
      :loading="loading"
      color="primary" 
      block
    >Confirmar</v-btn>
  </v-form>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import User from '@/models/User';

export default {
  name: 'SignupForm',
  data: () => ({
    valid: true,
    loading: false,
    user: new User(),
    password: '',
    nameRules: [
      v => !!v || 'Informe o nome',
      v => (v && v.length >= 10) || 'O nome precisa ter no mínimo 10 caracteres.',
    ],
    emailRules: [
      v => !!v || 'Informe o E-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
    ],
    passwordRules: [
      v => !!v || 'Informe a Senha',
      v => (v && v.length >= 6) || 'A Senha precisa ter no mínimo 6 caracteres.',
    ],
  }),
  methods: {
    ...mapActions(['createUser']),
    async register () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.user.password = this.password;
        try {
          await this.createUser(this.user);
          this.$refs.form.reset();
          this.loading = false;
          this.$router.replace({ name: 'home' });
        } catch (error) {
          this.loading = false;
          console.log(error);
        }
      }
    },
  }
}
</script>

<style>

</style>