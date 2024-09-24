<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const props = defineProps({
//   user: { type: Object, default: null },
// })

const shioriList = ref([])

onMounted(async () => {
  if (!userStore.user) return

  bffClient.getShioriList(userStore.user.uid).then((res) => shioriList.value = res.shioriList)
})

watch(userStore, async() => {
  bffClient.getShioriList(userStore.user.uid).then((res) => shioriList.value = res.shioriList)
})

</script>

<template>
  <div>
    <div>ShioriList</div>
    <div v-if="userStore.user">{{ userStore.user.name }}のしおり ({{ shioriList.length }})</div>
    <div v-if="shioriList && shioriList.length > 0" v-for="s in shioriList" :key="s.id">
      <div>{{ s.title }}</div>
    </div>
  </div>
</template>
