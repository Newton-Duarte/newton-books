<template>
  <div>
      <h1>Login</h1>
      <router-link to="signup">ou crie uma conta</router-link>

      <v-form 
        ref="form"
        v-model="valid"
        lazy-validation
        class="mt-5"
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
    <div class="mt-5">
      <router-link to="forgot-password">Esqueceu a senha?</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data: () => ({
    valid: true,
    loading: false,
    email: '',
    password: '',
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
    async login () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.loginUser({ email: this.email, password: this.password });
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