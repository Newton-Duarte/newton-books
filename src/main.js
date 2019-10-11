import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { auth } from '@/firebase/init'
import moment from 'moment';

let app = null;

Vue.config.productionTip = false
moment.locale('pt-br');
Vue.prototype.moment = moment;

// wait for firebase auth to init before creating the app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})