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
      :width="200"
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
            :to="{ name: 'home-page' }"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Задачи </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="rounded-borders q-mb-sm">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Проекты </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="rounded-borders q-mb-sm">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Сотрудники </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-item clickable class="settings rounded-borders">
        <q-item-section avatar>
          <q-icon name="mdi-cog" />
        </q-item-section>

        <q-item-section> Настройки </q-item-section></q-item
      >
    </q-drawer>

    <q-page-container class="rounded-borders full-height">
      <q-page class="q-pb-md q-px-md">
        <div class="fit rounded-borders component-container">
          <router-view />
        </div>
      </q-page>
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

.component-container {
  background-color: $light-bg-color;
}
</style>
