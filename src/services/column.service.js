import { mockColumns } from '../utils/mockColumns';

let columns = [...mockColumns];

export const columnService = {
  async getColumnsByTableId(tableId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = columns.filter((c) => c.tableId === Number(tableId));
        resolve([...filtered]);
      }, 300);
    });
  },

  async createColumn(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCol = {
          id: Date.now(),
          ...data,
        };
        columns.push(newCol);
        resolve(newCol);
      }, 300);
    });
  },

  async updateColumn(id, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = columns.findIndex((c) => c.id === Number(id));
        if (index !== -1) {
          columns[index] = { ...columns[index], ...data };
          resolve(columns[index]);
        }
      }, 300);
    });
  },

  async deleteColumn(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        columns = columns.filter((c) => c.id !== Number(id));
        resolve(true);
      }, 300);
    });
  },
};
