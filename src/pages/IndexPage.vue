<template>
  <div class="row q-pa-md">
    <div class="col-12"></div>
    <q-input
      class="search-input"
      v-model="search"
      clearable
      dense
      label="Поиск по задачам"
    ></q-input>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { authService } from 'src/api/authService';

const search = ref('');

onMounted(async () => {
  await authService.get('/projects');
});
</script>

<style scoped lang="scss">
.index {
  background-color: #493a3a;
}
.search-input {
  width: 210px;
}

@media (max-width: 425px) {
  .search-input {
    width: 100%;
  }
}
</style>
