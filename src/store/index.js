import { createStore } from 'vuex';
import notification from './notification';
import database from './database';

export default createStore({
  modules: {
    notification,
    database,
  },
});
