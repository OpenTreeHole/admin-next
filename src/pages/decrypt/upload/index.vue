<script setup lang="ts">
import * as openpgp from 'openpgp'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

import { BasicPage } from '@/components/global-layout'
import { useAxios } from '@/composables/use-axios'
import { useDecryptMutation } from '@/services/api/shamir.api'

const activeTab = ref('manual')

// Manual Mode State
const manualUserId = ref('')
const manualIdentityName = ref('')
const cipherText = ref('')
const shareText = ref('')

// Auto Mode State
const autoUserId = ref('')
const keyPassword = ref('')
const keyFileContent = ref('')

const { axiosInstance } = useAxios()
const { mutate: uploadShare, isPending: isUploading } = useDecryptMutation()

// Manual: Get Cipher
async function getCipher() {
  if (!manualUserId.value) {
    toast.error('请输入用户 ID')
    return
  }
  try {
    const response = await axiosInstance.get(`/shamir/${manualUserId.value}`)
    cipherText.value = response.data.pgp_message
    toast.success('获取密文成功')
  }
  catch (error) {
    console.error(error)
    toast.error('获取密文失败')
  }
}

// Manual: Copy Cipher
async function copyCipher() {
  if (!cipherText.value)
    return
  try {
    await navigator.clipboard.writeText(cipherText.value)
    toast.success('密文已复制到剪贴板')
  }
  catch {
    toast.error('复制失败')
  }
}

// Manual: Upload
function handleManualUpload() {
  if (!shareText.value) {
    toast.error('请输入分片内容')
    return
  }
  if (!manualUserId.value || !manualIdentityName.value) {
    toast.error('请输入用户 ID 和身份名称')
    return
  }

  uploadShare({
    user_id: manualUserId.value,
    identity_name: manualIdentityName.value,
    share: shareText.value,
  }, {
    onSuccess: () => {
      toast.success('分片上传成功')
      shareText.value = ''
    },
    onError: () => {
      toast.error('分片上传失败')
    },
  })
}

// Auto: File Handling
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      keyFileContent.value = e.target?.result as string
    }
    reader.readAsText(target.files[0])
  }
}

// Auto: Decrypt & Upload
async function handleAutoDecrypt() {
  if (!autoUserId.value || !keyFileContent.value || !keyPassword.value) {
    toast.error('请提供用户 ID、私钥文件和密码')
    return
  }

  try {
    // 1. Get Cipher (using Auto User ID)
    const privateKey = await openpgp.readPrivateKey({ armoredKey: keyFileContent.value })
    // Get Identity Name from key
    const userIds = privateKey.users.map(u => u.userID?.name || u.userID?.email || '').filter(Boolean)
    const identityName = userIds[0] // Taking the first one

    if (!identityName) {
      toast.error('无法从私钥中提取身份信息')
      return
    }

    const response = await axiosInstance.get(`/shamir/${autoUserId.value}`)
    const message = response.data.pgp_message

    // 2. Decrypt
    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: message }),
      decryptionKeys: await openpgp.decryptKey({
        privateKey,
        passphrase: keyPassword.value,
      }),
    })

    const share = decrypted.data as string

    // 3. Upload
    uploadShare({
      user_id: autoUserId.value,
      identity_name: identityName,
      share,
    }, {
      onSuccess: () => {
        toast.success('解密并上传成功')
      },
      onError: () => {
        toast.error('分片上传失败')
      },
    })
  }
  catch (error) {
    console.error(error)
    toast.error('解密或上传失败')
  }
}
</script>

<template>
  <BasicPage title="解密 & 上传" description="手动上传分片或使用私钥自动解密。">
    <UiTabs v-model="activeTab" default-value="manual" class="w-full max-w-2xl mx-auto">
      <UiTabsList class="grid w-full grid-cols-2">
        <UiTabsTrigger value="manual">
          手动
        </UiTabsTrigger>
        <UiTabsTrigger value="auto">
          自动
        </UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="manual">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>手动上传</UiCardTitle>
            <UiCardDescription>获取密文，自行解密并上传分片。</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <UiLabel for="manual-user-id">
                  用户 ID
                </UiLabel>
                <UiInput id="manual-user-id" v-model="manualUserId" placeholder="请输入用户 ID" />
              </div>
              <div class="space-y-2">
                <UiLabel for="manual-identity">
                  身份名称
                </UiLabel>
                <UiInput id="manual-identity" v-model="manualIdentityName" placeholder="请输入身份名称" />
              </div>
            </div>

            <div class="flex gap-2">
              <UiButton @click="getCipher">
                获取密文
              </UiButton>
              <UiButton variant="outline" :disabled="!cipherText" @click="copyCipher">
                复制密文
              </UiButton>
            </div>

            <div v-if="cipherText" class="space-y-2">
              <UiLabel>
                密文内容
              </UiLabel>
              <UiTextarea v-model="cipherText" readonly rows="5" class="font-mono text-xs" />
            </div>

            <div class="space-y-2">
              <UiLabel for="share-text">
                分片内容
              </UiLabel>
              <UiTextarea id="share-text" v-model="shareText" placeholder="在此粘贴解密后的分片..." rows="4" />
            </div>

            <UiButton class="w-full" :disabled="isUploading" @click="handleManualUpload">
              {{ isUploading ? '上传中...' : '上传' }}
            </UiButton>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="auto">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>自动解密</UiCardTitle>
            <UiCardDescription>提供私钥以自动解密并上传。</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="auto-user-id">
                用户 ID
              </UiLabel>
              <UiInput id="auto-user-id" v-model="autoUserId" placeholder="请输入用户 ID" />
            </div>

            <div class="space-y-2">
              <UiLabel for="key-file">
                私钥文件
              </UiLabel>
              <UiInput id="key-file" type="file" @change="handleFileUpload" />
            </div>

            <div class="space-y-2">
              <UiLabel for="key-password">
                密钥密码
              </UiLabel>
              <UiInput id="key-password" v-model="keyPassword" type="password" placeholder="请输入密钥密码" />
            </div>

            <UiButton class="w-full" :disabled="isUploading" @click="handleAutoDecrypt">
              {{ isUploading ? '处理中...' : '解密 & 上传' }}
            </UiButton>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </BasicPage>
</template>

<route lang="yaml">
meta:
  title: Decrypt Upload
</route>
