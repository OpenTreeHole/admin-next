<script lang="ts" setup>
import { useGetTagsQuery } from '@/services/api/tag.api'

interface TagWithGrowth {
  id: number
  name: string
  temperature: number
  temperatureGrowth7d?: number
}

const { data } = useGetTagsQuery()

const growthTopTags = computed(() => {
  const tags = (data.value ?? []) as TagWithGrowth[]
  return [...tags]
    .filter(tag => typeof tag.temperatureGrowth7d === 'number')
    .sort((a, b) => (b.temperatureGrowth7d ?? 0) - (a.temperatureGrowth7d ?? 0))
    .slice(0, 5)
})

function formatGrowth(value?: number) {
  if (typeof value !== 'number')
    return '--'
  return value >= 0 ? `+${value}` : `${value}`
}
</script>

<template>
  <div class="space-y-8">
    <div v-if="growthTopTags.length === 0" class="text-sm text-muted-foreground">
      暂无近 7 天热度增长数据
    </div>
    <div v-for="item in growthTopTags" :key="item.id" class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full bg-primary" />
        <div class="flex flex-1 flex-col">
          <div class="flex justify-between">
            <span class="text-sm font-medium">{{ item.name }}</span>
            <span class="text-sm font-medium">{{ formatGrowth(item.temperatureGrowth7d) }}</span>
          </div>
          <span class="text-xs text-muted-foreground">
            近 7 天热度增长（当前热度 {{ item.temperature }}）
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
