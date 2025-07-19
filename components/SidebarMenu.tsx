'use client'

import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { MENU_CONFIG } from '@/libs/menus'

type SidebarProps = {
  mainMenuKey: keyof typeof MENU_CONFIG
  current: string
  onSelect: (key: string) => void
}

export function SidebarMenu({ mainMenuKey, current, onSelect }: SidebarProps) {
  const subMenus = MENU_CONFIG[mainMenuKey]?.subMenus ?? []

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          paddingTop: '64px', // topmenu 높이만큼 띄우기
        },
      }}
    >
      <List>
        <Typography variant="h6" sx={{ pl: 2, pt: 2 }}>
          {MENU_CONFIG[mainMenuKey]?.label}
        </Typography>
        {subMenus.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={current === item.key}
              onClick={() => onSelect(item.key)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
