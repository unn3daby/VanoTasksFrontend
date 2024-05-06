<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <div class="row q-pa-md">
        <div class="col-12"></div>
        <q-input
          class="search-input"
          v-model="search"
          dense
          label="Поиск пользователей"
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
        <WorkerCard
          v-for="user in authStore.users"
          class="q-mb-md cursor-pointer"
          :key="user.id"
          :user-id="user.id"
          @click="
            if (authStore.userData.id !== user.id)
              $router.push({
                name: 'single-user-page',
                params: { id: user.id },
              });
            else {
              $router.push({ name: 'account-page' });
            }
          "
        ></WorkerCard>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import WorkerCard from 'src/components/WorkerCard.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUsers();
});
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
