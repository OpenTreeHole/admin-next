<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

import { BasicPage } from '@/components/global-layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCreateTagMutation, useGetTagsQuery, useMigrateTagMutation } from '@/services/api/tag.api'

const searchQuery = ref('')
const migrateDialogOpen = ref(false)
const migrateTargetTagName = ref('')
const selectedTagId = ref<number | null>(null)

const currentPage = ref(1)
const pageSize = ref(20)

const { data: tagsResponse, isLoading } = useGetTagsQuery()
const migrateTagMutation = useMigrateTagMutation()
const createTagMutation = useCreateTagMutation()

const filteredTags = computed(() => {
  const tags = tagsResponse.value || []
  if (!searchQuery.value) {
    return tags
  }
  try {
    const regex = new RegExp(searchQuery.value, 'i')
    return tags.filter(tag => regex.test(tag.name))
  }
  catch {
    return tags
  }
})

const totalItems = computed(() => filteredTags.value.length)

const paginatedTags = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredTags.value.slice(start, end)
})

watch(searchQuery, () => {
  currentPage.value = 1
})

function openMigrateDialog(tagId: number) {
  selectedTagId.value = tagId
  migrateTargetTagName.value = ''
  migrateDialogOpen.value = true
}

async function handleMigrate() {
  if (!selectedTagId.value || !migrateTargetTagName.value) {
    toast.error('请输入目标标签名称')
    return
  }

  try {
    const targetTagExists = tagsResponse.value?.some(
      tag => tag.name === migrateTargetTagName.value,
    )

    if (!targetTagExists) {
      await createTagMutation.mutateAsync({
        name: migrateTargetTagName.value,
      })
    }

    await migrateTagMutation.mutateAsync({
      id: selectedTagId.value,
      to: migrateTargetTagName.value,
    })

    toast.success('迁移成功')
    migrateDialogOpen.value = false
  }
  catch (error: any) {
    console.error(error)
    toast.error(error.message || '迁移失败')
  }
}
</script>

<template>
  <BasicPage title="标签管理" description="管理树洞标签" sticky>
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <Input
          v-model="searchQuery"
          placeholder="搜索标签 (正则)..."
          class="max-w-sm"
        />
      </div>

      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>热度</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="isLoading">
              <TableRow>
                <TableCell colspan="4" class="h-24 text-center">
                  加载中...
                </TableCell>
              </TableRow>
            </template>
            <template v-else-if="paginatedTags.length > 0">
              <TableRow v-for="tag in paginatedTags" :key="tag.id">
                <TableCell>{{ tag.id }}</TableCell>
                <TableCell>{{ tag.name }}</TableCell>
                <TableCell>{{ tag.temperature }}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" @click="openMigrateDialog(tag.id)">
                    迁移
                  </Button>
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell colspan="4" class="h-24 text-center">
                  无结果
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>

      <div class="flex items-center justify-between">
        <div v-if="totalItems > 0" class="text-sm text-muted-foreground">
          {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }}
        </div>
        <div v-else class="text-sm text-muted-foreground">
          0 of 0
        </div>
        <Pagination
          v-model:page="currentPage"
          :total="totalItems"
          :sibling-count="1"
          :show-edges="true"
          :items-per-page="pageSize"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationFirst />
            <PaginationPrevious />
            <template v-for="(item, index) in items">
              <PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value">
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
            <PaginationNext />
            <PaginationLast />
          </PaginationContent>
        </Pagination>
      </div>
    </div>

    <Dialog v-model:open="migrateDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>迁移标签</DialogTitle>
          <DialogDescription>
            将选中标签下的所有帖子迁移到另一个标签。如果目标标签不存在，将会自动创建。
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Input v-model="migrateTargetTagName" placeholder="目标标签名称" />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="migrateDialogOpen = false">
            取消
          </Button>
          <Button
            :disabled="migrateTagMutation.isPending.value || createTagMutation.isPending.value"
            @click="handleMigrate"
          >
            {{ migrateTagMutation.isPending.value || createTagMutation.isPending.value ? '处理中...' : '迁移' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </BasicPage>
</template>

<route lang="yaml">
meta:
  auth: true
</route>
