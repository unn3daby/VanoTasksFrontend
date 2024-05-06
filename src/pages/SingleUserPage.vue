<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row" :class="{ column: $q.screen.width <= 400 }">
          <div
            class="avatar-container bg-white q-pa-md rounded-borders row items-center justify-center"
            :class="{ 'q-mr-md': $q.screen.width > 400 }"
          >
            <q-avatar size="150px"
              ><img :src="profile.photo_url || 'src/assets/user.jpg'" alt=""
            /></q-avatar>
          </div>
          <div class="bg-white rounded-borders col q-pa-md">
            <div class="q-mb-sm row items-center">
              <div class="text-h6 q-mr-md">{{ profile.full_name }}</div>
              <div class="row justify-between" style="max-width: 400px">
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
          class="full-width q-mt-md bg-white rounded-borders row items-center justify-center column q-pa-sm"
          v-if="isUserHasTasks"
        >
          <div class="text-h6">Задачи</div>
          <PieChart :data="tasksStore.chart" />
        </div>
        <div
          class="full-width q-mt-md bg-white rounded-borders row q-px-md q-pt-sm"
          v-if="tasksStore.tasksArray.length"
        >
          <task-card
            bordered
            v-for="task in tasksStore.tasksArray"
            :key="task.task_id"
            :data="task"
            class="q-mb-md"
          />
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, computed, onMounted, ref } from 'vue';
import PieChart from 'src/components/PieChart.vue';
import TaskCard from 'src/components/Tasks/TaskCard.vue';
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

const isUserHasTasks = computed(
  () =>
    tasksStore.chart?.close ||
    tasksStore.chart?.in_progress ||
    tasksStore.chart?.open
);

onMounted(async () => {
  loading.value = true;
  user.value = await authStore.getUserById(route.params.id as string);
  profile.value = await authStore.getProfileById(route.params.id as string);
  await tasksStore.getPieChart(route.params.id as string);
  await tasksStore.getTasksByUserId(route.params.id as string);
  loading.value = false;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}
</style>
