<script setup lang="ts">
import { onMounted, computed } from 'vue';

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const isLogin = defineModel({ type: Boolean, default: false })

import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

onMounted(() => {
  if (cookies.get('JSESSIONID')) {
    login()
  }
})

async function login() {
  const request = { name: 'Oka Derick' } // dev

  const user = await bffClient.createCustomer(request)
  userStore.user = user
  console.log(`uid: ${user.uid}, name: ${user.name}`)
}
</script>

<template>
  <div>
    <div>User</div>

    <div v-if="userStore.user">
      <div>{{ userStore.user.name }}さん</div>
    </div>

    <div v-else>
      <a href="http://localhost:8080/v1/auth">Google Auth</a>
    </div>
  </div>
</template>
