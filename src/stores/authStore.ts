import { acceptHMRUpdate, defineStore } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { RegUserModel } from 'src/models/RegUserModel';
import { msApi } from 'src/api/authService';

export const useAuthStore = defineStore('auth', {
  state: (): { userData: UserModel } => ({
    userData: {
      id: 0,
      email: '',
      is_active: false,
      is_superuser: false,
      is_verified: false,
      username: '',
      role_id: 0,
    },
  }),
  actions: {
    async login(payload: { username: string; password: string }) {
      const formData = new FormData();
      formData.append('username', payload.username);
      formData.append('password', payload.password);
      try {
        await msApi.post<UserModel>('/auth/login', formData);
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async logout() {
      try {
        await msApi.post<UserModel>('/auth/logout');
        this.userData = {
          id: 0,
          email: '',
          is_active: false,
          is_superuser: false,
          is_verified: false,
          username: '',
          role_id: 0,
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    async register(payload: RegUserModel) {
      try {
        await msApi.post<RegUserModel>('/auth/register', {
          ...payload,
          role_id: 0,
        });
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getUserData() {
      try {
        const { data } = await msApi.get('/users/id');
        this.userData = data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getUserById(id: number) {
      try {
        const { data } = await msApi.get(`/users/${id}`);
        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
