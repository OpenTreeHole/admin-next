<script lang="ts" setup>
import { useAuth } from '@/composables/use-auth'

import PrivacyPolicyButton from './privacy-policy-button.vue'
import TermsOfServiceButton from './terms-of-service-button.vue'
import ToForgotPasswordLink from './to-forgot-password-link.vue'

const { login, loading } = useAuth()

const email = ref('')
const password = ref('')
</script>

<template>
  <UiCard class="w-full max-w-sm">
    <UiCardHeader>
      <UiCardTitle class="text-2xl">
        登录
      </UiCardTitle>
      <UiCardDescription>
        请输入您的邮箱和密码以登录您的账户
        还没有账号？
        <UiButton
          variant="link" class="px-0 text-muted-foreground"
          @click="$router.push('/auth/sign-up')"
        >
          注册
        </UiButton>
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="grid gap-4">
      <div class="grid gap-2">
        <UiLabel for="email">
          邮箱
        </UiLabel>
        <UiInput id="email" v-model="email" type="email" placeholder="m@example.com" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <UiLabel for="password">
            密码
          </UiLabel>
          <ToForgotPasswordLink />
        </div>
        <UiInput id="password" v-model="password" type="password" required placeholder="*********" />
      </div>

      <UiButton class="w-full" @click="login(email, password)">
        <UiSpinner v-if="loading" class="mr-2" />
        登录
      </UiButton>

      <UiCardDescription>
        点击登录即表示您同意我们的
        <TermsOfServiceButton />
        和
        <PrivacyPolicyButton />
      </UiCardDescription>
    </UiCardContent>
  </UiCard>
</template>
