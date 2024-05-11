<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Notification from './utils/Notification';
import { useTasksStore } from './stores/tasksStore';
import { useAuthStore } from './stores/authStore';
const tasksstore = useTasksStore();
const authStore = useAuthStore();
onMounted(async () => {
  const data = await tasksstore.getDeadlines(authStore.userData.id);
  if (data) {
    data.forEach((item) =>
      Notification.warning(`У задачи ${item.task_id} просрочен дедлайн`)
    );
  }
});
</script>
