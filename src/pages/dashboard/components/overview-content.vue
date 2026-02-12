<script lang="ts" setup>
import { useRouter } from 'vue-router'

import OverviewChart from './overview-chart.vue'
import RecentSales from './recent-sales.vue'

const router = useRouter()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <UiCard class="cursor-pointer transition-colors hover:bg-muted/50" @click="router.push('/treehole/tag/')">
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          标签管理
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">
          管理标签
        </div>
        <p class="text-xs text-muted-foreground">
          查看和管理树洞标签
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard class="cursor-pointer transition-colors hover:bg-muted/50" @click="router.push('/treehole/message/')">
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          站内信
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
          <path d="m3 14 2.5-2 1.5 1.5 3-3 5.5 5.5" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">
          发送消息
        </div>
        <p class="text-xs text-muted-foreground">
          向用户发送站内信
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard class="cursor-pointer transition-colors hover:bg-muted/50" @click="router.push('/decrypt/upload/')">
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          解密
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">
          上传/解密
        </div>
        <p class="text-xs text-muted-foreground">
          安全地解密您的数据
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard class="cursor-pointer transition-colors hover:bg-muted/50" @click="router.push('/decrypt/history/')">
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium">
          历史记录
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <path d="M3 3v5h5" />
          <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
          <path d="M12 7v5l4 2" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">
          查看历史
        </div>
        <p class="text-xs text-muted-foreground">
          解密历史记录
        </p>
      </UiCardContent>
    </UiCard>
  </div>

  <div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-7">
    <OverviewChart class="col-span-1 lg:col-span-4" />
    <UiCard class="col-span-1 lg:col-span-3">
      <UiCardHeader>
        <UiCardTitle>热门标签排行</UiCardTitle>
        <UiCardDescription>
          最近使用频率最高的标签。
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <RecentSales />
      </UiCardContent>
    </UiCard>
  </div>
</template>
