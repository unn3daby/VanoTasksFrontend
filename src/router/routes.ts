import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'main-page',
        component: () => import('pages/MainPage.vue'),
      },
      {
        path: '/tasks',
        name: 'tasks-page',
        component: () => import('pages/TasksPage.vue'),
      },
      {
        path: '/tasks/:id',
        name: 'single-task-page',
        component: () => import('pages/SingleTaskPage.vue'),
      },
      {
        path: '/projects',
        name: 'projects-page',
        component: () => import('pages/ProjectsPage.vue'),
      },
      {
        path: '/projects/:id',
        name: 'single-project-page',
        component: () => import('pages/SingleProjectPage.vue'),
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
            component: () => import('src/components/Auth/LoginCard.vue'),
          },
          {
            name: 'register',
            path: '/register',
            meta: { onlyNotAuth: true },
            component: () => import('src/components/Auth/RegistrationCard.vue'),
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
