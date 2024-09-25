<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const isLogin = computed(() => cookies.get('JSESSIONID') != null)

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
