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
            <q-breadcrumbs active-color="black" class="q-mb-md">
              <q-breadcrumbs-el
                label="Проекты"
                class="cursor-pointer"
                @click="$router.push({ name: 'projects-page' })"
              />
              <q-breadcrumbs-el
                :label="'ID: ' + String($route.params.id)"
                style="max-width: 100px"
                class="ellipsis"
              />
            </q-breadcrumbs>
            <div class="row items-center no-wrap q-mb-md">
              <div class="text-h5">
                {{ currentProject.project.project_name }}
                <q-popup-edit
                  v-if="!isProjectReadonly"
                  class="row"
                  :class="{ 'full-width': $q.screen.width < 400 }"
                  auto-save
                  v-model="isPopupOpened"
                >
                  <q-input
                    class="col-12"
                    v-model="currentProject.project.project_name"
                    dense
                    autofocus
                    counter
                    @keyup.enter="
                      projectsStore.putProjectById(
                        projectId,
                        projectsStore.currentProject.project
                      )
                    "
                  />
                  <div class="col-12 flex justify-end">
                    <q-btn
                      flat
                      color="primary"
                      icon="mdi-check"
                      v-close-popup
                      class="self-end"
                      @click="
                        projectsStore.putProjectById(
                          projectId,
                          projectsStore.currentProject.project
                        )
                      "
                    />
                  </div>
                </q-popup-edit>
              </div>
              <q-space></q-space>
            </div>
            <div></div>
          </div>
          <div class="col-12 q-mb-md">
            <div class="q-mb-sm">Описание:</div>
            <div
              v-if="!isDescrAreaVisible"
              class="rounded-borders q-pa-xs"
              :class="{
                descr: !isProjectReadonly,
              }"
              @click="
                !isProjectReadonly
                  ? (isDescrAreaVisible = true)
                  : Notification.error(
                      'Изменять проект может только руководитель'
                    )
              "
            >
              <span
                class="text-grey-6"
                v-if="!projectsStore.currentProject.project.description"
                >Редактировать описание</span
              >
              <pre v-else class="q-ma-none descr-text">{{
                projectsStore.currentProject.project.description
              }}</pre>
            </div>
            <div v-if="isDescrAreaVisible">
              <textarea
                v-model="projectsStore.currentProject.project.description"
                class="fit descr-area rounded-borders q-pa-sm"
                rows="5"
              />
              <div class="row justify-end">
                <q-btn
                  class="q-mr-sm"
                  unelevated
                  @click="isDescrAreaVisible = false"
                  >Отмена</q-btn
                >
                <q-btn
                  color="primary"
                  unelevated
                  @click="
                    projectsStore.putProjectById(
                      projectId,
                      projectsStore.currentProject.project
                    );
                    isDescrAreaVisible = false;
                  "
                  >Добавить</q-btn
                >
              </div>
            </div>
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
                  v-if="!isProjectReadonly"
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
                  <div>Руководитель:</div>
                  <div>
                    <worker-card
                      v-if="projectsStore.currentProject.project.created_by"
                      bordered
                      class="q-mb-md"
                      :user-id="projectsStore.currentProject.project.created_by"
                    />
                  </div>
                  <div>Сотрудники:</div>
                  <worker-card
                    bordered
                    v-for="worker in filteredUsers.filter(
                      (item) =>
                        item.id !==
                        projectsStore.currentProject.project.created_by
                    )"
                    class="q-mb-sm"
                    :key="worker.id"
                    :user-id="worker.id"
                  />
                  <div
                    class="flex items-center justify-center text-grey q-mt-lg"
                    v-if="!filteredUsers.length"
                  >
                    Список пуст
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="row q-mt-md items-center fit justify-center rounded-borders q-pa-md bg-white"
            v-if="isProjectHasTasks"
          >
            <div class="text-h6">Задачи</div>
            <PieChart :data="tasksStore.projectChart" />
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
            style="height: 400px; width: 100%"
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
          <div class="q-px-md q-pt-none q-pb-sm q-mb-md bg-white full-width">
            Всего задач: {{ projectsStore.currentProject.task_count }}
          </div>
        </div>
      </q-scroll-area>
      <TaskCreationDialog v-model="isDialogVisible" />
      <UserAddDialog v-model="isAddingModalOpened" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Notification from 'src/utils/Notification';
import PieChart from 'src/components/PieChart.vue';
import UserAddDialog from 'src/components/UserAddDialog.vue';
import { useAuthStore } from 'src/stores/authStore';
import TaskCreationDialog from 'components/TaskCreationDialog.vue';
import { computed, onMounted, ref } from 'vue';
import TaskCard from 'src/components/Tasks/TaskCard.vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from 'src/stores/projectsStore';
import WorkerCard from 'components/WorkerCard.vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from 'src/stores/tasksStore';

const route = useRoute();
const authStore = useAuthStore();
const projectsStore = useProjectsStore();
const tasksStore = useTasksStore();
const isPopupOpened = ref(false);
const { currentProject, currentProjectUsers, currentProjectTasks } =
  storeToRefs(projectsStore);

const projectId = route.params.id.toString();

const isProjectReadonly = computed(() => {
  return (
    projectsStore.currentProject.project.created_by !== authStore.userData.id
  );
});

const isDialogVisible = ref(false);
const isAddingModalOpened = ref(false);

const isProjectHasTasks = computed(
  () =>
    tasksStore.projectChart?.close ||
    tasksStore.projectChart?.in_progress ||
    tasksStore.projectChart?.open
);

const search = ref('');

const filteredUsers = computed(() =>
  search.value
    ? currentProjectUsers.value.filter((item) => {
        return (
          item.username.toLowerCase().includes(search.value.toLowerCase()) ||
          item.email.toLowerCase().includes(search.value.toLowerCase()) ||
          item.username.toLowerCase().includes(search.value.toLowerCase())
        );
      })
    : currentProjectUsers.value
);

const isDescrAreaVisible = ref(false);

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    projectsStore.getProjectById(projectId),
    projectsStore.getProjectUsersById(projectId),
    projectsStore.getTaskByProjectId(projectId),
    tasksStore.getProjectPieChart(projectId),
  ]);
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

.descr-text {
  font-family: 'Montserrat';
  white-space: pre-wrap;
}

.descr-area {
  border: none;
  outline: none;
}
.descr {
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
