const state = {
  loading: false,
  error: null
};

const getters = {
  loading: state => state.loading,
  error: state => state.error
};

const actions = {
  clearError({ commit }) {
    commit('clearError');
  },
  setError({ commit }, payload) {
    commit('setError', payload);
  }
};

const mutations = {
  setLoading: (state, payload) => state.loading = payload,
  setError: (state, payload) => state.error = payload,
  clearError: state => state.error = null,
};

export default {
  state,
  getters,
  actions,
  mutations
}