<template>
  <q-card flat>
    <q-card-section class="row items-center no-wrap">
      <q-avatar>
        <img
          class="col-1"
          src="https://avatars.dzeninfra.ru/get-zen_doc/1592433/pub_6503cf002f6d150206d11abf_6503cf0a804a857b5a40fe6f/smart_crop_516x290"
        />
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
      <div class="text-grey">{{ props.data.created_by }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ProjectModel } from 'src/models/ProjectModel';
import { format } from 'date-fns';
interface Props {
  data: ProjectModel;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.project-description {
  max-height: 150px;
  overflow: hidden;
}
</style>
