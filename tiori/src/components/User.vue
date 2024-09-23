<script setup lang="ts">
import { onMounted } from 'vue';

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const user = defineModel({ type: Object, default: null })

async function onClickCreateUser() {
  const request = { name: 'Oka Derick' }
  const res = await bffClient.createCustomer(request)
  userStore.setUser(res)
}
</script>

<template>
  <div>
    User
    <div v-if="userStore.user">
      <div>name: {{ userStore.user.name }}</div>
      <div>id: {{ userStore.user.uid }}</div>
    </div>
    <div v-else>
      <div @click="onClickCreateUser">Create a user</div>
    </div>
    <br/>
    <div><a href="http://localhost:8080/v1/auth">auth</a></div>
    <div><a href="http://localhost:8080/v1/auth/check">auth check</a></div>
  </div>
</template>
