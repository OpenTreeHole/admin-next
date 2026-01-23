import type { AxiosError } from 'axios'
import type { Ref } from 'vue'

import { useMutation, useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

import { useAxios } from '@/composables/use-axios'

type MaybeRef<T> = T | Ref<T>

export interface IPgpMessageResponse {
  pgp_message: string
}

export interface IDecryptRequest {
  user_id: string
  identity_name: string
  share: string
}

export interface IHistoryItem {
  user_id: string
  pgp_message: string
  identity_name: string
  created_at: string
}

export interface IStatusResponse {
  status: string
  participants: string[]
  email: string
}

export function useGetPgpMessageQuery(userId: MaybeRef<string>) {
  const { axiosInstance } = useAxios('auth')

  return useQuery<IPgpMessageResponse, AxiosError>({
    queryKey: ['useGetPgpMessageQuery', userId],
    queryFn: async () => {
      const id = unref(userId)
      const response = await axiosInstance.get(`/shamir/${id}`)
      return response.data
    },
    enabled: () => !!unref(userId),
  })
}

export function useDecryptMutation() {
  const { axiosInstance } = useAxios('auth')

  return useMutation<any, AxiosError, IDecryptRequest>({
    mutationKey: ['useDecryptMutation'],
    mutationFn: async (data: IDecryptRequest) => {
      const response = await axiosInstance.post('/shamir/decrypt', data)
      return response.data
    },
  })
}

export function useGetHistoryQuery(identityName: MaybeRef<string>) {
  const { axiosInstance } = useAxios('auth')

  return useQuery<IHistoryItem[], AxiosError>({
    queryKey: ['useGetHistoryQuery', identityName],
    queryFn: async () => {
      const name = unref(identityName)
      const response = await axiosInstance.get('/shamir', {
        params: { identity_name: name },
      })
      return response.data
    },
  })
}

export function useGetStatusQuery(userId: MaybeRef<string>) {
  const { axiosInstance } = useAxios('auth')

  return useQuery<IStatusResponse, AxiosError>({
    queryKey: ['useGetStatusQuery', userId],
    queryFn: async () => {
      const id = unref(userId)
      const response = await axiosInstance.get(`/shamir/decrypt/status/${id}`)
      return response.data
    },
    enabled: () => !!unref(userId),
  })
}

export function useGetEmailQuery(userId: MaybeRef<string>) {
  const { axiosInstance } = useAxios('auth')

  return useQuery<{ email: string }, AxiosError>({
    queryKey: ['useGetEmailQuery', userId],
    queryFn: async () => {
      const id = unref(userId)
      const response = await axiosInstance.get(`/shamir/decrypt/${id}`)
      return response.data
    },
    enabled: () => !!unref(userId),
  })
}
