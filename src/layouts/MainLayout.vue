<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Vano Tasks </q-toolbar-title>

        <q-btn @click="onLogout" flat icon="mdi-exit-to-app"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
      class="bg-white"
    >
      <q-scroll-area
        class="fit q-pl-md"
        :horizontal-thumb-style="{ opacity: '0' }"
      >
        <div class="q-ma-md">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <span class="q-ml-md">Ivan VANO</span>
        </div>
        <q-list padding class="q-pt-none full-height">
          <q-item
            clickable
            v-ripple
            class="rounded-borders q-mb-sm"
            :to="{ name: 'tasks-page' }"
          >
            <q-item-section avatar>
              <q-icon name="bi-list-task" />
            </q-item-section>

            <q-item-section> Задачи </q-item-section>
          </q-item>
          <q-item :to="{ name: 'projects-page' }" clickable v-ripple class="rounded-borders q-mb-sm">
            <q-item-section avatar>
              <q-icon name="bi-folder2" />
            </q-item-section>

            <q-item-section> Проекты </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="rounded-borders q-mb-sm">
            <q-item-section avatar>
              <q-icon name="bi-people" />
            </q-item-section>

            <q-item-section> Сотрудники </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-item clickable v-ripple class="settings rounded-borders">
        <q-item-section avatar>
          <q-icon name="bi-gear" />
        </q-item-section>

        <q-item-section> Настройки </q-item-section></q-item
      >
    </q-drawer>

    <q-page-container class="rounded-borders full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogout = async () => {
  await authStore.logout();
  await router.push({ name: 'auth' });
};
</script>
<style scoped lang="scss">
.vano {
  background-color: #b1afaf;
  max-height: 90vh;
  border-radius: 10px;
}
.q-page {
  height: 1px;
}

.settings {
  position: absolute;
  width: 92%;
  bottom: 16px;
  left: 16px;
}
</style>
