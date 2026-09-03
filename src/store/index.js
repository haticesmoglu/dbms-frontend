import { createStore } from 'vuex';
import notification from './notification';
import database from './database';
import table from './table';
import user from './user';

export default createStore({
  modules: {
    notification,
    database,
  },
});
