<template>
  <q-card flat>
    <q-card-section class="row items-center no-wrap">
      <q-avatar>
        <img
          class="col-1"
          src="https://avatars.dzeninfra.ru/get-zen_doc/1592433/pub_6503cf002f6d150206d11abf_6503cf0a804a857b5a40fe6f/smart_crop_516x290"
        />
      </q-avatar>
      <div class="col text-h6 q-ml-lg">Иван Смайл</div>
    </q-card-section>
    <q-separator class="q-mx-md" />
    <q-card-section>
      <div class="text-bold">Описание:</div>
      <div class="project-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo ad esse
        sit voluptas impedit, porro laboriosam, consequuntur nulla quis fugiat
        voluptatem culpa incidunt similique, unde provident atque quisquam
        fugit. Velit. dsf swFilenamesdf solidfsssdfsdfsdf solidfsssdfsdfsdfsdf
        sdfsdfsdf
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <span class="text-bold">Код проекта:</span> VANO
    </q-card-section>
    <q-card-section class="q-py-sm">
      <span class="text-bold">Кол-во задач:</span> 92
    </q-card-section>
    <q-card-section class="q-pt-sm text-right">
      <div class="text-grey">Руководитель:</div>
      <div class="text-grey">Иван Вано</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.project-description {
  max-height: 150px;
  overflow: hidden;
}
</style>
