<template>
  <q-page class="q-pb-md q-px-md">
    <q-card flat class="fit rounded-borders component-container q-pa-md">
      <q-card-section class="row items-center">
        <q-avatar size="100px" class="q-mr-lg">
          <img
            src="https://avatars.dzeninfra.ru/get-zen_doc/1592433/pub_6503cf002f6d150206d11abf_6503cf0a804a857b5a40fe6f/smart_crop_516x290"
          />
        </q-avatar>
        <div class="text-h4">Название проекта</div>
        <q-btn
          icon="bi-pencil-fill"
          size="md"
          flat
          round
          class="q-ml-md"
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <div class="text-bold project-descr">Описание:</div>
        <q-input
          outlined
          v-model="description"
          class="q-pt-none"
          type="textarea"
        />
      </q-card-section>
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const description = ref('');
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
}

:deep(.q-scrollarea__content) {
  max-width: 100% !important;
}

:deep(.q-field__native) {
  padding-top: 10px;
  padding-left: 10px;
  height: 40vh;
  resize: none;
}

.project-descr {
  font-size: 18px;
}

:deep(::-webkit-scrollbar) {
  height: 12px;
  width: 14px;
  background: transparent;
  z-index: 12;
  overflow: visible;
}

:deep(::-webkit-scrollbar-thumb) {
  width: 10px;
  background-color: $primary;
  border-radius: 10px;
  z-index: 999;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  margin: 4px;
  min-height: 32px;
  min-width: 32px;
  &:hover {
    background: $primary;
  }
}
</style>
