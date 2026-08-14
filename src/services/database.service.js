import { mockDatabases } from '../utils/mockDatabases';

export const databaseService = {
  async getAllDatabases() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDatabases]);
      }, 500);
    });
  },
};
