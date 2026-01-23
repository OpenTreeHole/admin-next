import { useSidebar } from '@/composables/use-sidebar'

const { navData } = useSidebar()

export const navMain = navData.value!
