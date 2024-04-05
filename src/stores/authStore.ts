import { acceptHMRUpdate, defineStore } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { RegUserModel } from 'src/models/RegUserModel';
import Notification from 'src/utils/Notification';
import { msApi } from 'src/api/authService';
import { ProfileModel } from 'src/models/ProfileModel';

export const useAuthStore = defineStore('auth', {
  state: (): {
    userData: UserModel;
    users: UserModel[];
    profile: ProfileModel;
  } => ({
    userData: {
      id: 0,
      email: '',
      is_active: false,
      is_superuser: false,
      is_verified: false,
      username: '',
      role_id: 0,
    },
    profile: {
      full_name: '',
      user_id: 0,
      photo_url: null,
    },
    users: [],
  }),
  actions: {
    async login(payload: { username: string; password: string }) {
      const formData = new FormData();
      formData.append('username', payload.username);
      formData.append('password', payload.password);
      try {
        await msApi.post<UserModel>('/auth/login', formData);
        Notification.success('Пользователь успешно авторизован');
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
        Notification.success('Пользователь успешно зарегистрирован');
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
    async getUsers() {
      try {
        const { data } = await msApi.get('/users');
        this.users = data.items;
      } catch (error) {
        Notification.error('Ошибка');
      }
    },
    async getUserById(id: number | string) {
      try {
        const { data } = await msApi.get(`/users/${id}`);
        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getProfileById(userId: number | string) {
      try {
        const { data } = await msApi.get<ProfileModel>(
          `/users/profile/${userId}`
        );
        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getProfile() {
      try {
        const { data } = await msApi.get<ProfileModel>(
          `/users/profile/${this.userData.id}`
        );
        this.profile = data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getAllUserData() {
      try {
        await this.getUserData();
        await this.getProfile();
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async putUserProfile(
      payload: { user_id: number | string; full_name: string },
      formData?: FormData
    ) {
      try {
        await msApi.put('/users/upload/photo', formData, { params: payload });
        Notification.success('Профиль успешно изменен');
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
