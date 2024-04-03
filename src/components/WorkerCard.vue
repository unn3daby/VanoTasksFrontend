<template>
  <q-card flat>
    <q-card-section class="row items-center">
      <q-avatar class="q-mr-md">
        <img
          src="https://avatars.dzeninfra.ru/get-zen_doc/1210285/pub_64e08d18d26a363c0ff251f8_64e08d19a944d116df34c368/smart_crop_516x290"
          alt=""
        />
      </q-avatar>
      <div>{{ profile.full_name }}</div>
      <q-space></q-space>
      <slot name="append"></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'stores/authStore';
import { ProfileModel } from 'src/models/ProfileModel';

const authStore = useAuthStore();
const profile = ref({} as ProfileModel);

interface Props {
  userId: number;
}

const props = defineProps<Props>();

onMounted(() => {
  authStore.getProfileById(props.userId).then((item) => (profile.value = item));
});
</script>

<style lang="scss" scoped></style>
