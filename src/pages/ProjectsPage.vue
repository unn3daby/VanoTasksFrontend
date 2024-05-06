<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <div class="row q-pa-md">
        <div class="col-12 col-md-2">
          <q-input
            class="search-input"
            v-model="search"
            dense
            label="Поиск по проектам"
            ><template #append>
              <q-icon
                v-if="search !== ''"
                name="bi-x-lg"
                @click="search = ''"
                size="xs"
                class="cursor-pointer"
              />
              <q-icon name="bi-search" size="xs" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-10 row items-center justify-between">
          <q-btn
            rounded
            unelevated
            :class="{
              'q-mt-md': $q.screen.width <= 400,
              'q-ml-md': $q.screen.width > 400,
            }"
            :color="isUsersProjects ? 'primary' : 'grey'"
            @click="isUsersProjects = !isUsersProjects"
            no-caps
            class=""
            >Мои проекты</q-btn
          >
          <q-btn
            :class="{
              'q-mt-md': $q.screen.width <= 400,
              'q-ml-md': $q.screen.width > 400,
            }"
            unelevated
            round
            @click="isDialogVisible = true"
            icon="mdi-plus"
          ></q-btn>
        </div>
      </div>
      <q-scroll-area
        visible
        class="q-pl-md q-pr-md"
        style="height: calc(100% - 130px); max-width: 100%"
      >
        <div class="projects-container">
          <project-card
            v-for="project in filteredTProjects"
            :key="project.id"
            :data="project"
            v-ripple
            class="cursor-pointer"
            @click="
              $router.push({
                name: 'single-project-page',
                params: { id: project.id },
              })
            "
          />
        </div>
      </q-scroll-area>
    </div>
    <ProjectCreationModal
      v-model="isDialogVisible"
      @add-new-project="
        async () => {
          isUsersProjects = false;
          await projectsStore.getProjects();
        }
      "
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useProjectsStore } from 'stores/projectsStore';
import ProjectCard from 'components/ProjectCard.vue';
import ProjectCreationModal from 'src/components/ProjectCreationModal.vue';
import { useAuthStore } from 'src/stores/authStore';

const isDialogVisible = ref(false);

const projectsStore = useProjectsStore();
const authStore = useAuthStore();

const filteredTProjects = computed(() =>
  search.value
    ? projectsStore.projectsArray.filter(
        (item) =>
          item?.project_name
            ?.toLowerCase()
            ?.includes(search.value.toLowerCase()) ||
          item?.description?.toLowerCase().includes(search.value.toLowerCase())
      )
    : projectsStore.projectsArray
);

const isUsersProjects = ref(false);

watch(
  () => isUsersProjects.value,
  async () => {
    isUsersProjects.value
      ? await projectsStore.getProjectsByUserId(authStore.userData.id)
      : await projectsStore.getProjects();
  },
  { immediate: true }
);

const search = ref('');
</script>

<style scoped lang="scss">
.index {
  background-color: #493a3a;
}
.component-container {
  background-color: $light-bg-color;
}
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
  grid-gap: 20px;
}
:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

@media (max-width: 475px) {
  .search-input {
    width: 100%;
  }
  .projects-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
