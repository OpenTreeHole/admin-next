import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'

import { useLoginMutation } from '@/services/api/auth.api'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const router = useRouter()

  const authStore = useAuthStore()
  const { isLogin } = storeToRefs(authStore)
  const { mutateAsync: loginMutation, isPending: loading } = useLoginMutation()

  function logout() {
    isLogin.value = false

    router.push({ path: '/auth/sign-in' })
  }

  function toHome() {
    router.push({ path: '/dashboard' })
  }

  async function login(email: string, password: string) {
    try {
      const res = await loginMutation({ email, password })
      if (res.access) {
        authStore.setToken(res.access, res.refresh)
        authStore.setEmail(email)
        toast.success(res.message || 'Login successful')

        const redirect = router.currentRoute.value.query.redirect as string
        if (!redirect || redirect.startsWith('//')) {
          toHome()
        }
        else {
          router.push(redirect)
        }
      }
    }
    catch (e) {
      // handle error
      console.error(e)
    }
  }

  return {
    loading,
    logout,
    login,
  }
}
