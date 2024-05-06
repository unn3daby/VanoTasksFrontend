<template>
  <q-dialog v-model="isDialogVisible">
    <q-card style="width: 90vw; max-width: 700px">
      <q-card-section class="text-h6"> Создание задачи </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newData.task_name"
          label="Имя задачи"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Описание задачи"
          dense
          v-model="newData.description"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Исполнитель"
          dense
          v-model="newData.assigned_to"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Проект"
          dense
          v-model="newData.project_id"
          outlined
        ></q-input
      ></q-card-section>
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

const route = useRoute();

const projectsStore = useProjectsStore();
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
const newData = reactive({
  task_name: '',
  description: '',
  assigned_to: '',
  project_id: '',
});
</script>

<style lang="scss" scoped></style>
