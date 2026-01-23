import { Activity, History, LayoutDashboard, MessageSquare, Tags, Upload } from 'lucide-vue-next'

import type { NavGroup } from '@/components/app-sidebar/types'

export function useSidebar() {
  const navData = ref<NavGroup[]>([
    {
      title: 'General',
      items: [
        { title: '首页', url: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: '茶楼',
      items: [
        { title: '标签管理', url: '/treehole/tag', icon: Tags },
        { title: '站内信', url: '/treehole/message', icon: MessageSquare },
      ],
    },
    {
      title: '解密',
      items: [
        { title: '上传/解密', url: '/decrypt/upload', icon: Upload },
        { title: '历史记录', url: '/decrypt/history', icon: History },
        { title: '状态查询', url: '/decrypt/status', icon: Activity },
      ],
    },
  ])

  return {
    navData,
  }
}
