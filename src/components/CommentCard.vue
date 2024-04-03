<template>
  <q-card flat>
    <q-card-section class="row no-wrap">
      <div>
        <q-avatar>
          <img
            src="https://avatars.dzeninfra.ru/get-zen_doc/1780598/pub_64e815cee06ac4035785e4e5_64e815dcdef9666b56194dc4/smart_crop_516x290"
            alt=""
          />
        </q-avatar>
      </div>
      <div class="q-ml-sm">
        <div class="text-body1">{{ user.username || 'loading...' }}</div>
        <div class="date">
          {{ format(props.data.commented_at, 'dd.MM.yyyy HH:mm') }}
        </div>
        <div>{{ props.data.comment_text }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { CommentModel } from 'src/models/CommentModel';
import { format } from 'date-fns';
import { UserModel } from 'src/models/UserModel';
import { useAuthStore } from 'stores/authStore';
import { Ref, onMounted, ref } from 'vue';
interface Props {
  data: CommentModel;
}
const user: Ref<UserModel> = ref({} as UserModel);
const props = defineProps<Props>();
const authStore = useAuthStore();
onMounted(async () => {
  user.value = await authStore.getUserById(props.data.commenter_id);
});
</script>

<style lang="scss" scoped>
.date {
  font-size: 12px;
  color: gray;
}
</style>
