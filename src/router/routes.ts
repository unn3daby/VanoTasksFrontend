import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { onlyNotAuth: true },
    redirect: { name: 'auth-page' },
    component: () => import('layouts/ClearLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth-page',
        redirect: { name: 'login' },
        component: () => import('pages/AuthOrRegPage.vue'),
        meta: { onlyNotAuth: true },
        children: [
          {
            name: 'login',
            path: '/login',
            meta: { onlyNotAuth: true },
            component: () => import('src/components/LoginCard.vue'),
          },
          {
            name: 'register',
            path: '/register',
            meta: { onlyNotAuth: true },
            component: () => import('src/components/RegistrationCard.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
