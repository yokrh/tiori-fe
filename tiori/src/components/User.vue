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
      <el-input
        class="user-name-input"
        v-model="userNameInput"
        @change="onChangeUserNameInput"
        placeholder="新規の場合は、登録したいユーザー名を入力してください"
      />
      <a
        style="padding: 8px 16px; border: 2px solid hsla(150, 100%, 40%, 1); border-radius: 6px;"
        :href="`${bffBaseUrl}/v1/auth`">
        Googleでログイン <span v-show="userNameInput">（新規の場合 ユーザ名：{{userNameInput}} で登録されます）</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.user {
  & .user-name-input {
    margin-bottom: 16px;
    max-width: 50%;
    display: flex;
  }
}
</style>
