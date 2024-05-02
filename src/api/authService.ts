import axios from 'axios';
import { Capacitor } from '@capacitor/core';

const msApi = axios.create({
  baseURL: Capacitor.isNativePlatform()
    ? import.meta.env.VITE_MOBILE_MS_API
    : import.meta.env.VITE_MS_API,
  withCredentials: true,
  xsrfCookieName: 'csrf_access_token',
});

msApi.interceptors.response.use(
  (res) => res,
  (err) => {
    /* const errorMessage = err.response.statusText;
    const code = err.response.status;
    switch (code) {
      case 401: {
        if (errorMessage === 'Unauthorized') {
          console.log(err.config);
        }
        break;
      }ц
      default:
        break;
    } */
    return Promise.reject(err);
  }
);
export { msApi };
