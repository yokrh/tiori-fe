<script setup lang="js">
import { onMounted, computed, watch } from 'vue'

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import BffClient from './client/BffClient'
const bffClient = new BffClient()

const isLogin = computed(() => cookies.get('JSESSIONID') != null)

onMounted(async () => {
  if (cookies.get('JSESSIONID')) await login()
})

async function login() {
  const request = { name: 'Oka Derick' } // dev

  userStore.user = await bffClient.createCustomer(request)
  console.log(`uid: ${userStore.user.uid}, name: ${userStore.user.name}`)
}

watch(() => route.query.logout, () => {
  if (route.query.logout && cookies.get('JSESSIONID')) {
    cookies.remove('JSESSIONID')
    userStore.user = null
    console.log('logout')

    router.push({ path: '/' })
  }
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/?logout=1" v-if="isLogin">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
