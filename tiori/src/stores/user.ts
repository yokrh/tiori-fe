import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  function setUser(userValue) {
    user.value = userValue
    console.log('user', userValue)
  }

  return { user, setUser }
})
