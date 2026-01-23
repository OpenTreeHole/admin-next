import type { AxiosError } from 'axios'

import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
// import env from '@/utils/env'

export function useAxios(type: 'auth' | 'treehole' = 'auth') {
  const authStore = useAuthStore()
  const axiosInstance = axios.create({
    baseURL: type === 'auth'
      ? import.meta.env.VITE_AUTH_API_URL
      : import.meta.env.VITE_TREEHOLE_API_URL,
    timeout: Number(import.meta.env.VITE_SERVER_API_TIMEOUT) || 10000,
  })

  axiosInstance.interceptors.request.use((config) => {
    const token = authStore.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    // if status is not 2xx, throw error
    // you can handle error here
    return Promise.reject(error)
  })

  return {
    axiosInstance,
  }
}
