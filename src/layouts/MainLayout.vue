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

        <div>
          <q-btn @click="isAIOpened = true" icon="bi-magic" flat>
            <q-menu :offset="[0, 20]" class="myfull-width">
              <ChatTooltip />
            </q-menu>
            <q-tooltip>Спросить у ИИ</q-tooltip>
          </q-btn>
          <q-btn @click="onLogout" flat icon="mdi-exit-to-app">
            <q-tooltip>Выйти из аккаунта</q-tooltip></q-btn
          >
        </div>
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
        class="fit q-pl-md mobile-padding"
        :horizontal-thumb-style="{ opacity: '0' }"
      >
        <q-list padding class="q-pt-none full-height">
          <q-item
            v-ripple
            class="q-my-md q-pa-sm no-wrap row items-center rounded-borders cursor-pointer"
            :to="{ name: 'account-page' }"
          >
            <q-avatar>
              <img :src="authStore.profile.photo_url || 'src/assets/user.jpg'" />
            </q-avatar>
            <span class="q-ml-md">{{ authStore.userData.username }}</span>
          </q-item>
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
          <q-item
            :to="{ name: 'projects-page' }"
            clickable
            v-ripple
            class="rounded-borders q-mb-sm"
          >
            <q-item-section avatar>
              <q-icon name="bi-folder2" />
            </q-item-section>

            <q-item-section> Проекты </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            class="rounded-borders q-mb-sm"
            :to="{ name: 'users-page' }"
          >
            <q-item-section avatar>
              <q-icon name="bi-people" />
            </q-item-section>

            <q-item-section> Сотрудники </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="rounded-borders full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';
import ChatTooltip from 'components/ChatTooltip.vue';

const router = useRouter();

const authStore = useAuthStore();
const isAIOpened = ref(false);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogout = async () => {
  await authStore.logout();
  await router.push({ name: 'auth' });
};

onMounted(async () => {
  await authStore.getProfileById(authStore.userData.id);
});
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

@media (max-width: 400px) {
  .mobile-padding {
    padding: 10px;
  }
  .myfull-width {
    width: 100vw;
  }
}
</style>
