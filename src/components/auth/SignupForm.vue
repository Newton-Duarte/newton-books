<template>
<div>
    <h1>Cadastro</h1>
    <router-link to="login">ou entre com sua conta</router-link>

    <v-form 
      ref="form"
      v-model="valid"
      lazy-validation
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
      @keyup.enter="register"
    ></v-text-field>

    <v-btn 
      @click="register" 
      :disabled="!valid" 
      :loading="loading"
      color="primary" 
      block
    >
      Confirmar
    </v-btn>
  </v-form>
  <Feedback />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Feedback from '@/components/shared/Feedback';
import User from '@/models/User';

export default {
  name: 'SignupForm',
  components: {
    Feedback
  },
  data: () => ({
    valid: true,
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
    register () {
      if (this.$refs.form.validate()) {
        this.user.password = this.password;
        this.createUser(this.user)
          .then(() => this.$router.replace('/home'));
      }
    },
  },
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style>

</style>