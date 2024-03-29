<template>
  <q-card flat bordered class="auth-card">
    <q-card-section>
      <h3 class="q-ma-none text-bold title">Вход в аккаунт</h3>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        clearable
        v-model="username"
        class="q-mb-md"
        label="Введите логин"
        outlined
      />
      <q-input
        clearable
        v-model="password.value"
        label="Введите пароль"
        outlined
        :type="password.type"
      >
        <template #append>
          <q-icon
            :name="password.type === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
            @click="
              password.type === 'password'
                ? (password.type = 'text')
                : (password.type = 'password')
            "
            class="q-ml-sm cursor-pointer"
          ></q-icon>
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions class="q-pa-md">
      <q-btn
        unelevated
        color="primary"
        class="full-width submit-button"
        @click="onLogin"
      >
        <span class="text-bold">Войти</span>
      </q-btn>
      <div class="text-bold caption q-mt-md">
        Нет аккаунта?
        <span
          class="text-primary cursor-pointer"
          @click="$router.push({ name: 'register' })"
          >Зарегистрироваться</span
        >
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';

interface PasswordModel {
  value: string;
  type: 'password' | 'text';
}

const authStore = useAuthStore();
const router = useRouter();

const username: Ref<string> = ref('');

const password: Ref<PasswordModel> = ref({
  value: '',
  type: 'password',
});

const onLogin = async () => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value.value,
    });
    await authStore.getUserData();
    await router.push('/');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
</script>

<style scoped lang="scss"></style>
