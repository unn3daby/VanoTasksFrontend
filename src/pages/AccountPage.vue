<template>
  <q-page class="q-pb-md q-px-md">
    <div class="fit rounded-borders component-container">
      <q-scroll-area
        visible
        class="q-pa-md"
        style="height: 100%; max-width: 100%"
      >
        <div class="row items-center">
          <label for="fileInput" class="cursor-pointer">
            <q-avatar size="100px">
              <img
                :src="authStore.profile.photo_url || 'src/assets/user.jpg'"
              />
              <q-icon
                v-if="file"
                name="mdi-check"
                color="green"
                class="avatar-done"
              />
            </q-avatar>
          </label>
          <input
            id="fileInput"
            type="file"
            @change="handleFileChange"
            style="display: none"
          />
          <q-input
            class="q-ml-md"
            v-model="fullname"
            label="ФИО"
            outlined
            dense
          ></q-input>
        </div>
        <q-btn color="primary" unelevated class="q-mt-md" @click="updateProfile"
          >Изменить</q-btn
        >
      </q-scroll-area>
    </div>
    <q-inner-loading class="bg-white" :showing="false">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { Ref, onMounted, ref } from 'vue';
const file: Ref<File | undefined> = ref();

const fullname = ref('');

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const eventFile = input.files?.[0];
  file.value = eventFile;
};
const authStore = useAuthStore();

const updateProfile = async () => {
  const formData = new FormData();
  if (file.value) {
    const blob = new Blob([file.value], { type: file.value.type });
    formData.append('photo', blob, file.value.name);
    await authStore.putUserProfile(
      {
        user_id: authStore.userData.id,
        full_name: fullname.value,
      },
      formData
    );
    authStore.getProfile();
  } else {
    await authStore.putUserProfile({
      user_id: authStore.userData.id,
      full_name: fullname.value,
    });
    authStore.getProfile();
  }
};
onMounted(() => {
  fullname.value = authStore.profile.full_name;
});
</script>

<style scoped lang="scss">
.component-container {
  background-color: $light-bg-color;
  height: 100%;
}

.avatar-done {
  position: absolute;
  z-index: 10;
}
</style>
