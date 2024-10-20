<script setup lang="js">
import { ref, onMounted, watch } from 'vue'

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const shioriList = ref([])
const newShioriTitle = ref()

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
  const request = { title: newShioriTitle.value }
  await bffClient.createShiori(userStore.user.uid, request)
  await reloadShioriList()
}
</script>

<template>
  <div class="shiori-list">
    <el-card v-if="userStore.user">
      <div class="list-container">
        <template v-if="shioriList && shioriList.length > 0">
          <RouterLink v-for="s in shioriList" :key="s.id" :to="`/shiori/${s.id}`">
            <el-card shadow="hover">{{ s.title }}</el-card>
          </RouterLink>
        </template>
        <div v-else>しおりはありません</div>
      </div>
  
      <el-input class="new-shiori-title" v-model="newShioriTitle" placeholder="新しいしおりのタイトル" />
      <el-button
        class="create-shiori" 
        type="primary"
        @click="onClickCreateShiori">
        しおりを作成する
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.shiori-list {
  min-height: 120px;

  & .list-container {
    margin-bottom: 40px;
  }

  & .new-shiori-title {
    margin-bottom: 8px;
    max-width: 50%;
    display: flex;
  }

  & .create-shiori {
    margin-bottom: 20px;
  }
}
</style>
