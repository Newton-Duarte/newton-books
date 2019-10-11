import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import books from './modules/books'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    books
  }
})
