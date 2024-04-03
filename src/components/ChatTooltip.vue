<template>
  <q-card>
    <q-card-section>
      <div class="rounded-borders chat-window q-pa-md">
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
import { ref } from 'vue';
import { useAiStore } from 'src/stores/aiStore.ts';

const aiStore = useAiStore();
const blackText = ref(false);
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
</script>

<style lang="scss" scoped>
.chat-window {
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 200px;
  min-width: 300px;
}
</style>
