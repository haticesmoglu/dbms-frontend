import { createStore } from 'vuex';
import notification from './notification';
import database from './database';
import table from './table';
import user from './user';
import auth from './auth';

export default createStore({
  modules: {
    notification,
    database,
    table,
    user,
    auth,
  },
});
