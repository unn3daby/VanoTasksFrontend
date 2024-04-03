<template>
  <q-card flat :bordered="props.bordered" class="task-card fit">
    <q-card-section
      class="row no-wrap items-center"
      :class="{ 'justfy-between': $q.screen.width <= 900 }"
    >
      <div
        class="task-id cursor-pointer"
        :class="{
          'col-2': $q.screen.width > 900 && $q.screen.width <= 1200,
          'col-1': $q.screen.width > 1200,
        }"
        @click="
          $router.push({
            name: 'single-task-page',
            params: { id: data.task_id },
          })
        "
      >
        Задача №{{ data.task_id }}
      </div>
      <div class="col task-descr q-px-md">
        <span class="text-bold">Задача: </span>{{ data.task_name }}
      </div>
      <div
        :class="{
          'col-2': $q.screen.width > 900 && $q.screen.width <= 1200,
          'col-1': $q.screen.width > 1200,
        }"
        class="task-project row column justify-center text-grey"
      >
        <div class="cursor-pointer task-project-name">
          {{ data.project_id }} Имя проекта
        </div>
        <div>
          {{ new Date(data.created_at).toLocaleDateString() }}
        </div>
      </div>
      <div
        :class="{
          'col-2': $q.screen.width > 900,
        }"
        class="task-controls"
      >
        <status-select
          v-model="select"
          @update-task-status="updateTaskStatus"
        ></status-select>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StatusSelect from 'components/StatusSelect.vue';
import { useTasksStore } from 'src/stores/tasksStore';
import TaskModel from 'src/models/TaskModel';
interface Props {
  bordered?: boolean;
  data: TaskModel;
}
const tasksStore = useTasksStore();

const props = withDefaults(defineProps<Props>(), { bordered: false });

const select = ref(props.data.status_id);

const updateTaskStatus = async (status: number) => {
  await tasksStore.putTaskStatus(props.data.task_id, status);
};
</script>

<style scoped lang="scss">
.task-card {
  .task-id {
    color: $primary-text;
  }
  .task-descr {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }
}

.task-project-name {
  transition: all 0.2s;
  &:hover {
    color: $primary;
  }
}

@media (max-width: 900px) {
  .task-controls {
    width: 120px;
  }
}
</style>
