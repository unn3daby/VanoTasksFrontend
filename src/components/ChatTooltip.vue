<template>
  <q-card :class="{ 'full-width': $q.screen.width < 400 }">
    <q-card-section>
      <div
        class="chat-window rounded-borders q-pa-md"
        :class="{ mobile: isMobile }"
      >
        {{ response }}
        <q-inner-loading :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </div>
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="search"
        :label="search ? undefined : 'Введите запрос'"
        @keydown.enter="makeQuestion"
        outlined
        dense
        class="q-mt-md"
      >
        <template #append>
          <q-btn
            icon="mdi-send"
            flat
            round
            size="sm"
            @click.stop="makeQuestion"
          ></q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAiStore } from 'src/stores/aiStore';

const aiStore = useAiStore();
const search = ref('');
const response = ref('Спросите меня о чем угодно!');
const loading = ref(false);

const makeQuestion = async () => {
  loading.value = true;
  await aiStore.makeQuestion(search.value);
  response.value = aiStore.response;
  loading.value = false;
  search.value = '';
};

const isMobile = computed(() => {
  return window.innerWidth <= 425;
});
</script>

<style lang="scss" scoped>
.chat-window {
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 200px;
  min-width: 300px;
}

.mobile {
  min-width: unset;
}
</style>
