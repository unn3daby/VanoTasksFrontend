<template>
  <q-dialog v-model="isDialogVisible" @before-show="onShow">
    <q-card style="width: 90vw; max-width: 700px">
      <q-card-section class="text-h6"> Создание задачи </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          clearable
          v-model="newData.task_name"
          label="Имя задачи"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Описание задачи"
          dense
          clearable
          v-model="newData.description"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-select
          class=""
          clearable
          outlined
          v-model="newData.assigned_to"
          dense
          label="Исполнитель"
          behavior="menu"
          option-value="user_id"
          option-label="full_name"
          emit-value
          map-options
          :options="authStore.profilesList"
        />
      </q-card-section>
      <q-card-section>
        <q-select
          class=""
          clearable
          outlined
          v-model="newData.project_id"
          dense
          label="Проект"
          behavior="menu"
          option-value="id"
          option-label="project_name"
          emit-value
          map-options
          :options="projectsStore.projectsArray"
        />
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn @click="createTask" unelevated color="primary">Создать</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Notification from 'src/utils/Notification';
import { useProjectsStore } from 'src/stores/projectsStore';
import { useRoute } from 'vue-router';
import { msApi } from 'src/api/authService';
import { useTasksStore } from 'src/stores/tasksStore';
import { useAuthStore } from 'src/stores/authStore';

const route = useRoute();

const projectsStore = useProjectsStore();
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const isDialogVisible = defineModel<boolean>({ required: true });
const ep = import.meta.env.VITE_MS_API;

const createTask = async () => {
  try {
    const formData = new FormData();
    formData.append('task_name', newData.task_name);
    formData.append('description', newData.description);
    formData.append('assigned_to', newData.assigned_to);
    formData.append('project_id', newData.project_id);
    await msApi.post(`${ep}/tasks`, formData);
    Notification.success('Успешно создано');
    if (route.params.id) {
      projectsStore.getTaskByProjectId(route.params.id as string);
    } else {
      tasksStore.getTasks();
    }
    isDialogVisible.value = false;
  } catch (error) {
    Notification.error('Ошибка');
  }
};

const onShow = async () => {
  await authStore.getAllProfiles();
  await projectsStore.getProjects();
};

const newData = reactive({
  task_name: '',
  description: '',
  assigned_to: '',
  project_id: '',
});
</script>

<style lang="scss" scoped></style>
