import { mockTables } from '../utils/mockTables';

let tables = [...mockTables];

export const tableService = {
  async getTablesByDatabaseId(databaseId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = tables.filter(
          (t) => t.databaseId === Number(databaseId)
        );
        resolve([...filtered]);
      }, 300);
    });
  },

  async createTable(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTable = {
          id: Date.now(),
          rowsCount: 0,
          size: '0 KB',
          createdAt: new Date().toISOString().split('T')[0],
          ...data,
        };
        tables.unshift(newTable);
        resolve(newTable);
      }, 300);
    });
  },

  async updateTable(id, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = tables.findIndex((t) => t.id === Number(id));
        if (index !== -1) {
          tables[index] = { ...tables[index], ...data };
          resolve(tables[index]);
        }
      }, 300);
    });
  },

  async deleteTable(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        tables = tables.filter((t) => t.id !== Number(id));
        resolve(true);
      }, 300);
    });
  },
};
