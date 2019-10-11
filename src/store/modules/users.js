import { auth, db } from '../../firebase/init';

const collection = 'users';

const state = {
  users: [],
  user: ''
};

const getters = {
  allUsers: state => state.users,
  user: state => state.user
};

const actions = {
  async fetchUsers({ commit }) {
    // await db.collection(collection)....

    // commit('setUsers', data);
  },

  async loginUser({ commit }, user) {
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      commit('login', auth.currentUser.displayName);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  async logoutUser({ commit }) {
    try {
      await auth.signOut();
      commit('logout')
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  fetchCurrentUser({ commit }) {
    try {
      const user = auth.currentUser;
      user ? commit('login', user) : '';
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  async createUser({ commit }, user) {
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      delete user.password;
      let uid = auth.currentUser.uid;
      await db.collection(collection).doc(uid).set({...user});
      await auth.currentUser.updateProfile({
        displayName: user.name
      });
      commit('login', user);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  }
};

const mutations = {
  setUsers: (state, users) => state.users = users,
  newUser: (state, user) => state.users.push(user),
  login: (state, user) => state.user = user,
  logout: state => state.user = null
};

export default {
  state,
  getters,
  actions,
  mutations
}