'use client'

import { useState } from 'react'
import { TopMenu } from '@/components/TopMenu'
import Footer from '@/components/Footer'
import ContentView from '@/components/ContentView'
import { MENU_CONFIG, MainMenuKey } from '@/libs/menus'
import { Box, Tabs, Tab } from '@mui/material'
import { SidebarMenu } from '@/components/SidebarMenu'

type TabInfo = {
  mainMenu: MainMenuKey
  subMenuKey: string
  label: string
  id: string // unique id, 예: `${mainMenu}_${subMenuKey}`
}

export default function HomePage() {
  const [mainMenu, setMainMenu] = useState<MainMenuKey>('member')
  const [subMenuKey, setSubMenuKey] = useState<string>(MENU_CONFIG['member'].subMenus[0].key)

  // 열려있는 탭들 상태
  const [tabs, setTabs] = useState<TabInfo[]>([
    {
      mainMenu: 'member',
      subMenuKey: MENU_CONFIG['member'].subMenus[0].key,
      label: MENU_CONFIG['member'].subMenus[0].label,
      id: `member_${MENU_CONFIG['member'].subMenus[0].key}`,
    },
  ])

  // 현재 선택된 탭 id
  const [currentTabId, setCurrentTabId] = useState(tabs[0].id)

  // 사이드바 메뉴 클릭 시 탭 추가 or 선택 처리
  function handleMenuSelect(mainKey: MainMenuKey, subKey: string) { 
    const id = `${mainKey}_${subKey}`
    const existingTab = tabs.find((tab) => tab.id === id)
    if (!existingTab) {
      const label = MENU_CONFIG[mainKey].subMenus.find((item) => item.key === subKey)?.label || ''
      const newTab = { mainMenu: mainKey, subMenuKey: subKey, label, id }
      setTabs((prev) => [...prev, newTab])
    }
    setCurrentTabId(id)
    setMainMenu(mainKey)
    setSubMenuKey(subKey)
  }

  // 탭 클릭 변경
  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setCurrentTabId(newValue)
    const [mainKey, subKey] = newValue.split('_') as [MainMenuKey, string]
    setMainMenu(mainKey)
    setSubMenuKey(subKey)
  }

  // 탭 닫기 버튼 클릭
  function handleTabClose(event: React.MouseEvent, tabId: string) {
    event.stopPropagation() // 클릭 이벤트 버블링 방지
    setTabs((prev) => {
      const filtered = prev.filter((tab) => tab.id !== tabId)
      if (filtered.length === 0) {
        // 탭 다 닫히면 기본 탭 다시 열기
        const defaultMain = 'member' as MainMenuKey
        const defaultSub = MENU_CONFIG[defaultMain].subMenus[0].key
        setCurrentTabId(`${defaultMain}_${defaultSub}`)
        setMainMenu(defaultMain)
        setSubMenuKey(defaultSub)
        return [
          {
            mainMenu: defaultMain,
            subMenuKey: defaultSub,
            label: MENU_CONFIG[defaultMain].subMenus[0].label,
            id: `${defaultMain}_${defaultSub}`,
          },
        ]
      }
      // 현재 선택 탭 닫을 경우, 앞 탭으로 이동
      if (tabId === currentTabId) {
        const closedIndex = prev.findIndex((tab) => tab.id === tabId)
        const newCurrent =
          filtered[closedIndex - 1]?.id || filtered[0]?.id || ''
        setCurrentTabId(newCurrent)
        const [mainKey, subKey] = newCurrent.split('_') as [MainMenuKey, string]
        setMainMenu(mainKey)
        setSubMenuKey(subKey)
      }
      return filtered
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <TopMenu
        current={mainMenu}
        onSelect={(key) => {
          const firstSub = MENU_CONFIG[key].subMenus[0].key
          handleMenuSelect(key, firstSub)
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu mainMenuKey={mainMenu} current={subMenuKey} onSelect={(subKey) => {
          handleMenuSelect(mainMenu, subKey)
        }} />
        <Box className="flex-1 flex flex-col" sx={{ overflow: 'hidden' , pt: '64px' }}>
          <Tabs
            value={currentTabId}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
          >
            {tabs.map((tab) => (
                  <Tab
              key={tab.id}
              value={tab.id}
              label={
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {tab.label}
                  <span
                    onClick={(e) => handleTabClose(e as any, tab.id)}
                    style={{ cursor: 'pointer', color: '#aaa' }}
                  >
                    ×
                  </span>
                </span>
              }
              sx={{ position: 'relative', pr: 5 }} // 오른쪽 여백 확보
            />
            ))}
          </Tabs>

          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, bgcolor: '#f9fafb' }}>
            {/* 현재 탭에 맞는 콘텐츠 렌더 */}
            {tabs.map(
              (tab) =>
                tab.id === currentTabId && (
                  <ContentView
                    key={tab.id}
                    main={tab.mainMenu}
                    sub={tab.subMenuKey}
                  />
                )
            )}
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  )
}