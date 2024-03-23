import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { requiresAuth: false },
    redirect: { name: 'login' },
    component: () => import('layouts/ClearLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/AuthOrRegPage.vue'),
        meta: { requiresAuth: false },
        children: [
          {
            name: 'login',
            path: 'login',
            meta: { requiresAuth: false },
            component: () => import('src/components/LoginCard.vue'),
          },
          {
            name: 'register',
            path: 'register',
            meta: { requiresAuth: false },
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
