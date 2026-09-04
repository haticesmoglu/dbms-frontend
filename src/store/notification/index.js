export default {
  namespaced: true,
  state: () => ({
    notifications: [],
  }),
  getters: {
    allNotifications: (state) => state.notifications,
  },
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push({
        id: Date.now(),
        ...notification,
      });
    },
    REMOVE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
  },
  actions: {
    showNotification(
      { commit },
      { message, type = 'success', timeout = 3000 }
    ) {
      const id = Date.now();
      commit('ADD_NOTIFICATION', { id, message, type });
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', id);
      }, timeout);
    },
  },
};
