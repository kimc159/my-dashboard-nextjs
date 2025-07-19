'use client'

import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { MENU_CONFIG, MainMenuKey } from '@/libs/menus'

type TopMenuProps = {
  current: MainMenuKey
  onSelect: (key: MainMenuKey) => void
}

export function TopMenu({ current, onSelect }: TopMenuProps) {
  return (
    <AppBar
      position="fixed" // fixed로 변경
      sx={{
        width: `calc(100% - 240px)`, // 사이드바 너비만큼 빼기
        ml: '240px', // 왼쪽 여백 주기
        bgcolor: '#0d47a1',
        zIndex: (theme) => theme.zIndex.drawer + 1, // Drawer 위에 보이도록 zIndex 조절
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {Object.entries(MENU_CONFIG).map(([key, menu]) => (
            <Button
              key={key}
              onClick={() => onSelect(key as MainMenuKey)}
              sx={{
                color: '#fff',
                borderBottom: current === key ? '2px solid #fff' : 'none',
                fontWeight: current === key ? 'bold' : 'normal',
              }}
            >
              {menu.label}
            </Button>
          ))}
        </Box>
        <Typography variant="body2" color="inherit">
          admin | 최근 로그인: 2025-06-01 15:24:00 | <Button color="inherit">LOG OUT</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
