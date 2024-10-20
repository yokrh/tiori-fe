<script setup lang="js">
import { ElMessageBox } from 'element-plus'

import { onMounted, computed, watch } from 'vue'

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import CookieKey from './CookieKey';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import BffClient from './client/BffClient'
const bffClient = new BffClient()

const isLogin = computed(() => cookies.get(CookieKey.JSESSION_ID) != null)

onMounted(async () => {
  if (cookies.get(CookieKey.JSESSION_ID)) await login()
})

watch(() => route.query.logout, () => {
  if (route.query.logout && cookies.get(CookieKey.JSESSION_ID)) {
    cookies.remove(CookieKey.JSESSION_ID)
    userStore.user = null
    console.log('logout')

    router.push({ path: '/' })
  }
})

async function login() {
  const username = cookies.get(CookieKey.USER_NAME_INPUT) ? cookies.get(CookieKey.USER_NAME_INPUT) : 'ゲスト'
  console.log(`username:`)
  console.log(username)
  const request = { name: username }

  const res = await bffClient.createCustomer(request)
  if (!res) {
    ElMessageBox.alert("ログインに失敗しました")
    return
  }
  userStore.user = res

  console.log(`uid: ${userStore.user.uid}, name: ${userStore.user.name}`)
  cookies.remove(CookieKey.USER_NAME_INPUT)
}

function logout() {
  location.reload()
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/?logout=1" v-if="isLogin" @click="logout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  padding: 12px 0;  
}
nav a {
  padding: 4px;
  margin-right: 16px;
}
@media (min-width: 1024px) {}
</style>
