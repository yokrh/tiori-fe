import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  function printUser() {
    console.log('user', user.value)
  }

  return { user, printUser }
})
