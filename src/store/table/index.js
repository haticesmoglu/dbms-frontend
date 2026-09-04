import { tableService } from '../../services/table.service';

export default {
  namespaced: true,
  state: () => ({
    tables: [],
    isLoading: false,
  }),
  getters: {
    allTables: (state) => state.tables,
    totalTablesCount: (state) => state.tables.length,
  },
  mutations: {
    SET_TABLES(state, payload) {
      state.tables = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchTables({ commit }, databaseId) {
      commit('SET_LOADING', true);
      const data = await tableService.getTablesByDatabaseId(databaseId);
      commit('SET_TABLES', data);
      commit('SET_LOADING', false);
    },
  },
};
