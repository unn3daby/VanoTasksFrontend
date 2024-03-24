<template>
  <q-card flat bordered class="auth-card">
    <q-card-section>
      <h3 class="q-ma-none text-bold title">Регистрация</h3>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        v-model="email"
        clearable
        class="q-mb-md"
        label="Введите почту"
        outlined
      />
      <q-input
        clearable
        v-model="username"
        class="q-mb-md"
        label="Введите логин"
        outlined
      />
      <q-input
        v-for="(password, i) in passwords"
        clearable
        :key="i"
        v-model="password.value"
        class="q-mb-md"
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
        @click="onRegister"
      >
        <span class="text-bold">Зарегистрироваться</span>
      </q-btn>
      <div class="text-bold caption q-mt-md">
        Есть аккаунт?
        <span
          class="text-primary cursor-pointer"
          @click="$router.push({ name: 'login' })"
          >Войти</span
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

const username: Ref<string> = ref('');
const passwords: Ref<Array<PasswordModel>> = ref([
  {
    value: '',
    type: 'password',
  },
  {
    value: '',
    type: 'password',
  },
]);
const email: Ref<string> = ref('');

const authStore = useAuthStore();
const router = useRouter();

const onRegister = async () => {
  try {
    const password = passwords.value[0].value;
    await authStore.register({
      username: username.value,
      password: password,
      email: email.value,
    });
    // Почему в username передается email? потому что vano - homo
    await authStore.login({ username: email.value, password: password });
    await authStore.getUserData();
    await router.push('/');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
</script>

<style scoped lang="scss"></style>
