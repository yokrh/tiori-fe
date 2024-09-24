<script setup lang="ts">
import { onMounted } from 'vue';

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const user = defineModel({ type: Object, default: null })

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies()

onMounted(() => {
  if (cookies.get('JSESSIONID')) {
    onClickLogin()
  }
})

function isGoogleLogin() {
  if (cookies.get('JSESSIONID')) return true
  else return false
}

async function onClickLogin() {
  const request = { name: 'Oka Derick' } // dev

  const res = await bffClient.createCustomer(request)
  userStore.setUser(res)
  console.log(`uid: ${res.uid}, name: ${res.name}`)
}
</script>

<template>
  <div>
    <div>User</div>
    <div v-if="isGoogleLogin()">
      <div v-if="userStore.user">
        <div>{{ userStore.user.name }}さん</div>
      </div>
      <div v-else>
        <div @click="onClickLogin">Login</div>
      </div>

    </div>
    <div v-else>
      <a href="http://localhost:8080/v1/auth">Google Auth</a>
    </div>
  </div>
</template>
