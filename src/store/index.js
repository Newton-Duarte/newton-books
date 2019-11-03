import Vue from 'vue'
import Vuex from 'vuex'
import shared from './modules/shared'
import users from './modules/users'
import books from './modules/books'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    users,
    books
  }
})
