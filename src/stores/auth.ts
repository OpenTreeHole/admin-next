import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const email = ref<string | null>(null)

  function setToken(token: string, refresh: string) {
    accessToken.value = token
    refreshToken.value = refresh
    isLogin.value = true
  }

  function setEmail(newEmail: string) {
    email.value = newEmail
  }

  function clearToken() {
    accessToken.value = null
    refreshToken.value = null
    email.value = null
    isLogin.value = false
  }

  return {
    isLogin,
    accessToken,
    refreshToken,
    email,
    setToken,
    setEmail,
    clearToken,
  }
}, {
  persist: true,
})
