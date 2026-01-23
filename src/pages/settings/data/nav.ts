import { BellDot, Palette, PictureInPicture2, User, Wrench } from 'lucide-vue-next'

export const settingsNavItems = [
  { title: 'Profile', url: '/settings/', icon: User },
  { title: 'Account', url: '/settings/account', icon: Wrench },
  { title: 'Appearance', url: '/settings/appearance', icon: Palette },
  { title: 'Notifications', url: '/settings/notifications', icon: BellDot },
  { title: 'Display', url: '/settings/display', icon: PictureInPicture2 },
]
