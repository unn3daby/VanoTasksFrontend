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
        clearable
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
      <q-input
        clearable
        v-model="secondPassword.value"
        label="Повторите пароль"
        outlined
        :type="secondPassword.type"
      >
        <template #append>
          <q-icon
            :name="
              secondPassword.type === 'password' ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click="
              secondPassword.type === 'password'
                ? (secondPassword.type = 'text')
                : (secondPassword.type = 'password')
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
const login: Ref<string> = ref('');
const password: Ref<Record<string, 'password' | 'text'>> = ref({
  value: '',
  type: 'password',
});
const secondPassword: Ref<Record<string, 'password' | 'text'>> = ref({
  value: '',
  type: 'password',
});
const email: Ref<string> = ref('');
</script>

<style scoped lang="scss"></style>
