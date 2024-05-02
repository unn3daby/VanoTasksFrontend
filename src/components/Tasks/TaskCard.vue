<template>
  <q-card flat :bordered="props.bordered" class="task-card fit">
    <q-card-section
      class="row no-wrap items-center justify-between"
      :class="{ 'justfy-between': $q.screen.width <= 900 }"
    >
      <div class="flex-mobile">
        <div
          class="task-id cursor-pointer q-mr-sm"
          @click="
            $router.push({
              name: 'single-task-page',
              params: { id: data.task_id },
            })
          "
        >
          <span class="text-grey">ID: {{ data.task_id }}</span>
        </div>
        <div class="col task-descr q-mb-md">
          {{ data.task_name }}
        </div>
      </div>
      <div
        :class="{
          'col-2': $q.screen.width > 900 && $q.screen.width <= 1200,
          'col-1': $q.screen.width > 1200,
        }"
        class="task-project row column justify-center text-grey mobile-none"
      >
        <div class="cursor-pointer task-project-name">
          {{ data.project_name }}
        </div>
        <div>
          {{ new Date(data.created_at).toLocaleDateString() }}
        </div>
      </div>
      <div
        :class="{
          'col-2': $q.screen.width > 900,
          'col-6': $q.screen.width <= 900,
        }"
        class="task-controls flex column self-start"
      >
        <status-select
          class="fit"
          v-model="select"
          @update-task-status="updateTaskStatus"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StatusSelect from 'components/StatusSelect.vue';
import { useTasksStore } from 'src/stores/tasksStore';
import { TaskModel } from 'src/models/TaskModel';
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
.task-project-name {
  transition: all 0.2s;
  &:hover {
    color: $primary;
  }
}
.flex-mobile {
  display: flex;
}

@media (max-width: 425px) {
  .mobile-none {
    display: none;
  }
  .flex-mobile {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
}
</style>
