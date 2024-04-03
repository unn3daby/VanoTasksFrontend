<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row">
          <div class="col-8">
            <div class="row items-center justify-between no-wrap">
              <div class="text-h5">
                <span class="text-primary"
                  >[Задача №{{ currentTask.task_id }}]
                </span>
                {{ currentTask.task_name }}
              </div>
              <div class="row q-mr-xl">
                <status-select
                  @update-task-status="
                    tasksStore.putTaskStatus(
                      tasksStore.currentTask.task_id,
                      $event
                    )
                  "
                  class="status-select"
                  v-model="status"
                />
              </div>
            </div>

            <div>
              <div class="text-bold q-mt-lg">Детали задачи:</div>
              <div class="q-px-md q-pt-sm">
                Проект:
                <span
                  class="text-primary cursor-pointer"
                  @click="
                    $router.push({
                      name: 'single-project-page',
                      params: { id: currentTask.project_id },
                    })
                  "
                  >{{ currentTask.project_name }}</span
                >
              </div>
              <div class="q-px-md q-pt-sm">
                Дата создания:
                {{ new Date(currentTask.created_at).toLocaleDateString() }}
              </div>
            </div>
            <div>
              <div class="text-bold q-mt-md">Описание:</div>
              <div class="q-px-md q-pt-sm">
                {{ currentTask.description }}
              </div>
            </div>
            <div>
              <div class="text-bold q-mt-md">Комментарии:</div>
              <div class="q-pr-md q-pt-sm">
                <q-input
                  v-model="comment"
                  class="comment-btn"
                  v-if="!isTextAreaVisible"
                  dense
                  label="Добавьте комментарий"
                  readonly
                  borderless
                  bg-color="white"
                  @click="isTextAreaVisible = true"
                />
                <div v-if="isTextAreaVisible" class="relative">
                  <q-input
                    color="primary"
                    autofocus
                    borderless
                    bg-color="white"
                    flat
                    v-model="comment"
                    class="q-pt-none q-pr-none rounded-borders descr-textarea"
                    type="textarea"
                  />
                  <div class="row justify-end q-mt-sm">
                    <q-btn
                      @click="
                        isTextAreaVisible = false;
                        comment = '';
                      "
                      color="grey"
                      unelevated
                      class="q-mr-sm"
                      >Отмена</q-btn
                    >
                    <q-btn color="primary" unelevated @click="addComment"
                      >Добавить</q-btn
                    >
                  </div>
                </div>
              </div>
              <div class="q-pr-md q-mt-md">
                <comment-card
                  class="q-mb-md"
                  v-for="comment in tasksStore.currentComments"
                  :key="comment.commented_at"
                  :data="comment"
                />
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="text-bold text-center text-h6">Люди:</div>
            <div class="text-left q-mb-sm">Создатель:</div>
            <worker-card
              v-if="user.id"
              :user-id="user.id"
              v-ripple
              class="cursor-pointer"
            >
              <template #append>
                <q-icon
                  name="mdi-crown"
                  size="md"
                  class="q-mx-md"
                  style="color: #fac980"
                ></q-icon>
              </template>
            </worker-card>
            <div class="text-left q-mt-md q-mb-sm class row justify-between">
              Исполнитель:
              <div class="text-right text-primary cursor-pointer">
                Назначить меня
              </div>
            </div>
            <worker-card
              v-if="assignedUser.id"
              class="cursor-pointer"
              v-ripple
              :user-id="assignedUser.id"
            >
              <template #append>
                <q-btn flat icon="mdi-pencil" @click.stop></q-btn>
              </template>
            </worker-card>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <q-inner-loading class="bg-white" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import StatusSelect from 'src/components/StatusSelect.vue';
import { Ref, onMounted, ref } from 'vue';
import { useTasksStore } from 'src/stores/tasksStore';
import { useAuthStore } from 'src/stores/authStore';
import { useRoute } from 'vue-router';
import CommentCard from 'components/CommentCard.vue';
import WorkerCard from 'src/components/WorkerCard.vue';
import { storeToRefs } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { ProfileModel } from 'src/models/ProfileModel';

const user: Ref<ProfileModel> = ref({} as ProfileModel);
const assignedUser: Ref<UserModel> = ref({} as UserModel);
const comment = ref('');
const isTextAreaVisible = ref(false);
const status = ref(0);
const loading = ref(false);

const route = useRoute();
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const { currentTask } = storeToRefs(tasksStore);

const addComment = async () => {
  await tasksStore.postComment(comment.value, route.params.id as string);
  await tasksStore.getComments(route.params.id as string);
  comment.value = '';
};

onMounted(async () => {
  loading.value = true;
  await tasksStore.getTaskById(route.params.id as string);
  await tasksStore.getComments(route.params.id as string);
  user.value = await authStore.getUserById(tasksStore.currentTask.created_by);
  assignedUser.value = await authStore.getUserById(
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

.relative {
  position: relative;
}

.workers-input {
  max-width: 200px;
}

.status-select {
  width: 170px;
}

.task-label {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
}

.comment-btn {
  :deep(.q-field__label) {
    padding-left: 10px;
  }
}

.descr-textarea {
  :deep(.q-field__native) {
    padding: 10px;
    resize: none;
  }
}

:deep(.q-field__control) {
  padding-right: 0;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

.task-button {
  background-color: #d1d0d0;
}
</style>
