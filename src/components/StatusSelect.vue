<template>
  <q-btn
    :color="selectColor(menu?.value).name"
    :text-color="
      selectColor(menu?.value).name.includes('grey') ? 'black' : 'white'
    "
    :label="menu?.label"
    no-caps
    :style="`font-size: ${fz};`"
    unelevated
    class="no-wrap"
  >
    <q-menu fit :offset="[0, 5]">
      <q-list :style="`font-size: ${fz};`">
        <q-item
          v-for="value in values.entries()"
          :key="value[0]"
          v-close-popup
          class="q-pa-sm"
        >
          <q-item-section
            @click="
              onTaskChange(value[1].value),
                emits('update-task-status', value[1].value)
            "
            :class="`bg-${selectColor(value[1].value).name} text-${
              selectColor(value[1].value).name.includes('grey')
                ? 'black'
                : 'white'
            }`"
            class="text-center rounded-borders cursor-pointer text-white"
            >{{ value[1].label }}</q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
const values = new Map([
  [1, { label: 'Открыта', value: 1 }],
  [2, { label: 'В работе', value: 2 }],
  [3, { label: 'Закрыта', value: 3 }],
]);

interface Props {
  modelValue: number;
  fz?: string;
}

const props = defineProps<Props>();

interface Emits {
  (name: 'update-task-status', payload: number): void;
}

const emits = defineEmits<Emits>();

const menu: Ref<{ label: string; value: number } | null> = ref(null);

const onTaskChange = (type: number) => {
  const newValue = values.get(type);
  if (newValue) {
    menu.value = newValue;
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue !== menu.value?.value) onTaskChange(props.modelValue);
  },
  { immediate: true }
);

const selectColor = (type?: number) => {
  switch (type) {
    case 1:
      return { name: 'grey-4', hex: '#9e9e9e' };
    case 2:
      return { name: 'blue', hex: '#2196f3' };
    case 3:
      return { name: 'green', hex: '#4caf50' };
    default:
      return { name: 'white', hex: '#000000' };
  }
};
</script>

<style scoped lang="scss"></style>
