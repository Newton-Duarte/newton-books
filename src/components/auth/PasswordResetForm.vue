<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h5 class="title">Esqueceu a senha?</h5>
      </v-col>
    </v-row>
    <v-form 
      v-if="!emailSent"
      ref="form" 
      v-model="valid"
      lazy-validation
      @submit.prevent="sendLinkResetPassword"
    >
      <v-text-field
        type="email"
        v-model="email"
        :rules="emailRules"
        label="Informe seu E-mail"
        required
      ></v-text-field>
      <v-btn 
        @click.stop="sendLinkResetPassword"
        :disabled="!valid" 
        :loading="loading"
        color="primary" 
        block class="mt-3"
      >Recuperar Senha</v-btn>
    </v-form>
    <Feedback />
    <div class="mt-5">
      <span class="link" @click="returnToLoginRoute">Retornar para página de login</span>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Feedback from '@/components/shared/Feedback';

export default {
  name: 'PasswordResetForm',
  components: {
    Feedback
  },
  data: () => ({
    valid: true,
    email: '',
    emailSent: false,
    feedback: '',
    emailRules: [
      v => !!v || 'Informe o E-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
    ],
  }),
  methods: {
    ...mapActions(['resetUserPassword', 'clearError']),
    async sendLinkResetPassword() {
      if (this.$refs.form.validate()) {
        await this.resetUserPassword(this.email);        
        this.email = '';
        this.emailSent = true;
      }
    },
    returnToLoginRoute() {
      this.clearError();
      this.$router.replace('/login');
    }
  },
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style scoped>
.link {
  color: #1976d2;
  border-bottom: 1px solid #1976d2;
}
</style>