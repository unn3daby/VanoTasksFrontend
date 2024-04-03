<template>
  <q-select
    class="select"
    dense
    round
    standout="shadow"
    v-model="select"
    :bg-color="selectColor"
    :color="selectColor"
    :options="arr"
    emit-value
    map-options
    :display-value="taskStatuses.get(select)"
    @update:model-value="emits('update-task-status', $event)"
  ></q-select>
</template>

<script setup lang="ts">
import taskStatuses from 'src/utils/taskStatuses';
import { computed } from 'vue';
const arr = [
  { label: 'Открыта', value: 1 },
  { label: 'В работе', value: 2 },
  { label: 'Закрыта', value: 3 },
];

interface Props {
  modelValue: number;
}

defineProps<Props>();

interface Emits {
  (name: 'update-task-status', payload: number): void;
}

const emits = defineEmits<Emits>();

const select = defineModel<number>({ required: true });

const selectColor = computed(() => {
  switch (select.value) {
    case 1:
      return 'grey';
    case 2:
      return 'blue';
    case 3:
      return 'green';
    default:
      return 'white';
  }
});
</script>

<style scoped lang="scss">
.select {
  border-radius: 5px;
}
:deep(.q-field__native) {
  color: white;
  padding: 10px;
}
:deep(.q-field__inner) {
  border-radius: 5px;
}
:deep(.shadow) {
  box-shadow: none !important;
}

:deep(.q-select__dropdown-icon) {
  color: white;
}
</style>
