<template>
  <router-view />
</template>

<script setup lang="ts">
import Notification from 'src/utils/Notification';
Notification.error('Error');
</script>
