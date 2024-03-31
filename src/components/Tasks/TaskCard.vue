<template>
  <q-card flat class="task-card fit">
    <q-card-section
      class="row no-wrap items-center"
      :class="{ 'justfy-between': $q.screen.width <= 900 }"
    >
      <div
        class="task-id"
        :class="{
          'col-2': $q.screen.width > 900 && $q.screen.width <= 1200,
          'col-1': $q.screen.width > 1200,
        }"
      >
        VANO-2345
      </div>
      <div class="col task-descr q-px-md">Сделать вано вано</div>
      <div
        :class="{
          'col-2': $q.screen.width > 900 && $q.screen.width <= 1200,
          'col-1': $q.screen.width > 1200,
        }"
        class="task-project row column justify-center"
      >
        <div>VanoChat</div>
        <div>05.02.2023</div>
      </div>
      <div
        :class="{
          'col-2': $q.screen.width > 900,
        }"
        class="task-controls"
      >
        <status-select v-model="select"></status-select>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StatusSelect from 'components/StatusSelect.vue';
const select = ref('');
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

@media (max-width: 900px) {
  .task-controls {
    width: 120px;
  }
}
</style>
