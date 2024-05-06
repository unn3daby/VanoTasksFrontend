<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <div class="row q-pa-md">
        <div class="col-12 col-md-2">
          <q-input
            class="full-width"
            v-model="search"
            dense
            label="Поиск по задачам"
          >
            <template #append>
              <q-icon
                v-if="search !== ''"
                name="bi-x-lg"
                @click="search = ''"
                size="xs"
                class="cursor-pointer q-mr-sm"
              />
              <q-icon name="bi-search" size="xs" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-10 row items-center justify-between">
          <q-btn
            rounded
            unelevated
            :class="{
              'q-mt-md': $q.screen.width <= 400,
              'q-ml-md': $q.screen.width > 400,
            }"
            :color="isUsersTasks ? 'primary' : 'grey'"
            @click="isUsersTasks = !isUsersTasks"
            no-caps
            class=""
            >Мои задачи</q-btn
          >
          <q-btn
            :class="{
              'q-mt-md': $q.screen.width <= 400,
              'q-ml-md': $q.screen.width > 400,
            }"
            unelevated
            round
            @click="isDialogVisible = true"
            icon="mdi-plus"
          ></q-btn>
        </div>
      </div>

      <q-scroll-area
        visible
        class="q-pl-md q-mr-sm q-pr-md tasks-scroll"
        style="height: calc(100% - 130px); max-width: 100%"
      >
        <div class="tasks-container">
          <task-card
            v-for="task in filteredTasks"
            :key="task.task_id"
            :data="task"
            class="q-mb-md"
          />
        </div>
      </q-scroll-area>
    </div>
    <TaskCreationDialog v-model="isDialogVisible" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TaskCard from 'components/Tasks/TaskCard.vue';
import TaskCreationDialog from 'src/components/TaskCreationDialog.vue';
import { useAuthStore } from 'src/stores/authStore';
import { useTasksStore } from 'src/stores/tasksStore';

const authStore = useAuthStore();

const isDialogVisible = ref(false);

const search = ref('');
const taskStore = useTasksStore();
const isUsersTasks = ref(false);

const filteredTasks = computed(() =>
  search.value
    ? taskStore.tasksArray.filter((item) =>
        item.task_name.includes(search.value)
      )
    : taskStore.tasksArray
);

watch(
  () => isUsersTasks.value,
  async () => {
    isUsersTasks.value
      ? await taskStore.getTasksByUserId(authStore.userData.id)
      : await taskStore.getTasks();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.index {
  background-color: #493a3a;
}

.component-container {
  background-color: $light-bg-color;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}
</style>
