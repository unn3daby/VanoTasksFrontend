<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <div class="row q-pa-md">
        <div class="col-12"></div>
        <q-input
          class="search-input"
          v-model="search"
          dense
          label="Поиск по задачам"
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
      </div>
      <q-scroll-area
        visible
        class="q-pl-md q-mr-sm q-pr-md tasks-scroll"
        style="height: calc(100% - 85px); max-width: 100%"
      >
        <div>
          <task-card v-for="n in 10" :key="n" class="q-mb-md" />
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TaskCard from 'components/Tasks/TaskCard.vue';

const search = ref('');
</script>

<style scoped lang="scss">
.index {
  background-color: #493a3a;
}
.search-input {
  width: 210px;
}
.component-container {
  background-color: $light-bg-color;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

@media (max-width: 425px) {
  .search-input {
    width: 100%;
  }
}
</style>
