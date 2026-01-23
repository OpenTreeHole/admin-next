<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

import { BasicPage } from '@/components/global-layout'
import { useGetHistoryQuery } from '@/services/api/shamir.api'

const identityName = ref('')
const searchTrigger = ref('')

// Pass the ref directly so it's reactive
const { data: historyData, isLoading } = useGetHistoryQuery(searchTrigger)

function handleSearch() {
  searchTrigger.value = identityName.value
}
</script>

<template>
  <BasicPage title="解密历史" description="查看历史解密记录。">
    <div class="space-y-4">
      <div class="flex gap-2 max-w-sm">
        <UiInput v-model="identityName" placeholder="按身份名称搜索..." @keyup.enter="handleSearch" />
        <UiButton @click="handleSearch">
          搜索
        </UiButton>
      </div>

      <UiCard>
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>用户 ID</UiTableHead>
              <UiTableHead>PGP 消息</UiTableHead>
              <UiTableHead>身份名称</UiTableHead>
              <UiTableHead>创建时间</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-if="isLoading">
              <UiTableCell colspan="4" class="text-center py-4">
                加载中...
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-else-if="!historyData || historyData.length === 0">
              <UiTableCell colspan="4" class="text-center py-4">
                暂无历史记录。
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-for="item in historyData" :key="item.created_at + item.user_id">
              <UiTableCell>{{ item.user_id }}</UiTableCell>
              <UiTableCell class="max-w-xs truncate" :title="item.pgp_message">
                {{ item.pgp_message }}
              </UiTableCell>
              <UiTableCell>{{ item.identity_name }}</UiTableCell>
              <UiTableCell>{{ dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}</UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCard>
    </div>
  </BasicPage>
</template>

<route lang="yaml">
meta:
  title: Decrypt History
</route>
