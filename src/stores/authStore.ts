import { defineStore } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { RegUserModel } from 'src/models/RegUserModel';
import { authService } from 'src/api/authService';

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
        await authService.post<UserModel>('/auth/login', formData);
      } catch (error) {
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('reg error');
      }
    },
    async logout() {
      try {
        await authService.post<UserModel>('/auth/logout');
      } catch (error) {
        console.error(error);
      }
    },
    async register(payload: RegUserModel) {
      try {
        await authService.post<RegUserModel>('/auth/register', {
          ...payload,
          role_id: 0,
        });
      } catch (error) {
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('reg error');
      }
    },
    async getUserData() {
      try {
        const { data } = await authService.get('/users/id');
        this.userData = data;
      } catch (error) {
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('reg error');
      }
    },
  },
});
