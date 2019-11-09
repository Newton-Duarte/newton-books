<template>
  <div>
      <h1>Login</h1>
      <router-link to="signup">ou crie uma conta</router-link>

      <v-form 
        ref="form"
        v-model="valid"
        lazy-validation
        class="mt-5"
        @submit.prevent="login"
      >
      <v-text-field
        type="email"
        v-model="email"
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
        @keyup.enter="login"
      ></v-text-field>

      <v-btn 
        @click="login" 
        :disabled="!valid" 
        :loading="loading"
        color="primary" 
        block
      >
        Entrar
      </v-btn>
    </v-form>
    <Feedback />
    <div class="mt-5">
      <router-link to="/password-reset">Esqueceu a senha?</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Feedback from '@/components/shared/Feedback';

export default {
  name: 'LoginForm',
  components: {
    Feedback
  },
  data: () => ({
    valid: true,
    email: '',
    password: '',
    feedback: '',
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
    ...mapActions(['loginUser']),
    login () {
      if (this.$refs.form.validate()) {
        this.loginUser({ email: this.email, password: this.password })
          .then(() => this.$router.replace('/home'))
          .catch(error => console.error(error));
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