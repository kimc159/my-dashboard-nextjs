
import MemberManage from '@/components/pages/MemberManage'
import MemberMessage from '@/components/pages/MemberMessage'
import PointHistory from '@/components/pages/PointHistory'

export const MENU_CONFIG = {
  member: {
    label: '회원 관리',
    subMenus: [
      { label: '회원 관리', key: 'manage', component: MemberManage },
      { label: '문자 및 PUSH 발송', key: 'message', component: MemberMessage },
    ],
  },
  point: {
    label: '포인트 관리',
    subMenus: [
      { label: '포인트 이력', key: 'history', component: PointHistory },
    ],
  },
} as const

export type MainMenuKey = keyof typeof MENU_CONFIG
