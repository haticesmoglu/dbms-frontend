import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: 'databases',
        name: 'Databases',
        component: () => import('../views/DatabaseView.vue'),
      },
      {
        path: 'databases/:databaseId/tables',
        name: 'Tables',
        component: () => import('../views/TableView.vue'),
      },
      {
        path: 'databases/:databaseId/tables/:tableId/columns',
        name: 'Columns',
        component: () => import('../views/ColumnView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
