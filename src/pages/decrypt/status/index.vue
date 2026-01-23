<script setup lang="ts">
import { ref } from 'vue'

import { BasicPage } from '@/components/global-layout'
import { useGetEmailQuery, useGetStatusQuery } from '@/services/api/shamir.api'

const userId = ref('')
const searchTrigger = ref('')

const { data: statusData, isLoading: isStatusLoading } = useGetStatusQuery(searchTrigger)
const { data: emailData, isLoading: isEmailLoading } = useGetEmailQuery(searchTrigger)

function handleSearch() {
  if (!userId.value)
    return
  searchTrigger.value = userId.value
}
</script>

<template>
  <BasicPage title="解密状态" description="检查解密流程的状态。">
    <div class="space-y-6 max-w-2xl">
      <div class="flex gap-2">
        <UiInput v-model="userId" placeholder="输入用户 ID..." @keyup.enter="handleSearch" />
        <UiButton :disabled="isStatusLoading || isEmailLoading" @click="handleSearch">
          {{ isStatusLoading || isEmailLoading ? '搜索中...' : '搜索' }}
        </UiButton>
      </div>

      <div v-if="statusData || emailData" class="grid gap-4 md:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>状态</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div v-if="statusData">
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">状态:</span>
                <UiBadge :variant="statusData.status === 'success' ? 'default' : 'secondary'">
                  {{ statusData.status }}
                </UiBadge>
              </div>

              <div class="space-y-2">
                <span class="text-muted-foreground block text-sm">参与者:</span>
                <ul v-if="statusData.participants && statusData.participants.length > 0" class="list-disc list-inside text-sm">
                  <li v-for="p in statusData.participants" :key="p">
                    {{ p }}
                  </li>
                </ul>
                <span v-else class="text-sm text-muted-foreground italic">暂无参与者。</span>
              </div>
            </div>
            <div v-else class="text-sm text-muted-foreground">
              暂无状态数据。
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>联系信息</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="emailData">
              <div class="flex flex-col gap-1">
                <span class="text-muted-foreground text-sm">邮箱</span>
                <span class="font-medium">{{ emailData.email }}</span>
              </div>
            </div>
            <div v-else class="text-sm text-muted-foreground">
              暂无邮箱数据。
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </BasicPage>
</template>

<route lang="yaml">
meta:
  title: Decrypt Status
</route>
