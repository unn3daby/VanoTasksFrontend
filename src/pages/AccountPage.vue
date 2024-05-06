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
            class="avatar-container bg-white q-pa-md rounded-borders column items-center justify-center"
            :class="{ 'q-mr-md': $q.screen.width > 400 }"
          >
            <q-avatar size="150px"
              ><img
                :src="authStore.profile.photo_url || 'src/assets/user.jpg'"
                alt="user's avatar"
            /></q-avatar>

            <input
              type="file"
              accept="image/png, image/jpeg"
              ref="fileInput"
              style="display: none"
              @change="updateProfile"
            />
            <q-btn
              color="primary"
              unelevated
              class="q-mt-md"
              @click="openFileInput"
              >Изменить</q-btn
            >
          </div>
          <div class="bg-white rounded-borders col q-pa-md">
            <div class="q-mb-sm row items-center">
              <div class="text-h6 q-mr-md cursor-pointer">
                {{ authStore.profile.full_name }}
              </div>
              <q-popup-edit
                class="row"
                :class="{ 'full-width': $q.screen.width < 400 }"
                v-model="authStore.profile.full_name"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="col-12"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="updateProfile"
                />
                <div class="col-12 flex justify-end">
                  <q-btn
                    flat
                    color="primary"
                    icon="mdi-check"
                    v-close-popup
                    class="self-end"
                    @click="updateProfile"
                  />
                </div>
              </q-popup-edit>
            </div>
            <q-separator></q-separator>
            <div class="q-mt-md row column items-start justify-center">
              <div class="q-mb-sm">
                <span class="text-bold">ID:</span>{{ authStore.userData.id }}
              </div>
              <div class="q-mb-sm">
                <span class="text-bold">Почта:</span>
                {{ authStore.userData.email }}
              </div>
              <div class="q-mb-sm">
                <span class="text-bold">Логин:</span>
                {{ authStore.userData.username }}
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
import { computed, onMounted, ref } from 'vue';
import PieChart from 'src/components/PieChart.vue';
import TaskCard from 'src/components/Tasks/TaskCard.vue';
import { v4 as uuidv4 } from 'uuid';
import { useTasksStore } from 'src/stores/tasksStore';
import { useAuthStore } from 'src/stores/authStore';
const loading = ref(false);
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const fileInput = ref<HTMLInputElement | null>(null);

const isUserHasTasks = computed(
  () =>
    tasksStore.chart?.close ||
    tasksStore.chart?.in_progress ||
    tasksStore.chart?.open
);

const openFileInput = () => {
  fileInput.value?.click();
};

const updateProfile = async (event: HTMLInputElement) => {
  const formData = new FormData();
  if (event.target.files?.length) {
    const file = event.target.files[0];
    const blob = new Blob([file.value], { type: file.type });
    formData.append('photo', blob, uuidv4());
    await authStore.putUserProfile(
      {
        user_id: authStore.userData.id,
        full_name: authStore.profile.full_name,
      },
      formData
    );
    authStore.getProfile();
  } else {
    await authStore.putUserProfile({
      user_id: authStore.userData.id,
      full_name: authStore.profile.full_name,
    });
    authStore.getProfile();
  }
};

onMounted(async () => {
  loading.value = true;
  await tasksStore.getPieChart(authStore.userData.id);
  await tasksStore.getTasksByUserId(authStore.userData.id);
  loading.value = false;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}
</style>
