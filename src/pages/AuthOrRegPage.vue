<template>
  <q-page>
    <router-view />
  </q-page>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.q-page {
  height: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $auth-bg-color;
}
:deep(.title) {
  font-size: 25px;
  text-align: center;
}
:deep(.submit-button) {
  min-height: 55px;
}
:deep(.caption) {
  font-size: 12px;
  text-align: center;
  width: 100%;
}
:deep(.auth-card) {
  width: 30vw;
  min-width: 300px;
  max-width: 550px;
}
:deep(.q-field__control:hover::before) {
  border-color: $primary;
}
</style>
