<script setup lang="js">
import { ref, onMounted, watch } from 'vue'

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const shioriList = ref([])

onMounted(async () => {
  await reloadShioriList()
})

watch(userStore, async() => {
  await reloadShioriList()
})

async function reloadShioriList() {
  if (!userStore.user) {
    shioriList.value = []
    return
  }

  const res = await bffClient.getShioriList(userStore.user.uid)
  shioriList.value = res.shioriList
}

async function onClickCreateShiori() {
  const request = { title: 'Honeymoon :)' } // dev
  await bffClient.createShiori(userStore.user.uid, request)
  await reloadShioriList()
}
</script>

<template>
  <div>
    <div>ShioriList</div>

    <div v-if="userStore.user">{{ userStore.user.name }}のしおり ({{ shioriList.length }})</div>

    <div v-if="shioriList && shioriList.length > 0" v-for="s in shioriList" :key="s.id">
      <RouterLink :to="`/shiori/${s.id}`">
        <div>{{ s.title }}</div>
      </RouterLink>
    </div>

    <div v-if="userStore.user" @click="onClickCreateShiori">Create a shiori</div>
    <div v-else>Unknown user</div>
  </div>
</template>
