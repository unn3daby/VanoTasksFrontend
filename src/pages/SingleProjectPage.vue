<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row">
          <div class="col-8 q-pr-md">
            <div class="row items-center no-wrap q-pl-md q-mb-md">
              <q-avatar size="100px" class="q-mr-lg">
                <img
                  src="https://avatars.dzeninfra.ru/get-zen_doc/1592433/pub_6503cf002f6d150206d11abf_6503cf0a804a857b5a40fe6f/smart_crop_516x290"
                />
              </q-avatar>
              <div class="text-h4">
                {{ currentProject.project.project_name }}
              </div>
              <q-btn
                icon="bi-pencil-fill"
                size="md"
                flat
                round
                class="q-ml-md"
              ></q-btn>
              <q-space></q-space>
              <div class="manager">
                <worker-card
                  v-if="currentProject.project.created_by"
                  :user-id="currentProject.project.created_by"
                >
                  <template #append>
                    <q-icon
                      name="mdi-crown"
                      size="md"
                      class="q-mx-md"
                      style="color: #fac980"
                      ><q-tooltip>Руководитель проекта</q-tooltip></q-icon
                    >
                  </template>
                </worker-card>
              </div>
            </div>
            <div>
              <div class="project-descr">Описание:</div>
              <q-input
                color="primary"
                bg-color="white"
                borderless
                readonly
                flat
                v-model="currentProject.project.description"
                class="q-pt-none q-pr-none rounded-borders descr-textarea"
                type="textarea"
              />
            </div>
          </div>
          <div class="col-4">
            <q-card flat class="fit rounded-borders bg-white">
              <q-card-section class="q-px-lg">
                <q-input
                  dense
                  v-model="search"
                  class="workers-input"
                  label="Сотрудники"
                  ><template #append>
                    <q-icon
                      v-if="search !== ''"
                      name="bi-x-lg"
                      @click="search = ''"
                      size="xs"
                      class="cursor-pointer q-mr-sm"
                    />
                    <q-icon name="bi-search" size="xs" /> </template
                ></q-input>
              </q-card-section>
              <q-card-section class="fit workers-wrapper q-pa-none bordered">
                <q-scroll-area
                  class="q-px-md q-pb-md"
                  style="height: calc(100% - 75px); max-width: 100%"
                  :thumb-style="{ right: '5px', width: '7px' }"
                >
                  <worker-card
                    bordered
                    v-for="worker in currentProjectUsers"
                    class="q-mb-sm"
                    :key="worker.id"
                    :user-id="worker.id"
                  />
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
          <div class="q-mt-md bg-white fit text-center text-h6 q-py-md">
            Список задач проекта
          </div>
          <q-scroll-area
            visible
            class="q-px-md q-pb-md bg-white tasks-scroll"
            style="height: 500px; width: 100%"
            :thumb-style="{ right: '5px', width: '7px' }"
          >
            <div>
              <task-card
                bordered
                v-for="task in currentProjectTasks"
                :key="task.task_id"
                :data="task"
                class="q-mb-md"
              />
            </div>
          </q-scroll-area>
        </div>
      </q-scroll-area>
    </div>
    <q-inner-loading class="bg-white" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TaskCard from 'src/components/Tasks/TaskCard.vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from 'src/stores/projectsStore';
import WorkerCard from 'components/WorkerCard.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const projectsStore = useProjectsStore();
const { currentProject, currentProjectUsers, currentProjectTasks } =
  storeToRefs(projectsStore);

const projectId = route.params.id.toString();

const search = ref('');

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await projectsStore.getProjectById(projectId);
  await projectsStore.getProjectUsersById(projectId);
  await projectsStore.getTaskByProjectId(projectId);
  loading.value = false;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}

.workers-input {
  max-width: 200px;
}

:deep(.q-field__control) {
  padding-right: 0;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

.descr-textarea {
  :deep(.q-field__native) {
    padding-top: 10px;
    padding-left: 10px;
    min-height: 200px;
    height: 100%;
    resize: none;
  }
}

.project-descr {
  font-size: 16px;
}

.manager {
  min-width: 300px;
}

.vano {
  background: #ffffff;
}
</style>
