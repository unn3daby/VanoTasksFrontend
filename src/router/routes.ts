import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('layouts/ClearLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/AuthOrRegPage.vue'),
        children: [
          {
            name: 'login',
            path: 'login',
            component: () => import('src/components/LoginCard.vue'),
          },
          {
            name: 'register',
            path: 'register',
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
