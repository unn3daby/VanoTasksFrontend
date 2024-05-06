<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row">
          <div class="col-sm-8 col-12">
            <q-breadcrumbs active-color="black" class="q-mb-md">
              <q-breadcrumbs-el
                label="Задачи"
                class="cursor-pointer"
                @click="$router.push({ name: 'tasks-page' })"
              />
              <q-breadcrumbs-el
                :label="currentTask.task_name"
                style="max-width: 100px"
                class="ellipsis"
              />
            </q-breadcrumbs>
            <div class="text-h5 q-mb-sm">
              {{ currentTask.task_name }}
              <q-popup-edit
                class="row"
                v-model="currentTask.task_name"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="col-12"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="updateName(scope)"
                />
                <div class="col-12 flex justify-end">
                  <q-btn
                    flat
                    color="primary"
                    icon="mdi-check"
                    class="self-end"
                    @click="updateName(scope)"
                  />
                </div>
              </q-popup-edit>
            </div>
            <div class="buttons q-mb-md">
              <q-btn
                class="paperclip-btn q-px-sm"
                no-caps
                unelevated
                icon="bi-paperclip"
                @click="fileInput?.click()"
              >
                Прикрепить
              </q-btn>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="updateTask"
              />
            </div>
          </div>
          <div class="col-sm-4 col-12 q-mb-md">
            <status-select
              @update-task-status="
                tasksStore.putTaskStatus(tasksStore.currentTask.task_id, $event)
              "
              class="q-mb-md"
              v-model="status"
            />
            <q-list class="rounded-borders bg-white">
              <q-expansion-item
                expand-separator
                icon="perm_identity"
                label="Сведения"
              >
                <q-separator class="q-mx-md"></q-separator>
                <div class="q-pa-sm">
                  <div class="q-mb-sm row justify-between">
                    <div>Исполнитель:</div>
                    <div
                      class="text-primary cursor-pointer"
                      @click="onAssignMe"
                    >
                      Назначить меня
                    </div>
                  </div>
                  <div class="row items-center q-mb-lg">
                    <q-avatar size="md" class="q-mr-sm">
                      <img
                        :src="assignedUser.photo_url || 'src/assets/user.jpg'"
                      />
                    </q-avatar>
                    <div
                      class="cursor-pointer"
                      v-if="!isChangeAssigned"
                      @click="
                        isChangeAssigned = true;
                        selectValue = JSON.parse(JSON.stringify(assignedUser));
                      "
                    >
                      {{ assignedUser.full_name }}
                    </div>
                    <div v-else class="row col-grow items-center no-wrap">
                      <q-select
                        class="col-10 q-mr-sm assigned-select"
                        outlined
                        v-model="selectValue"
                        @update:model-value="
                          async () => {
                            tasksStore.currentTask.assigned_to =
                              selectValue.user_id;
                            await updateTask();
                            isChangeAssigned = false;
                            assignedUser = await authStore.getProfileById(
                              selectValue.user_id
                            );
                          }
                        "
                        dense
                        use-input
                        behavior="menu"
                        option-value="user_id"
                        option-label="full_name"
                        :options="authStore.profilesList"
                      />
                      <q-btn
                        @click="isChangeAssigned = false"
                        flat
                        class="q-pa-sm"
                        size="sm"
                        icon="bi-x-lg"
                      />
                    </div>
                  </div>
                  <div class="q-mb-sm">Автор:</div>
                  <div class="row items-center">
                    <q-avatar size="md" class="q-mr-sm">
                      <img :src="user.photo_url || 'src/assets/user.jpg'" />
                    </q-avatar>
                    <div>{{ user.full_name }}</div>
                  </div>
                </div>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
        <div class="row q-mb-xl">
          <div class="col-md-6 col-12">
            <div class="q-mb-sm">Описание</div>
            <div
              v-if="!isDescrAreaVisible"
              class="descr rounded-borders q-pa-xs"
              @click="isDescrAreaVisible = true"
            >
              <span
                class="text-grey-6"
                v-if="!tasksStore.currentTask.description"
                >Редактировать описание</span
              >
              <pre v-else class="q-ma-none descr-text">{{
                tasksStore.currentTask.description
              }}</pre>
            </div>
            <div v-if="isDescrAreaVisible">
              <textarea
                v-model="tasksStore.currentTask.description"
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
                <q-btn color="primary" unelevated @click="updateTask"
                  >Добавить</q-btn
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="q-mt-md column q-mb-lg"
          v-if="tasksStore.currentTask.file_url"
        >
          <div class="text-bold">Файл:</div>
          <div class="cursor-pointer q-pt-sm">
            <q-icon
              color="primary"
              size="xl"
              name="bi-file-earmark-arrow-down"
              @click="downloadFile"
            ></q-icon>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-12">
            <div class="active-title q-mb-sm">Активность</div>
            <div class="q-mb-md">
              Показать:
              <span class="text-primary active rounded-borders"
                >Комментарии</span
              >
            </div>
            <div class="flex items-start q-mb-md">
              <q-avatar size="lg" class="q-mr-sm">
                <img :src="user.photo_url || 'src/assets/user.jpg'" />
              </q-avatar>
              <div
                class="q-pa-sm rounded-borders comment-input text-grey-5"
                v-if="!isCommentAreaVisible"
                @click="isCommentAreaVisible = true"
              >
                Добавить комментарий...
              </div>
              <div v-else class="col-grow">
                <textarea
                  v-model="comment"
                  class="fit descr-area rounded-borders q-pa-sm"
                  rows="5"
                />
                <div class="row justify-end">
                  <q-btn
                    class="q-mr-sm"
                    unelevated
                    @click="isCommentAreaVisible = false"
                    >Отмена</q-btn
                  >
                  <q-btn
                    color="primary"
                    unelevated
                    @click="addComment"
                    :disable="!comment"
                    >Добавить</q-btn
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <CommentCard
                class="col-12 q-mb-sm"
                v-for="comment in tasksStore.currentComments"
                :key="comment.commented_at"
                :data="comment"
              />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import StatusSelect from 'src/components/StatusSelect.vue';
import { Ref, onBeforeMount, ref, watch } from 'vue';
import { useTasksStore } from 'src/stores/tasksStore';
import { useAuthStore } from 'src/stores/authStore';
import { useRoute } from 'vue-router';
import CommentCard from 'components/CommentCard.vue';
import { storeToRefs } from 'pinia';
import { ProfileModel } from 'src/models/ProfileModel';

const user: Ref<ProfileModel> = ref({} as ProfileModel);
const assignedUser: Ref<ProfileModel> = ref({} as ProfileModel);
const comment = ref('');
const descr = ref('');
const isCommentAreaVisible = ref(false);
const isDescrAreaVisible = ref(false);
const isChangeAssigned = ref(false);
const selectValue: Ref<ProfileModel> = ref({} as ProfileModel);
const status = ref(0);
const loading = ref(false);

const route = useRoute();
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const { currentTask } = storeToRefs(tasksStore);
const fileInput = ref<null | HTMLInputElement>();

watch(
  () => tasksStore.currentTask,
  () => {
    descr.value = tasksStore.currentTask.description;
  },
  { deep: true }
);

const addComment = async () => {
  await tasksStore.postComment(comment.value, route.params.id as string);
  await tasksStore.getComments(route.params.id as string);
  comment.value = '';
};

const getAllProfiles = async () => {
  await authStore.getAllProfiles();
};

const onAssignMe = async () => {
  currentTask.value.assigned_to = authStore.profile.user_id;
  await tasksStore.putTaskById(route.params.id as string);
  assignedUser.value = await authStore.getProfileById(
    tasksStore.currentTask.assigned_to
  );
};

const downloadFile = () => {
  try {
    const a = document.createElement('a');
    a.href = tasksStore.currentTask.file_url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Ошибка скачивания файла:', error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateName = async (scope: any) => {
  if (scope.value) {
    scope.set();
    await tasksStore.putTaskById(route.params.id as string);
  }
};

const updateTask = async (event?: Event) => {
  if (event && event.target?.files?.length) {
    const file = event.target.files[0];

    // Создаем объект FileReader для чтения содержимого файла
    const reader = new FileReader();

    // Создаем обещание для обработки завершения чтения файла
    const fileReadPromise = new Promise((resolve, reject) => {
      // Устанавливаем обработчик события для завершения чтения файла
      reader.onload = () => {
        // Разрешаем обещание с содержимым файла
        resolve(reader.result);
      };

      // Устанавливаем обработчик события для обработки ошибок чтения файла
      reader.onerror = () => {
        // Отклоняем обещание с ошибкой
        reject(reader.error);
      };
    });

    // Читаем содержимое файла
    reader.readAsArrayBuffer(file);

    try {
      // Ожидаем завершения чтения файла
      const fileContent = await fileReadPromise;

      // Создаем Blob из содержимого файла
      const blob = new Blob([fileContent], { type: file.type });

      // Устанавливаем Blob в свойство photo текущей задачи
      tasksStore.currentTask.photo = { file: blob, filename: file.name };
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
    }
  }

  // Отправляем обновленную задачу на сервер
  await tasksStore.putTaskById(route.params.id as string);

  // Скрываем область описания задачи
  isDescrAreaVisible.value = false;

  // Получаем обновленные данные задачи с сервера
  await tasksStore.getTaskById(route.params.id as string);
};

watch(isChangeAssigned, () => {
  if (isChangeAssigned.value) {
    getAllProfiles();
  }
});

onBeforeMount(async () => {
  loading.value = true;
  await tasksStore.getTaskById(route.params.id as string);
  await tasksStore.getComments(route.params.id as string);
  user.value = await authStore.getProfileById(
    tasksStore.currentTask.created_by
  );
  assignedUser.value = await authStore.getProfileById(
    tasksStore.currentTask.assigned_to
  );
  status.value = tasksStore.currentTask.status_id;
  loading.value = false;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}

.active {
  background-color: #e2e2fc;
  padding: 0 5px;
}

.assigned-select {
  width: 300px;
}

.descr-text {
  font-family: 'Montserrat';
  white-space: pre-wrap;
}

.descr-area {
  border: none;
  outline: none;
}

.paperclip-btn {
  background-color: #e2e2fc;
}

.active-title {
  font-weight: 600;
}

.comment-input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: text;
  flex-grow: 1;
  background-color: rgba(255, 255, 255);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.descr {
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.task-label {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

.task-button {
  background-color: #d1d0d0;
}

@media (max-width: 768px) {
  .component-container {
    padding-left: 0;
    padding-right: 0;
  }
  .assigned-select {
    width: 150px;
  }
}
</style>
