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
        v-model="login"
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
      <q-btn unelevated color="primary" class="full-width submit-button">
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
interface PasswordModel {
  value: string;
  type: 'password' | 'text';
}
const login: Ref<string> = ref('');
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
</script>

<style scoped lang="scss"></style>
