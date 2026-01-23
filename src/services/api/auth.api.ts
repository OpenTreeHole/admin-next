import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/vue-query'

import { useAxios } from '@/composables/use-axios'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  access: string
  refresh: string
  message: string
}

export function useLoginMutation() {
  const { axiosInstance } = useAxios('auth')

  return useMutation<ILoginResponse, AxiosError, ILoginRequest>({
    mutationKey: ['useLoginMutation'],
    mutationFn: async (data: ILoginRequest) => {
      const response = await axiosInstance.post('/login', data)
      return response.data
    },
  })
}
