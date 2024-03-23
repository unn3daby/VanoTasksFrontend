import axios from 'axios';

const authService = axios.create({
  baseURL: import.meta.env.VITE_MS_API,
  withCredentials: true,
  xsrfCookieName: 'csrf_access_token',
});

authService.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorMessage = err.response.statusText;
    const code = err.response.status;
    switch (code) {
      case 401: {
        if (errorMessage === 'Unauthorized') {
          console.log(err.config);
        }
        break;
      }
      default:
        break;
    }
    return Promise.reject(err.response.data.detail ?? err.response);
  }
);
export { authService };
