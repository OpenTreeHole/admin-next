<script setup lang="ts">
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import { BasicPage } from '@/components/global-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSendMessageMutation } from '@/services/api/message.api'

const messageContent = ref('')
const recipientInput = ref('')
const sendMessageMutation = useSendMessageMutation()

const recipientIds = computed(() => {
  if (!recipientInput.value) {
    return []
  }

  return recipientInput.value
    .split(/[,，]/) // Support both English and Chinese commas
    .map(s => s.trim())
    .map(Number)
    .filter(n => !Number.isNaN(n) && n > 0)
})

async function handleSend() {
  if (!messageContent.value) {
    toast.error('请输入消息内容')
    return
  }

  try {
    await sendMessageMutation.mutateAsync({
      description: messageContent.value,
      recipients: recipientIds.value,
    })

    toast.success('消息发送成功')
    handleClear()
  }
  catch (error: any) {
    console.error(error)
    toast.error(error.message || '消息发送失败')
  }
}

function handleClear() {
  messageContent.value = ''
  recipientInput.value = ''
}

function handleScreenshotTemplate() {
  messageContent.value = `⚠️ WARNING: This is a system alert.

Please be advised that...

(Insert screenshot warning details here)`
}
</script>

<template>
  <BasicPage title="发送消息" description="向特定标签或全局发送消息" sticky>
    <div class="max-w-2xl space-y-6">
      <div class="space-y-2">
        <Label>接收者 (标签ID，逗号分隔)</Label>
        <Input v-model="recipientInput" placeholder="可选: 输入标签ID (例如 1, 2, 3)" />
        <p class="text-sm text-muted-foreground">
          留空则发送给所有人，或指定用逗号分隔的标签ID。
          <span v-if="recipientIds.length > 0" class="text-green-600">
            (将发送给 {{ recipientIds.length }} 个标签: {{ recipientIds.join(', ') }})
          </span>
        </p>
      </div>

      <div class="space-y-2">
        <Label>消息内容</Label>
        <Textarea
          v-model="messageContent"
          placeholder="在此输入消息..."
          rows="6"
        />
      </div>

      <div class="flex items-center space-x-4">
        <Button :disabled="sendMessageMutation.isPending.value" @click="handleSend">
          {{ sendMessageMutation.isPending.value ? '发送中...' : '发送' }}
        </Button>
        <Button variant="outline" @click="handleClear">
          清空
        </Button>
        <Button variant="secondary" @click="handleScreenshotTemplate">
          截图模板
        </Button>
      </div>
    </div>
  </BasicPage>
</template>

<route lang="yaml">
meta:
  auth: true
</route>
