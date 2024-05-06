<template>
  <q-dialog v-model="isDialogVisible">
    <q-card style="width: 90vw; max-width: 700px">
      <q-card-section class="text-h6"> Создание Проекта </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newData.project_name"
          label="Имя проекта"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Описание проекта"
          dense
          v-model="newData.description"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section>
        <q-input
          label="Код проекта"
          dense
          v-model="newData.project_code"
          outlined
        ></q-input
      ></q-card-section>
      <q-card-section class="row justify-end">
        <q-btn
          @click="
            projectsStore.postProject(newData).then(() => {
              isDialogVisible = false;
              emits('add-new-project');
            })
          "
          unelevated
          color="primary"
          >Создать</q-btn
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useProjectsStore } from 'src/stores/projectsStore';

interface Emits {
  (name: 'add-new-project'): void;
}

const emits = defineEmits<Emits>();

const projectsStore = useProjectsStore();
const isDialogVisible = defineModel<boolean>({ required: true });
const newData = reactive({
  project_name: '',
  description: '',
  project_code: '',
});
</script>

<style lang="scss" scoped></style>
