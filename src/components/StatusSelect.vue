<template>
  <q-select
    dense
    v-model="select"
    outlined
    :bg-color="selectColor"
    :color="selectColor"
    :options="arr"
    :display-value="`Статус: ${select.label || 'Неизвестен'}`"
  ></q-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const arr = [
  { label: 'Открыто', value: 'open' },
  { label: 'В работе', value: 'work' },
  { label: 'Закрыто', value: 'closed' },
];
const select = ref(arr[0]);

const selectColor = computed(() => {
  switch (select.value.value) {
    case 'open':
      return 'grey';
    case 'work':
      return 'blue';
    case 'closed':
      return 'green';
    default:
      return 'white';
  }
});
</script>

<style scoped lang="scss">
:deep(.q-field__native) {
  color: white;
}
</style>
