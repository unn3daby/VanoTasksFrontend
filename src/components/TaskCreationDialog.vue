<template>
  <q-dialog v-model="isDialogVisible">
    <q-card style="width: 50vw">
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
        <q-btn
          @click="
            async () => {
              try {
                await msApi.post(`${ep}/tasks`, newData);
                Notification.success('Успешно создано');
                projectsStore.getTaskByProjectId($route.params.id as string);
                isDialogVisible = false;
              } catch (error) {
                Notification.error('Ошибка');
              }
            }
          "
          color="primary"
          >Создать</q-btn
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Notification from 'src/utils/Notification';
import { useProjectsStore } from 'src/stores/projectsStore';
import { msApi } from 'src/api/authService';

const projectsStore = useProjectsStore();
const isDialogVisible = defineModel<boolean>({ required: true });
const ep = import.meta.env.VITE_MS_API;
const newData = reactive({
  task_name: '',
  description: '',
  assigned_to: '',
  project_id: '',
});
</script>

<style lang="scss" scoped></style>
