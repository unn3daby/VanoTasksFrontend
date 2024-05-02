<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row">
          <div class="col-12 col-md-8 q-pr-md">
            <div class="row items-center no-wrap q-pl-md q-mb-md">
              <div class="text-h5">
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
            </div>
            <div></div>
          </div>
          <div class="col-12">
            <q-card
              flat
              class="fit rounded-borders bg-white"
              style="min-height: 400px"
            >
              <q-card-section class="no-wrap justify-between row">
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
                <q-btn
                  flat
                  icon="mdi-plus"
                  @click="isAddingModalOpened = true"
                ></q-btn>
              </q-card-section>
              <q-separator class="q-mx-sm"></q-separator>
              <q-card-section class="fit q-pa-none">
                <q-scroll-area
                  class="q-pa-md"
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
          <div class="q-mt-md bg-white fit text-center text-h6 q-py-md row">
            <div class="q-ml-md">Список задач:</div>
            <q-space></q-space>
            <q-btn
              class="q-mr-md"
              flat
              icon="mdi-plus"
              @click="isDialogVisible = true"
              ><q-tooltip>Создать задачу</q-tooltip></q-btn
            >
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
      <TaskCreationDialog v-model="isDialogVisible" />
      <UserAddDialog v-model="isAddingModalOpened" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import UserAddDialog from 'src/components/UserAddDialog.vue';
import TaskCreationDialog from 'components/TaskCreationDialog.vue';
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

const isDialogVisible = ref(false);
const isAddingModalOpened = ref(false);

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
