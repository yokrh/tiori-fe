<script setup lang="js">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const isLogin = defineModel({ type: Boolean, default: false })

import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

const bffBaseUrl = import.meta.env.VITE_BFF_BASE_URL
</script>

<template>
  <div>
    <div>User</div>

    <div v-if="userStore.user">
      <div>{{ userStore.user.name }}さん</div>
    </div>

    <div v-else>
      <a :href="`${bffBaseUrl}/v1/auth`">Google Auth</a>
    </div>
  </div>
</template>
