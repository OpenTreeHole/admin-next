<script lang="ts" setup>
import { BasicPage } from '@/components/global-layout'

import OverviewContent from './components/overview-content.vue'
</script>

<template>
  <BasicPage
    title="首页"
    description="这里是您的个人工作台"
    sticky
  >
    <OverviewContent />
  </BasicPage>
</template>
