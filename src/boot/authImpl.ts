import { useAuthStore } from 'src/stores/authStore';
import { boot } from 'quasar/wrappers';

export default boot(async () => {
  const authStore = useAuthStore();
  try {
    await authStore.getAllUserData();
  } catch (error) {
    console.error(error);
  }
});
