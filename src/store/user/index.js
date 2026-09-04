export default {
  namespaced: true,
  state: () => ({
    users: [
      { id: 1, name: 'Hatice S.', role: 'Admin', email: 'hatice@localus.com' },
      {
        id: 2,
        name: 'Ahmet Y.',
        role: 'Developer',
        email: 'ahmet@localus.com',
      },
    ],
  }),
  getters: {
    allUsers: (state) => state.users,
    totalUsersCount: (state) => state.users.length,
  },
  mutations: {},
  actions: {},
};
