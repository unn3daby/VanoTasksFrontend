<template>
  <q-card flat bordered class="auth-card">
    <q-card-section>
      <h3 class="q-ma-none text-bold title">Вход в аккаунт</h3>
    </q-card-section>
    <q-card-section class="q-pt-none">
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
const login: Ref<string> = ref('');
const password: Ref<Record<string, 'password' | 'text'>> = ref({
  value: '',
  type: 'password',
});
</script>

<style scoped lang="scss"></style>
