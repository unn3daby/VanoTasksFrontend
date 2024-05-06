<template>
  <div>Main Page</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onBeforeMount(() => {
  router.push({ name: 'tasks-page' });
});
</script>

<style lang="scss" scoped></style>
