<template>
  <q-card
    flat
    :bordered="props.bordered"
    class="fit"
    @click="
      $router.push({
        name: 'single-task-page',
        params: { id: data.task_id },
      })
    "
  >
    <q-card-section class="task-card cursor-pointer">
      <div
        class="column items-start justify-center"
        :class="$q.screen.width >= 330 ? 'self-center' : 'self-start'"
      >
        <div class="task-id cursor-pointer">
          <span class="text-grey">ID: {{ data.task_id }}</span>
        </div>
        <div class="col ellipsis">
          {{ data.task_name }}
        </div>
      </div>
      <div class="mobile-none self-center ellipsis">
        <span class="text-grey">Описание: </span>{{ data.description }}
      </div>
      <div
        class="task-controls row"
        :class="$q.screen.width >= 330 ? 'self-center' : 'self-start'"
      >
        <status-select
          class="fit"
          v-model="select"
          @click.stop
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
.task-card {
  display: grid;
  grid-template-columns: 20% 1fr 20%;
}

@media (max-width: 425px) {
  .mobile-none {
    display: none;
  }
  .task-card {
    grid-template-columns: 40% 60%;
  }
}
</style>
