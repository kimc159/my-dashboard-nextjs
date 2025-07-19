
import { MENU_CONFIG, MainMenuKey } from '@/libs/menus'

type Props = {
  main: MainMenuKey
  sub: string
}

export default function ContentView({ main, sub }: Props) {
  const subMenu = MENU_CONFIG[main].subMenus.find((m) => m.key === sub)
  if (!subMenu) return <div>❓ 메뉴가 존재하지 않습니다.</div>
  const Component = subMenu.component
  return <Component />
}
