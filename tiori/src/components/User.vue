<script setup lang="js">
import CookieKey from '@/CookieKey';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const userNameInput = ref()

const bffBaseUrl = import.meta.env.VITE_BFF_BASE_URL

function onChangeUserNameInput() {
  cookies.set(CookieKey.USER_NAME_INPUT, userNameInput.value)
}
</script>

<template>
  <div class="user">
    <div v-if="userStore.user">
      <el-card>{{ userStore.user.name }}さん のしおり</el-card>
    </div>

    <div v-else>
      <div>
        <div class="login-header">ログイン</div>
        <a
          style="padding: 8px 16px; border: 2px solid hsla(150, 100%, 40%, 1); border-radius: 6px;"
          :href="`${bffBaseUrl}/v1/auth`">
          Googleでログイン
        </a>
      </div>
      <div>
        <div class="registration-header">新規登録</div>
        <el-input
          class="user-name-input"
          v-model="userNameInput"
          @change="onChangeUserNameInput"
          placeholder="登録したいユーザー名を入力してください"
        />
        <a
          style="padding: 8px 16px; border: 2px solid hsla(150, 100%, 40%, 1); border-radius: 6px;"
          :href="`${bffBaseUrl}/v1/auth`">
          Google連携 <span v-show="userNameInput">（ユーザ名：{{userNameInput}} で登録されます）</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user {
  & .login-header {
    margin-bottom: 12px;
  }

  & .registration-header {
    margin: 40px 0 12px 0;
  }

  & .user-name-input {
    margin-bottom: 16px;
    max-width: 50%;
    display: flex;
  }
}
</style>
