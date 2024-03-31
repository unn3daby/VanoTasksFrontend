<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <div class="row q-pa-md">
        <div class="col-12"></div>
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
            <q-icon name="bi-search" size="xs" /> </template
        ></q-input>
      </div>
      <q-scroll-area
        visible
        class="q-pl-md q-pr-md"
        style="height: calc(100% - 85px); max-width: 100%"
      >
        <div class="projects-container">
          <project-card
            v-for="i in 10"
            :key="i"
            v-ripple
            class="cursor-pointer"
            @click="
              $router.push({
                name: 'single-project-page',
                params: { id: 2031 },
              })
            "
          ></project-card>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { authService } from 'src/api/authService';
import ProjectCard from 'components/ProjectCard.vue';
const search = ref('');

onMounted(async () => {
  await authService.get('/projects');
});
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
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
