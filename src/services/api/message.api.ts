import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/vue-query'

import { useAxios } from '@/composables/use-axios'

export interface ISendMessageRequest {
  description: string
  recipients: number[]
}

export function useSendMessageMutation() {
  const { axiosInstance } = useAxios('treehole')

  return useMutation<any, AxiosError, ISendMessageRequest>({
    mutationKey: ['useSendMessageMutation'],
    mutationFn: async (data: ISendMessageRequest) => {
      const response = await axiosInstance.post('/messages', data)
      return response.data
    },
  })
}
