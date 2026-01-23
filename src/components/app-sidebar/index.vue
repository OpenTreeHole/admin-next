<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'

import { navMain } from './data/sidebar-data'
import NavFooter from './nav-footer.vue'
import NavTeam from './nav-team.vue'

const authStore = useAuthStore()
const { email } = storeToRefs(authStore)

const user = computed(() => {
  return {
    name: email.value || 'User',
    email: email.value || '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email.value || 'default'}`,
  }
})
</script>

<template>
  <UiSidebar collapsible="icon" class="z-50">
    <UiSidebarContent>
      <NavTeam :nav-main="navMain" />
    </UiSidebarContent>

    <UiSidebarFooter>
      <NavFooter :user="user" />
    </UiSidebarFooter>

    <UiSidebarRail />
  </UiSidebar>
</template>
