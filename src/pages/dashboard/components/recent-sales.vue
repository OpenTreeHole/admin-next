<script lang="ts" setup>
interface Tag {
  name: string
  count: number
  percent: string
}

const list = ref<Tag[]>([
  { name: '表白墙', count: 28, percent: '+12%' },
  { name: '提问', count: 22, percent: '+8%' },
  { name: '二手交易', count: 18, percent: '+5%' },
  { name: '吐槽', count: 15, percent: '-3%' },
  { name: '学习', count: 10, percent: '+2%' },
])
</script>

<template>
  <div class="space-y-8">
    <div v-for="item in list" :key="item.name" class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full bg-primary" />
        <div class="flex flex-1 flex-col">
          <div class="flex justify-between">
            <span class="text-sm font-medium">{{ item.name }}</span>
            <span class="text-sm font-medium">{{ item.count }}</span>
          </div>
          <span class="text-xs text-muted-foreground">
            使用次数 {{ item.percent }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
