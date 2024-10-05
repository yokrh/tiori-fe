<script setup lang="js">
import Shiori from '../components/Shiori.vue'

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

const shioriId = ref()

onMounted(() => {
  shioriId.value = route.params.id
})

</script>

<template>
  <main>
    <template v-if="shioriId">
      <Shiori :shiori-id="shioriId"/>
    </template>
  </main>
</template>
