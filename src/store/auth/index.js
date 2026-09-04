export default {
  namespaced: true,
  state: () => ({
    user: {
      id: 1,
      name: 'Hatice Sarımustafaoğlu',
      role: 'Frontend Stajyeri',
      avatar: 'HS',
    },
    isAuthenticated: true,
    token: 'mock-jwt-token-xyz',
  }),
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {},
};
