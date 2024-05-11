<template>
  <q-input
    dense
    type="datetime-local"
    filled
    v-model="value"
    label="Дедлайн"
    unmasked-value
  />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

interface Props {
  modelValue: string;
}

interface Emits {
  (name: 'update:modelValue'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const value = useVModel(props, 'modelValue', emits);
</script>

<style scoped></style>
