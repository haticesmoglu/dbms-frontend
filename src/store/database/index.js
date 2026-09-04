import { databaseService } from '../../services/database.service';

export default {
  namespaced: true,
  state: () => ({
    databases: [],
    isLoading: false,
    selectedDatabase: null,
  }),
  getters: {
    allDatabases: (state) => state.databases,
    activeDatabases: (state) =>
      state.databases.filter((db) => db.status === 'Active'),
    totalDatabasesCount: (state) => state.databases.length,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    SET_DATABASES(state, payload) {
      state.databases = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_SELECTED_DATABASE(state, payload) {
      state.selectedDatabase = payload;
    },
    ADD_DATABASE(state, newDb) {
      state.databases.unshift(newDb);
    },
    UPDATE_DATABASE(state, updatedDb) {
      const index = state.databases.findIndex((d) => d.id === updatedDb.id);
      if (index !== -1) {
        state.databases[index] = updatedDb;
      }
    },
    DELETE_DATABASE(state, id) {
      state.databases = state.databases.filter((d) => d.id !== id);
    },
  },
  actions: {
    async fetchDatabases({ commit, dispatch }) {
      commit('SET_LOADING', true);
      try {
        const data = await databaseService.getAllDatabases();
        commit('SET_DATABASES', data);
      } catch (error) {
        dispatch(
          'notification/showNotification',
          { message: 'Veritabanları yüklenemedi!', type: 'error' },
          { root: true }
        );
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createDatabase({ commit, dispatch }, formData) {
      const newDb = await databaseService.createDatabase(formData);
      commit('ADD_DATABASE', newDb);
      dispatch(
        'notification/showNotification',
        { message: `${newDb.name} başarıyla oluşturuldu!`, type: 'success' },
        { root: true }
      );
      return newDb;
    },
    async updateDatabase({ commit, dispatch }, { id, data }) {
      const updated = await databaseService.updateDatabase(id, data);
      commit('UPDATE_DATABASE', updated);
      dispatch(
        'notification/showNotification',
        { message: 'Veritabanı güncellendi!', type: 'success' },
        { root: true }
      );
      return updated;
    },
    async deleteDatabase({ commit, dispatch }, id) {
      await databaseService.deleteDatabase(id);
      commit('DELETE_DATABASE', id);
      dispatch(
        'notification/showNotification',
        { message: 'Veritabanı silindi.', type: 'info' },
        { root: true }
      );
    },
  },
};
