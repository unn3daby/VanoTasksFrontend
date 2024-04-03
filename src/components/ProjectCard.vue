<template>
  <q-card flat>
    <q-card-section class="row items-center no-wrap">
      <q-avatar>
        <div class="bg-primary" style="height: 100px; width: 100px"></div>
      </q-avatar>
      <div class="col text-h6 q-ml-lg">{{ props.data.project_name }}</div>
    </q-card-section>
    <q-separator class="q-mx-md" />
    <q-card-section>
      <div class="text-bold">Описание:</div>
      <div class="project-description">
        {{ props.data.description }}
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <span class="text-bold">Код проекта:</span> {{ props.data.project_code }}
    </q-card-section>
    <q-card-section class="q-py-sm">
      <span class="text-bold">Дата создания:</span>
      {{ format(props.data.created_at, 'dd.MM.yyyy HH:mm') }}
    </q-card-section>
    <q-card-section class="q-pt-sm text-right">
      <div class="text-grey">Руководитель:</div>
      <div class="text-grey">{{ profile.full_name }}</div>
    </q-card-section>
    <q-inner-loading class="bg-white" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup lang="ts">
import { ProjectModel } from 'src/models/ProjectModel';
import { format } from 'date-fns';
import { useAuthStore } from 'src/stores/authStore';
import { onMounted, ref } from 'vue';

interface Props {
  data: ProjectModel;
}

const authStore = useAuthStore();
const profile = ref({ full_name: '' });
const props = defineProps<Props>();

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  profile.value = await authStore.getProfileById(props.data.created_by);
  loading.value = false;
});
</script>

<style scoped lang="scss">
.project-description {
  max-height: 150px;
  overflow: hidden;
}
</style>
