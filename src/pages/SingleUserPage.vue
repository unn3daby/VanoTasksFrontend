<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row">
          <div
            class="avatar-container bg-white q-pa-md q-mr-md rounded-borders"
          >
            <q-avatar size="150px"
              ><img :src="profile.photo_url || 'src/assets/user.jpg'" alt=""
            /></q-avatar>
          </div>
          <div class="bg-white rounded-borders col q-pa-md">
            <div class="q-mb-sm row items-center">
              <div class="text-h6">{{ profile.full_name }}</div>
              <div class="q-ml-md row justify-between" style="width: 400px">
                <q-badge v-if="user.is_superuser">Суперпользователь</q-badge>
                <q-badge v-if="user.is_active" color="green">Активен</q-badge>
                <q-badge v-if="user.is_verified" color="blue"
                  >Верифицирован
                </q-badge>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="q-mt-md row column items-start justify-center">
              <div class="q-mb-sm">
                <span class="text-bold">ID:</span>{{ user.id }}
              </div>
              <div class="q-mb-sm">
                <span class="text-bold">Почта:</span> {{ user.email }}
              </div>
              <div class="q-mb-sm">
                <span class="text-bold">Логин:</span> {{ user.username }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="full-width q-mt-md bg-white rounded-borders row items-center justify-center"
          style="height: 500px"
        >
          <div class="text-h4">В разработке...</div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { useTasksStore } from 'src/stores/tasksStore';
import { useAuthStore } from 'src/stores/authStore';
import { useRoute } from 'vue-router';
import { UserModel } from 'src/models/UserModel';
import { ProfileModel } from 'src/models/ProfileModel';

const user: Ref<UserModel> = ref({} as UserModel);
const profile: Ref<ProfileModel> = ref({} as ProfileModel);
const loading = ref(false);

const route = useRoute();
const authStore = useAuthStore();
const tasksStore = useTasksStore();

onMounted(async () => {
  loading.value = true;
  user.value = await authStore.getUserById(route.params.id as string);
  profile.value = await authStore.getProfileById(route.params.id as string);
  loading.value = false;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}
</style>
