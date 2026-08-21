import { mockDatabases } from '../utils/mockDatabases';

let databases = [...mockDatabases];

export const databaseService = {
  async getAllDatabases() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...databases]), 300);
    });
  },

  async getDatabaseById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = databases.find((d) => d.id === Number(id));
        if (item) resolve({ ...item });
        else reject(new Error('Veritabanı bulunamadı'));
      }, 200);
    });
  },

  async createDatabase(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDb = {
          id: Date.now(),
          tablesCount: 0,
          size: '0 MB',
          createdAt: new Date().toISOString().split('T')[0],
          ...data,
        };
        databases.unshift(newDb);
        resolve(newDb);
      }, 300);
    });
  },

  async updateDatabase(id, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = databases.findIndex((d) => d.id === Number(id));
        if (index !== -1) {
          databases[index] = { ...databases[index], ...data };
          resolve(databases[index]);
        }
      }, 300);
    });
  },

  async deleteDatabase(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        databases = databases.filter((d) => d.id !== Number(id));
        resolve(true);
      }, 300);
    });
  },
};
