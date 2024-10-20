<script setup lang="js">
import User from '../components/User.vue'
import ShioriList from '../components/ShioriList.vue'
</script>

<template>
  <main class="home">
    <User class="user"/>
    <ShioriList class="shiori-list"/>
  </main>
</template>

<style scoped>
.user {
  margin-bottom: 20px;
}
</style>