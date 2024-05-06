<template>
  <q-dialog v-model="modelValue" @show="authStore.getAllProfiles()">
    <q-card class="user-dialog">
      <q-card-section>
        <q-select
          label="Добавить пользователя"
          class="col-10 q-mb-md assigned-select fit"
          outlined
          v-model="selectValue"
          dense
          use-input
          behavior="menu"
          option-value="user_id"
          option-label="full_name"
          :options="authStore.profilesList"
        />
        <div class="flex justify-end">
          <q-btn
            unelevated
            color="primary"
            @click="() => {
            try {
              if (selectValue){
                projetcsStore.postProjectsUsersById(
                  $route.params.id as string, selectValue?.user_id
                );
                selectValue = null;
                modelValue = false;
              }
            } catch (error) {
              if (typeof error === 'string') {
                Notification.error(error)
              }
            }
            }"
            >Добавить
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ProfileModel } from 'src/models/ProfileModel';
import Notification from 'src/utils/Notification';
import { Ref, ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import { useProjectsStore } from 'src/stores/projectsStore';

const modelValue = defineModel<boolean>({ required: true });
const selectValue: Ref<ProfileModel | null> = ref(null);

const authStore = useAuthStore();
const projetcsStore = useProjectsStore();
</script>

<style scoped lang="scss">
.user-dialog {
  min-width: 50%;
}

@media (max-width: 425px) {
  .user-dialog {
    min-width: 90vw;
  }
}
</style>
