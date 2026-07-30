import { createRouter, createWebHistory } from 'vue-router';

// Şimdilik test amaçlı tek bir sayfa bileşeni tanımlayalım
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
