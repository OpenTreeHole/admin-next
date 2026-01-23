import type { AxiosError } from 'axios'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { useAxios } from '@/composables/use-axios'

export interface ITag {
  id: number
  name: string
  temperature: number
  createdAt?: string
  updatedAt?: string
}

export interface ICreateTagRequest {
  name: string
}

export interface IMigrateTagRequest {
  id: number
  to: string
}

export function useGetTagsQuery() {
  const { axiosInstance } = useAxios('treehole')

  return useQuery<ITag[], AxiosError>({
    queryKey: ['useGetTagsQuery'],
    queryFn: async () => {
      const response = await axiosInstance.get('/tags')
      return response.data
    },
  })
}

export function useCreateTagMutation() {
  const { axiosInstance } = useAxios('treehole')
  const queryClient = useQueryClient()

  return useMutation<ITag, AxiosError, ICreateTagRequest>({
    mutationKey: ['useCreateTagMutation'],
    mutationFn: async (data: ICreateTagRequest) => {
      const response = await axiosInstance.post('/tags', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetTagsQuery'] })
    },
  })
}

export function useMigrateTagMutation() {
  const { axiosInstance } = useAxios('treehole')
  const queryClient = useQueryClient()

  return useMutation<any, AxiosError, IMigrateTagRequest>({
    mutationKey: ['useMigrateTagMutation'],
    mutationFn: async (data: IMigrateTagRequest) => {
      const response = await axiosInstance.delete(`/tags/${data.id}`, { data: { to: data.to } })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetTagsQuery'] })
    },
  })
}
