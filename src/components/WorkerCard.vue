<template>
  <q-card
    flat
    class="cursor-pointer"
    @click="
      $router.push({ name: 'single-user-page', params: { id: props.userId } })
    "
  >
    <q-card-section class="row items-center no-wrap">
      <q-avatar class="q-mr-md" size="3em">
        <img :src="profile.photo_url || 'src/assets/user.jpg'" alt="" />
      </q-avatar>
      <div class="ellipsis">{{ profile.full_name }}</div>
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
