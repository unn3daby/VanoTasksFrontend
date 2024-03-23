import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const onlyNotAuth = to.matched.some((record) => record.meta.onlyNotAuth);
    console.log('reqAuth: ', requiresAuth);
    console.log('onlyNotAuth: ', onlyNotAuth);
    console.log('userId:', authStore.userData.id);

    if (requiresAuth && !authStore.userData.id) {
      next({ name: 'auth' });
      console.error('requiresAuth with not auth');
    } else if (onlyNotAuth && authStore.userData.id) {
      console.error('onlyNotAuth with auth');
      next('/');
    } else {
      console.error('all');
      next();
    }
  });

  return Router;
});
