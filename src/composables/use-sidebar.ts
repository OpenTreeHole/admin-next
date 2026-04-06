import { LayoutDashboard, MessageSquare, Tags } from 'lucide-vue-next'

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
  ])

  return {
    navData,
  }
}
