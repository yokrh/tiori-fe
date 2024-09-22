<script setup lang="ts">
import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

async function onClickCreateShiori() {
  const request = { title: 'Honeymoon :)' }
  const res = await bffClient.createShiori(userStore.user.uid, request)
  console.log(res)
}
</script>

<template>
  <div>
    <div v-if="userStore.user" @click="onClickCreateShiori">Create a shiori</div>
    <div v-else>Unknown user</div>
  </div>
</template>
